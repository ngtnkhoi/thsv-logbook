import {defineField, defineType} from 'sanity'
import {CATEGORIES} from './cagetory'

export const localeString = defineType({
  name: 'localeString',
  title: 'Đa ngôn ngữ (Chuỗi ngắn)',
  type: 'object',
  fields: [
    defineField({
      name: 'vi',
      title: 'Tiếng Việt',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'en',
      title: 'Tiếng Anh (English)',
      type: 'string',
    }),
  ],
})

export const localeText = defineType({
  name: 'localeText',
  title: 'Đa ngôn ngữ (Văn bản dài)',
  type: 'object',
  fields: [
    defineField({
      name: 'vi',
      title: 'Tiếng Việt',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'en',
      title: 'Tiếng Anh (English)',
      type: 'text',
    }),
  ],
})

export const contentBlock = defineType({
  name: 'contentBlock',
  title: 'Khối Nội dung (Media & Text)',
  type: 'object',
  validation: (Rule) =>
    Rule.custom((value) => {
      const block = value
      if (!block) return true

      if (block.mediaType === 'image' && !block.image) {
        return 'Bạn phải tải lên file để render cùng text.'
      }
      if (block.mediaType === 'video' && !block.videoFile) {
        return 'Bạn phải tải lên file để render cùng text.'
      }
      return true
    }),
  fields: [
    defineField({
      name: 'mediaType',
      title: 'Loại Media',
      type: 'string',
      options: {
        list: [
          {title: 'Hình ảnh', value: 'image'},
          {title: 'Video', value: 'video'},
        ],
        layout: 'radio',
      },
      initialValue: 'image',
    }),
    defineField({
      name: 'image',
      type: 'image',
      options: {hotspot: true},
      hidden: ({parent}) => parent?.mediaType !== 'image',
    }),
    defineField({
      name: 'videoFile',
      title: 'Tải lên video',
      type: 'file',
      options: {accept: 'video/*'},
      hidden: ({parent}) => parent?.mediaType !== 'video',
    }),
    defineField({
      name: 'text',
      title: 'Nội dung văn bản',
      type: 'localeText',
      validation: (rule) => rule.required(),
    }),
  ],
})

export const postType = defineType({
  name: 'post',
  title: 'Bài viết',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Tiêu đề',
      type: 'localeString',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title.vi'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Chỉ mục',
      type: 'string',
      options: {
        list: CATEGORIES.map((cat) => ({
          title: cat.title,
          value: cat.value,
        })),
      },
      validation: (rule) => rule.required(),
    }),
		defineField({
			name: 'coverPhoto',
			type: 'image',
			title: 'Ảnh bìa tóm tắt',
			options: { hotspot: true },
			validation: (rule) => rule.required(),
		}),
    defineField({
      name: 'excerpt',
      type: 'localeText',
      title: 'Tóm tắt ngắn',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'coverImage',
      type: 'image',
      title: 'Ảnh nền bài viết',
			validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'contentBlocks',
      title: 'Nội dung chi tiết',
      type: 'array',
      of: [{type: 'contentBlock'}],
    }),
  ],
})
