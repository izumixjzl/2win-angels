// Helpers for the inquiry form's time slots. The studio is in Davao City,
// so "today" and "now" are always Philippine time, whatever the visitor's timezone.
const TIME_ZONE = 'Asia/Manila'
const WEEKDAYS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']

export function studioNow() {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat('en-CA', {
      timeZone: TIME_ZONE,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23',
    })
      .formatToParts(new Date())
      .map((p) => [p.type, p.value]),
  )
  return { date: `${parts.year}-${parts.month}-${parts.day}`, time: `${parts.hour}:${parts.minute}` }
}

// "13:30" -> "1:30 PM"
export function formatTime(value) {
  const [h, m] = value.split(':').map(Number)
  return `${h % 12 || 12}:${String(m).padStart(2, '0')} ${h < 12 ? 'AM' : 'PM'}`
}

// "2026-11-05" -> "Thursday, November 5, 2026"
export function formatDate(date) {
  return new Date(`${date}T00:00:00`).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

// For a "YYYY-MM-DD" date: { closed, slots: [{ value, label, available }] }
export function slotsForDate(schedule, date) {
  const weekday = WEEKDAYS[new Date(`${date}T00:00:00`).getDay()]
  const blocks = (schedule.unavailable || []).filter((u) => u.date === date)
  const closed = (schedule.closedWeekdays || []).includes(weekday) || blocks.some((b) => b.allDay)
  if (closed) return { closed: true, slots: [] }

  const booked = new Set(blocks.flatMap((b) => b.times || []))
  const now = studioNow()
  const slots = [...new Set(schedule.slots || [])].sort().map((value) => ({
    value,
    label: formatTime(value),
    available: !booked.has(value) && !(date < now.date || (date === now.date && value <= now.time)),
  }))
  return { closed: false, slots }
}
