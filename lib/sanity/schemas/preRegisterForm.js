import { type } from "os";
import { AddUserIcon } from "@sanity/icons";

export default {
  name: 'preRegisterForm',
  title: 'Admission Pre Register Form',
  type: 'document',
  icon: AddUserIcon,
  fields: [
    {
      name: "firstName",
      title: "Primer Nombre",
      type: "string",
      validation: Rule => [Rule.required().error('Nombre requerido'),],
    },
    {
      name: "lastName",
      title: "Apellido",
      type: "string",
      validation: Rule => [Rule.required().error('Apellido requerido'),],
    },
    {
      name: "identification",
      title: "Identificación",
      type: "string",
      validation: Rule => [Rule.required().error('Identificación o Cédula requerido'),],
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: (doc) => `${doc.firstName}-${doc.lastName}-${doc.identification}`, // Compound slug
        maxLength: 96,
        slugify: (input) =>
          input
            .toLowerCase()
            .replace(/\s+/g, '-')
            .slice(0, 96),
      },
    },
    {
      name: "gender",
      title: "Sexo",
      type: "string",
      options: {
        list: [
          { title: 'Male', value: 'Masculino' },
        ], // <-- predefined values
      }, //layout: 'radio' // <-- defaults to 'dropdown'
      validation: Rule => [Rule.required().error('Género requerido'),],
    },
    {
      name: "schoolLevel",
      title: "Nivel de Escolaridad",
      type: "string",
      initialValue: 'Hafiz',
      options: {
        list: [
          { title: 'Maktab', value: 'Maktab' },
          { title: 'Hifz', value: 'Hifz' },
          { title: 'Alimiyyah', value: 'Alimiyyah' },
        ], // <-- predefined values
        //layout: 'radio' // <-- defaults to 'dropdown'
      },
      validation: Rule => [Rule.required().error('Nivel Escolaridad requerido'),],
    },
    {
      name: "parentName",
      title: "Nombre del Acudiente",
      type: "string",
      validation: Rule => [Rule.required().error('Nombre del acudiente requerido'),],
    },
    {
      name: "parentLastName",
      title: "Apellido del Acudiente",
      type: "string",
      validation: Rule => [Rule.required().error('Apellido del acudiente requerido'),],
    },
    {
      name: "parentIdentification",
      title: "Identificación del Acudiente",
      type: "string",
      validation: Rule => [Rule.required().error('Identificaión del acudiente requerido'),],
    },
    {
      name: "parentEmail",
      title: "Email del Acudiente",
      type: "email",
      validation: Rule => [Rule.required(), Rule.email().error('Error Email address')],
    },
    {
      name: "parentCellphone",
      title: "Celular del Acudiente",
      type: "string",
      validation: Rule => [Rule.required().error('Celular requerido'),],
    },
    {
      name: 'attachment',
      title: 'Attachment',
      type: 'file',
      validation: Rule => Rule.optional()
    },

  ],
  preview: {
    select: {
      title: 'firstName',
      author: 'lastName',
      subtitle: 'identification',
    },
    prepare(selection) {
      const { title, author, subtitle } = selection;
      return {
        title: `${title} ${author}`,
        subtitle: `Id= ${subtitle}`,
      };
    },
  },
}
