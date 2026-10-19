import { defineArrayMember, defineField, defineType } from 'sanity'

// Start times the owner can tick, every 30 minutes from 7:00 AM to 8:00 PM.
// Stored as "HH:mm" (24-hour) so the website can sort and compare them.
const timeOptions = []
for (let m = 7 * 60; m <= 20 * 60; m += 30) {
  const h = Math.floor(m / 60)
  const value = `${String(h).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`
  const title = `${h % 12 || 12}:${String(m % 60).padStart(2, '0')} ${h < 12 ? 'AM' : 'PM'}`
  timeOptions.push({ title, value })
}
const titleOf = (value) => timeOptions.find((o) => o.value === value)?.title || value

const weekdayOptions = [
  { title: 'Monday', value: 'mon' },
  { title: 'Tuesday', value: 'tue' },
  { title: 'Wednesday', value: 'wed' },
  { title: 'Thursday', value: 'thu' },
  { title: 'Friday', value: 'fri' },
  { title: 'Saturday', value: 'sat' },
  { title: 'Sunday', value: 'sun' },
]

export default defineType({
  name: 'schedule',
  title: 'Opening times & availability',
  type: 'document',
  fields: [
    defineField({
      name: 'slots',
      title: 'Session start times',
      description:
        'Tick the times a session can start on a normal open day. Visitors see these when they pick a date in the inquiry form.',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      options: { list: timeOptions, layout: 'grid' },
      validation: (rule) => rule.min(1).error('Tick at least one start time.'),
    }),
    defineField({
      name: 'closedWeekdays',
      title: 'Closed every week on',
      description: 'Tick the days the studio is always closed. Leave empty if you are open every day.',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      options: { list: weekdayOptions, layout: 'grid' },
    }),
    defineField({
      name: 'unavailable',
      title: 'Booked or closed dates',
      description:
        'Add a date when a time is taken, or when the studio is closed that day. Visitors will see those times as booked. Old dates are hidden on the website automatically, so you never need to clean them up.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'unavailableDate',
          title: 'Booked or closed date',
          fields: [
            defineField({
              name: 'date',
              title: 'Date',
              type: 'date',
              options: { dateFormat: 'MMMM D, YYYY' },
              validation: (rule) => rule.required().error('Pick a date.'),
            }),
            defineField({
              name: 'allDay',
              title: 'Whole day (closed or fully booked)',
              type: 'boolean',
              initialValue: false,
            }),
            defineField({
              name: 'times',
              title: 'Booked times',
              description: 'Tick the start times that are already taken on this date.',
              type: 'array',
              of: [defineArrayMember({ type: 'string' })],
              options: { list: timeOptions, layout: 'grid' },
              hidden: ({ parent }) => parent?.allDay,
            }),
            defineField({
              name: 'note',
              title: 'Private note (optional)',
              description: 'Only you see this, e.g. the client\'s name. It is not shown on the website.',
              type: 'string',
            }),
          ],
          preview: {
            select: { date: 'date', allDay: 'allDay', times: 'times', note: 'note' },
            prepare: ({ date, allDay, times, note }) => ({
              title: date
                ? new Date(`${date}T00:00:00`).toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric', year: 'numeric' })
                : 'No date picked',
              subtitle: [allDay ? 'Whole day' : (times || []).map(titleOf).join(', ') || 'No times ticked', note]
                .filter(Boolean)
                .join(' · '),
            }),
          },
        }),
      ],
    }),
  ],
  preview: {
    select: { slots: 'slots' },
    prepare: ({ slots }) => ({
      title: 'Opening times & availability',
      subtitle: `${slots?.length ?? 0} start time(s)`,
    }),
  },
})
