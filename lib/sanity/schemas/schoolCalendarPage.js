import { supportedLanguages, baseLanguage } from './locales';

export default {
  name: 'schoolCalendarPage',
  title: 'School Calendar Page Content',
  type: 'document',
  fields: [
    {
      name: 'title',
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
      name: 'description',
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
      name: "post",
      title: "Post",
      type: "reference",
      to: { type: "post" }
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
    {
      name: "keyActivities",
      type: "array",
      title: "All activities in the curriculum",
      description: "Enter all Items",
      of: [
        {
          type: "object",
          fields: [
            {
              name: 'title',
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
              name: 'description',
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
              name: 'attachment',
              title: 'Attachment Document',
              type: 'file',
              options: {
                accept: '.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.csv,.zip,.rar', // Optional: restrict file types
              },
            },
            {
              name: 'iconString',
              type: 'string',
              options: {
                list: [
                  { title: 'File', value: 'folderMinus' },
                  { title: 'Cash', value: 'banknotes' },
                  { title: 'Graph', value: 'presentationChartLine' },
                ], // Define your animation options here
                layout: 'dropdown' // Ensures it appears as a dropdown menu
              }
            },
            {
              name: 'link',
              title: 'Button Link',
              type: 'string',
            },
          ],
          preview: {
            select: {
              title: 'title.en',
              media: 'image',
            },
          },
        },
      ]
    },
    {
      name: "contentCards",
      type: "array",
      title: "Content Cards",
      description: "Enter all Cards Details",
      of: [
        {
          type: "object",
          fields: [
            {
              name: 'contentCardTitle',
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
              name: 'contentCardDescription',
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
              title: "Content Card Texts Items",
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
              name: 'contentCardDescription2',
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
              name: 'contentCardImage',
              title: 'Card Image ',
              type: 'image',
              options: {
                hotspot: true,
              },
            },
            {
              name: 'contentCardImageAlt',
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
              name: 'contentCardReverse',
              title: 'Card Image Reverse ?',
              type: 'boolean',
            },
            {
              name: 'contentCardAnimation',
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
              title: 'contentCardTitle.en',
              media: 'image',
            },
          },
        },
      ]
    },
    {
      name: "galleryContent",
      type: "array",
      title: "gallery Content",
      description: "Enter all Details",
      of: [
        {
          type: "object",
          fields: [
            {
              name: 'galleryTitle',
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
              name: 'galleryDescription',
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
              name: 'galleryImage',
              title: 'Card Image ',
              type: 'image',
              options: {
                hotspot: true,
              },
            },
            {
              name: 'galleryImageAlt',
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
              name: 'gallerySubContent',
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
              name: 'galleryHasImage',
              title: 'Card Has Image ?',
              type: 'boolean',
            },

            {
              name: 'gallerySize',
              type: 'string',
              options: {
                list: [
                  { title: 'Small', value: 'small' },
                  { title: 'Medium', value: 'medium' },
                  { title: 'Large', value: 'large' },
                ], // Define your animation options here
                layout: 'dropdown' // Ensures it appears as a dropdown menu
              }
            },
            {
              name: 'galleryHasButton',
              title: 'Card Has button ?',
              type: 'boolean',
            },
            {
              name: 'galleryButtonLink',
              title: 'Button Link',
              type: 'string',
            },
            {
              name: 'gallerySpan',
              type: 'string',
              options: {
                list: [
                  { title: 'Vertical', value: 'vertical' },
                  { title: 'Horizontal', value: 'horizontal' },
                ], // Define your animation options here
                layout: 'dropdown' // Ensures it appears as a dropdown menu
              }
            },
            {
              name: 'galleryAnimation',
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
            }
          ],
          preview: {
            select: {
              title: 'galleryTitle.en',
              media: 'image',
            },
          },
        },
      ]
    },


    {
      name: "ctaContentCards",
      type: "array",
      title: "CTA Content Cards",
      description: "Enter all Cards Details",
      of: [
        {
          type: "object",
          fields: [
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
          ],
          preview: {
            select: {
              title: 'ctaCardTitle.en',
              media: 'image',
            },
          },
        },
      ]
    },
  ],

  preview: {
    select: {
      title: 'title.en',
      media: 'image',
    },
  },
}


