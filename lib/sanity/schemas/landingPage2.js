import { supportedLanguages, baseLanguage } from './locales';


export default {
  name: 'landingPage2',
  title: 'Landing Page 2',
  type: 'document',
  fields: [
    {
      name: "title",
      type: 'object',
      fieldsets: [{ name: 'translations', title: 'Translations', options: { collapsible: true } }],
      fields: supportedLanguages.map(lang => ({
        title: lang.title,
        name: lang.id,
        type: 'string',
        fieldset: lang.id === baseLanguage.id ? null : 'translations'
      }))
    },
    {
      name: "sliders",
      type: "array",
      title: "Sliders",
      description: "Enter all sliders",
      of: [
        {
          type: "object",
          fields: [
            {
              name: 'sliderTitle',
              type: 'object',
              fieldsets: [{ name: 'translations', title: 'Translations', options: { collapsible: true } }],
              fields: supportedLanguages.map(lang => ({
                title: lang.title,
                name: lang.id,
                type: 'string',
                fieldset: lang.id === baseLanguage.id ? null : 'translations'
              }))
            },
            {
              name: 'sliderDescription',
              type: 'object',
              fieldsets: [{ name: 'translations', title: 'Translations', options: { collapsible: true } }],
              fields: supportedLanguages.map(lang => ({
                title: lang.title,
                name: lang.id,
                type: 'text',
                fieldset: lang.id === baseLanguage.id ? null : 'translations'
              }))
            },
            {
              name: 'sliderImage',
              title: 'Slider Image ',
              type: 'image',
              options: {
                hotspot: true,
              },
            },
            {
              name: 'overlay',
              title: 'Image Overlay Color',
              type: 'string',
              description: 'Optional overlay color to apply over the slider image.',
              options: {
                list: [
                  { title: 'None', value: 'none' },
                  { title: 'Black', value: 'black' },
                  { title: 'White', value: 'white' },
                ],
                layout: 'dropdown'
              },
              initialValue: 'none'
            },
            {
              name: 'titleOverlayColor',
              title: 'Title Overlay Color',
              type: 'string',
              description: 'Muestra un fondo semitransparente detrás del título para mejorar la legibilidad.',
              options: {
                list: ['black', 'white', 'none'],
                layout: 'radio',
                direction: 'horizontal',
              },
              initialValue: 'black',
            },
            {
              name: 'titleTextColor',
              title: 'Title Text Color',
              type: 'string',
              description: 'Si no hay Overlay para el título. Elegir su color de texto.',
              options: {
                list: ['black', 'white'],
                layout: 'radio',
                direction: 'vertical',
              },
              initialValue: 'black',
            },
            {
              name: 'descriptionOverlayColor',
              title: 'Description Overlay Color',
              type: 'string',
              description: 'Muestra un fondo semitransparente detrás del texto para mejorar la legibilidad.',
              options: {
                list: ['black', 'white', 'none'],
                layout: 'radio',
                direction: 'horizontal',
              },
              initialValue: 'black',
            },
          ],
          preview: {
            select: {
              title: 'sliderTitle.en',
              media: 'image',
            },
          },
        },
      ]
    },
    {
      name: "landingServiceTitle",
      type: 'object',
      title: "Landing Service Title",
      fieldsets: [{ name: 'translations', title: 'Translations', options: { collapsible: true } }],
      fields: supportedLanguages.map(lang => ({
        title: lang.title,
        name: lang.id,
        type: 'string',
        fieldset: lang.id === baseLanguage.id ? null : 'translations'
      }))
    },
    {
      name: "landingServiceDescription",
      type: 'object',
      fieldsets: [{ name: 'translations', title: 'Translations', options: { collapsible: true } }],
      fields: supportedLanguages.map(lang => ({
        title: lang.title,
        name: lang.id,
        type: 'text',
        fieldset: lang.id === baseLanguage.id ? null : 'translations'
      }))
    },
    {
      name: "landingServiceLinkMessage",
      type: 'object',
      fieldsets: [{ name: 'translations', title: 'Translations', options: { collapsible: true } }],
      fields: supportedLanguages.map(lang => ({
        title: lang.title,
        name: lang.id,
        type: 'string',
        fieldset: lang.id === baseLanguage.id ? null : 'translations'
      }))
    },
    {
      name: "landingServiceLink",
      title: "Landing Service Link",
      type: 'string',
    },
    {
      name: "landingServiceItems",
      type: "array",
      title: "landing Service Items",
      description: "Enter all Services",
      of: [
        {
          type: "object",
          fields: [
            {
              name: 'serviceTitle',
              type: 'object',
              fieldsets: [{ name: 'translations', title: 'Translations', options: { collapsible: true } }],
              fields: supportedLanguages.map(lang => ({
                title: lang.title,
                name: lang.id,
                type: 'string',
                fieldset: lang.id === baseLanguage.id ? null : 'translations'
              }))
            },
            {
              name: 'serviceCategory',
              type: 'object',
              fieldsets: [{ name: 'translations', title: 'Translations', options: { collapsible: true } }],
              fields: supportedLanguages.map(lang => ({
                title: lang.title,
                name: lang.id,
                type: 'string',
                fieldset: lang.id === baseLanguage.id ? null : 'translations'
              }))
            },
            {
              name: 'serviceColor',
              title: 'Service Color',
              type: 'string'
            },
            {
              name: 'serviceTextColor',
              title: 'Service Text Color',
              type: 'string'
            },
            {
              name: 'serviceLink',
              title: 'Service Link',
              type: 'string'

            },
          ],
          preview: {
            select: {
              title: 'serviceTitle.en',
              media: 'image',
            },
          },
        },
      ]
    },
    {
      name: "clientImages",
      type: "array",
      title: "Client Images",
      description: "Enter all Clients",
      of: [
        {
          type: "object",
          fields: [
            {
              name: 'clientImageTitle',
              title: 'client Image Title',
              type: 'string',
            },
            {
              name: 'clientImage',
              title: 'Client Image ',
              type: 'image',
              options: {
                hotspot: true,
              },
            },
            {
              name: 'clientImageAlt',
              title: 'client Image Alt',
              type: 'string',
            },
          ],
          preview: {
            select: {
              title: 'clientImageTitle',
              media: 'image',
            },
          },
        },
      ]
    },
    {
      name: "ServiceCards",
      type: "array",
      title: "Service Cards",
      description: "Enter all Cards Details",
      of: [
        {
          type: "object",
          fields: [
            {
              name: 'serviceCardTitle',
              type: 'object',
              fieldsets: [{ name: 'translations', title: 'Translations', options: { collapsible: true } }],
              fields: supportedLanguages.map(lang => ({
                title: lang.title,
                name: lang.id,
                type: 'string',
                fieldset: lang.id === baseLanguage.id ? null : 'translations'
              }))
            },
            {
              name: 'serviceCarddescription',
              type: 'object',
              fieldsets: [{ name: 'translations', title: 'Translations', options: { collapsible: true } }],
              fields: supportedLanguages.map(lang => ({
                title: lang.title,
                name: lang.id,
                type: 'text',
                fieldset: lang.id === baseLanguage.id ? null : 'translations'
              }))
            },
            {
              name: "contentCardPoints",
              type: "array",
              title: "Service Card Texts Items",
              description: "Enter all Service Card Items",
              of: [
                {
                  type: "object",
                  fields: [
                    {
                      name: 'contentCardItemDescription',
                      type: 'object',
                      fieldsets: [{ name: 'translations', title: 'Translations', options: { collapsible: true } }],
                      fields: supportedLanguages.map(lang => ({
                        title: lang.title,
                        name: lang.id,
                        type: 'string',
                        fieldset: lang.id === baseLanguage.id ? null : 'translations'
                      }))
                    },

                  ],
                  preview: {
                    select: {
                      title: 'contentCardItemDescription.en',
                      media: 'image',
                    },
                  },
                },
              ]
            },
            {
              name: 'serviceCarddescription2',
              type: 'object',
              fieldsets: [{ name: 'translations', title: 'Translations', options: { collapsible: true } }],
              fields: supportedLanguages.map(lang => ({
                title: lang.title,
                name: lang.id,
                type: 'text',
                fieldset: lang.id === baseLanguage.id ? null : 'translations'
              }))
            },
            {
              name: 'serviceCardImage',
              title: 'Card Image ',
              type: 'image',
              options: {
                hotspot: true,
              },
            },
            {
              name: 'serviceCardImageAlt',
              type: 'object',
              fieldsets: [{ name: 'translations', title: 'Translations', options: { collapsible: true } }],
              fields: supportedLanguages.map(lang => ({
                title: lang.title,
                name: lang.id,
                type: 'string',
                fieldset: lang.id === baseLanguage.id ? null : 'translations'
              }))
            },
            {
              name: 'serviceCardReverse',
              title: 'Card Image Reverse ?',
              type: 'boolean',
            },
            {
              name: 'serviceCardAnimation',
              type: 'string',
              options: {
                list: [
                  { title: 'Slide In Left', value: 'animate-slideInLeft' },
                  { title: 'Slide In Right', value: 'animate-slideInRight' },
                  { title: 'Fade In', value: 'animate-fadeIn' },
                  { title: 'Bounce', value: 'animate-bounce' }
                ], // Define your animation options here
                layout: 'dropdown' // Ensures it appears as a dropdown menu
              }
            },
          ],
          preview: {
            select: {
              title: 'serviceCardTitle.en',
              media: 'image',
            },
          },
        },
      ]
    },
    {
      name: "ctaCardTitle",
      type: 'object',
      fieldsets: [{ name: 'translations', title: 'Translations', options: { collapsible: true } }],
      fields: supportedLanguages.map(lang => ({
        title: lang.title,
        name: lang.id,
        type: 'string',
        fieldset: lang.id === baseLanguage.id ? null : 'translations'
      }))
    },
    {
      name: "ctaCardSubtitle",
      type: 'object',
      fieldsets: [{ name: 'translations', title: 'Translations', options: { collapsible: true } }],
      fields: supportedLanguages.map(lang => ({
        title: lang.title,
        name: lang.id,
        type: 'string',
        fieldset: lang.id === baseLanguage.id ? null : 'translations'
      }))
    },
    {
      name: "ctaCardDescription",
      type: 'object',
      fieldsets: [{ name: 'translations', title: 'Translations', options: { collapsible: true } }],
      fields: supportedLanguages.map(lang => ({
        title: lang.title,
        name: lang.id,
        type: 'string',
        fieldset: lang.id === baseLanguage.id ? null : 'translations'
      }))
    },
    {
      name: "ctaCardButtonMessage",
      type: 'object',
      fieldsets: [{ name: 'translations', title: 'Translations', options: { collapsible: true } }],
      fields: supportedLanguages.map(lang => ({
        title: lang.title,
        name: lang.id,
        type: 'string',
        fieldset: lang.id === baseLanguage.id ? null : 'translations'
      }))
    },
    {
      name: "ctaCardButtonLink",
      title: 'cta Card Button Link',
      type: 'string',

    },
    {
      name: "ctaCardImageAlt",
      type: 'object',
      fieldsets: [{ name: 'translations', title: 'Translations', options: { collapsible: true } }],
      fields: supportedLanguages.map(lang => ({
        title: lang.title,
        name: lang.id,
        type: 'string',
        fieldset: lang.id === baseLanguage.id ? null : 'translations'
      }))
    },
    {
      name: 'ctaCardImage',
      title: 'CTA Card Image ',
      type: 'image',
      options: {
        hotspot: true,
      },
    },


    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title.en',
        maxLength: 96,
      },
    },
  ],
  preview: {
    select: {
      title: 'title.en',
      media: 'image',
    },
  },
}
