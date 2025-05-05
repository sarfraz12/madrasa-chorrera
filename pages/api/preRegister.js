import formidable from 'formidable';
import Joi from 'joi';
import fs from 'fs';
import { apiVersion, dataset, projectId, tokenId } from "@/lib/sanity/config";
import { createClient } from "next-sanity";
import rateLimit from 'express-rate-limit';
import sanitizeHtml from 'sanitize-html';



const clientCreate = createClient({
  projectId: projectId, dataset: dataset, useCdn: false,
  apiVersion: apiVersion, token: tokenId, ignoreBrowserTokenWarning: true
})


// for formifable upload file
export const config = {
  api: {
    bodyParser: false,
  },
};

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
  attachment: Joi.any().optional().label('Attachment'),
});

const parseForm = async (req) => {
  const form = new formidable.IncomingForm();
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

// Set up rate limiter middleware
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // Limit each IP to 100 requests per windowMs
  handler: (req, res) => {
    res.status(429).json({ error: 'Too many requests, please try again later.' });
  },
});


const handler = async (req, res) => {

  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  try {

    const { fields, files } = await parseForm(req, { multiples: false });

    const { error } = schema.validate({ ...fields, attachment: files.attachment });
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



    //  input data
    const document = {
      _type: 'preRegisterForm',
      firstName: sanitizeField(fields.firstName),
      lastName: sanitizeField(fields.lastName),
      identification: sanitizeField(fields.identification),
      gender: sanitizeField(fields.gender),
      schoolLevel: sanitizeField(fields.schoolLevel),
      parentName: sanitizeField(fields.parentName),
      parentLastName: sanitizeField(fields.parentLastName),
      parentIdentification: sanitizeField(fields.parentIdentification),
      parentEmail: sanitizeField(fields.parentEmail),
      parentCellphone: sanitizeField(fields.parentCellphone),
      attachment: files.attachment ? {
        _type: 'file',
        asset: { _type: 'reference', _ref: attachmentAssetId }
      } : { _type: 'file', asset: { _type: 'reference' } }, // Allow attachment to be null
      slug: {
        _type: 'slug',
        current: sanitizeField(fields.firstName + "-" + fields.lastName + "-" + fields.identification.toLowerCase().replace(/\s+/g, '-')),
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
// });

// Apply rate limiter to the handler
export default function (req, res) {
  return apiLimiter(req, res, () => handler(req, res));
}