// The dashboard menu shows one item per singleton document.
export const structure = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Portfolio photos & videos')
        .id('portfolio')
        .child(S.document().schemaType('portfolio').documentId('portfolio').title('Portfolio photos & videos')),
      S.listItem()
        .title('Opening times & availability')
        .id('schedule')
        .child(S.document().schemaType('schedule').documentId('schedule').title('Opening times & availability')),
    ])
