
// *Token should be developer role

import { IncomingForm } from 'formidable';
import Joi from 'joi';
import fs from 'fs';
import { apiVersion, dataset, projectId, tokenId } from "@/lib/sanity/config";
import { createClient } from "next-sanity";
import sanitizeHtml from 'sanitize-html';

const clientCreate = createClient({
  projectId: projectId, dataset: dataset, useCdn: false,
  apiVersion: apiVersion, token: tokenId, ignoreBrowserTokenWarning: true
});

// for formifable upload file
export const config = {
  api: {
    bodyParser: false,
  },
};

const rateLimitMap = new Map();

export function rateLimit(key, limit, windowMs) {
  const now = Date.now();
  const windowStart = now - windowMs;

  if (!rateLimitMap.has(key)) {
    rateLimitMap.set(key, []);
  }

  // Keep only timestamps within the window
  const requests = rateLimitMap.get(key).filter((timestamp) => timestamp > windowStart);

  if (requests.length >= limit) {
    return false; // rate limit exceeded
  }

  requests.push(now);
  rateLimitMap.set(key, requests);

  return true; // allowed
}

const schema = Joi.object({
  firstName: Joi.string().required().label('Primer Nombre'),
  lastName: Joi.string().required().label('Apellido'),
  identification: Joi.string().required().label('Identificación'),
  gender: Joi.string().valid('Masculino', 'Femenino').required().label('Género'),
  schoolLevel: Joi.string().required().label('Nivel de Escolaridad'),
  parentName: Joi.string().required().label('Nombre del Acudiente'),
  parentLastName: Joi.string().required().label('Apellido del Acudiente'),
  parentIdentification: Joi.string().required().label('Identificación del Acudiente'),
  parentEmail: Joi.string().required().label('Email del Acudiente'),
  parentCellphone: Joi.string().required().label('Celular del Acudiente'),
  attachment: Joi.any().optional().allow(null).label('Attachment'),
});

const parseForm = async (req) => {
  const form = new IncomingForm();
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
};

const sanitizeField = (field) => {
  return sanitizeHtml(field, {
    allowedTags: [],
    allowedAttributes: {},
  });
};

// Handler of the data request
const handler = async (req, res) => {
  const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.socket.remoteAddress;

  const allowed = rateLimit(ip, 20, 15 * 60 * 1000); // 20 requests per 15 minutes

  if (!allowed) {
    return res.status(429).json({ error: 'Too many requests, please try again later.' });
  }

  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  try {
    const { fields, files } = await parseForm(req);

    // Normalize fields to ensure they are not arrays
    const normalizedFields = Object.fromEntries(
      Object.entries(fields).map(([key, value]) => [key, Array.isArray(value) ? value[0] : value])
    );

    // Validate input with Joi
    const { error } = schema.validate({ ...normalizedFields, attachment: files.attachment });
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    let attachmentAssetId = null;
    if (files.attachment) {
      const attachment = files.attachment;
      const upload = await clientCreate.assets.upload('file', fs.createReadStream(attachment.filepath), {
        filename: attachment.name,
      });
      attachmentAssetId = upload._id;
    }

    // Prepare the document
    const document = {
      _type: 'preRegisterForm',
      firstName: sanitizeField(normalizedFields.firstName),
      lastName: sanitizeField(normalizedFields.lastName),
      identification: sanitizeField(normalizedFields.identification),
      gender: sanitizeField(normalizedFields.gender),
      schoolLevel: sanitizeField(normalizedFields.schoolLevel),
      parentName: sanitizeField(normalizedFields.parentName),
      parentLastName: sanitizeField(normalizedFields.parentLastName),
      parentIdentification: sanitizeField(normalizedFields.parentIdentification),
      parentEmail: sanitizeField(normalizedFields.parentEmail),
      parentCellphone: sanitizeField(normalizedFields.parentCellphone),
      attachment: files.attachment ? {
        _type: 'file',
        asset: { _type: 'reference', _ref: attachmentAssetId }
      } : { _type: 'file', asset: { _type: 'reference' } }, // Allow attachment to be null
      slug: {
        _type: 'slug',
        current: sanitizeField(normalizedFields.firstName + "-" + normalizedFields.lastName + "-" + normalizedFields.identification.toLowerCase().replace(/\s+/g, '-')),
      },
    };

    console.log('Document:', document); // Debugging line

    // Store data in Sanity
    const createdDocument = await clientCreate.create(document);

    res.status(201).json(createdDocument);
  } catch (error) {
    console.error('Error creating document:', error);
    res.status(500).json({ message: 'Failed to submit form' });
  }
}

export default handler;
