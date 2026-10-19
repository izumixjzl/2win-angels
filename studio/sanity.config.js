import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './schemaTypes'
import { structure } from './structure'

const singletonTypes = new Set(['portfolio', 'schedule'])
const singletonActions = new Set(['publish', 'discardChanges', 'restore'])

export default defineConfig({
  name: 'default',
  title: '2win Angels Studio',

  // Paste your Project ID from https://www.sanity.io/manage
  projectId: '2k950g5y',
  dataset: 'production',

  plugins: [structureTool({ structure })],

  schema: {
    types: schemaTypes,
    // Hide the singleton from "Create new document" menus
    templates: (templates) => templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },

  document: {
    // The singleton can only be published, reverted or restored (no delete/duplicate)
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({ action }) => action && singletonActions.has(action))
        : input,
  },
})
