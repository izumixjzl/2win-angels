import { defineArrayMember, defineField, defineType } from 'sanity'

const descriptionField = (example) =>
  defineField({
    name: 'alt',
    title: 'Short description',
    type: 'string',
    description: `Describe it in a few words for visitors who cannot see it. Example: "${example}".`,
    validation: (rule) => rule.required().warning('Please add a short description.'),
  })

export default defineType({
  name: 'portfolio',
  title: 'Portfolio photos & videos',
  type: 'document',
  fields: [
    defineField({
      name: 'photos',
      title: 'Photos & videos',
      description:
        'Drop photos or short videos here to add them. Drag an item to change its place in the gallery. Click an item to edit its description or remove it. Press "Publish" when you are done. 9 to 12 items look best. Keep videos short (under 1 minute, MP4, under about 30 MB) so they load quickly on phones.',
      type: 'array',
      options: { layout: 'grid' },
      validation: (rule) => rule.min(1).error('Add at least one photo or video.'),
      of: [
        defineArrayMember({
          type: 'image',
          title: 'Photo',
          options: { hotspot: true },
          fields: [descriptionField('A smiling baby at a pink first-birthday setup')],
        }),
        defineArrayMember({
          type: 'file',
          name: 'video',
          title: 'Video',
          options: { accept: 'video/mp4,video/webm,video/quicktime' },
          fields: [
            descriptionField('Highlights from a themed pre-birthday shoot'),
            defineField({
              name: 'poster',
              title: 'Cover photo (optional)',
              type: 'image',
              description: 'Shown before the video plays. If empty, the first frame of the video is used.',
              options: { hotspot: true },
            }),
          ],
          preview: {
            select: { title: 'alt', media: 'poster' },
            prepare: ({ title, media }) => ({ title: title || 'Video', subtitle: 'Video', media }),
          },
        }),
      ],
    }),
  ],
  preview: {
    select: { photos: 'photos' },
    prepare: ({ photos }) => ({
      title: 'Portfolio photos & videos',
      subtitle: `${photos?.length ?? 0} item(s)`,
    }),
  },
})
