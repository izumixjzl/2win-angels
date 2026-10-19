import { useState } from 'react'
import { MessageCircle, Phone } from 'lucide-react'
import { schedule as builtInSchedule, sessionOptions, studio } from '../data/content'
import { useSchedule } from '../hooks/useSchedule'
import { formatDate, formatTime, slotsForDate, studioNow } from '../lib/schedule'

// There is no backend: on a valid submit, the form builds a pre-filled email
// to the studio and lets the visitor send it from their own email app.
export default function BookingSection() {
  const [errors, setErrors] = useState({})
  const [mailHref, setMailHref] = useState(null)
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const { status: scheduleStatus, schedule } = useSchedule(builtInSchedule)
  const day = date ? slotsForDate(schedule, date) : null
  const openSlots = day ? day.slots.filter((s) => s.available) : []

  const onSubmit = (e) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const v = Object.fromEntries(['name', 'contact', 'service', 'date', 'time', 'msg'].map((k) => [k, String(f.get(k) || '').trim()]))
    const errs = {}
    if (!v.name) errs.name = 'Please enter your name.'
    if (!v.contact) errs.contact = 'Add an email or mobile number so we can reply.'
    if (!v.msg) errs.msg = 'Tell us a little about the session you have in mind.'
    setErrors(errs)
    if (Object.keys(errs).length) {
      e.currentTarget.querySelector('[aria-invalid="true"]')?.focus()
      return
    }
    const body = `Name: ${v.name}\nContact: ${v.contact}\nSession: ${v.service || '-'}\nPreferred date: ${v.date ? formatDate(v.date) : '-'}\nPreferred time: ${v.time ? formatTime(v.time) : '-'}\n\n${v.msg}`
    setMailHref(`mailto:${studio.email}?subject=${encodeURIComponent(`Session inquiry from ${v.name}`)}&body=${encodeURIComponent(body)}`)
  }

  const fieldCls = (bad) =>
    `h-12 rounded border bg-[#FFFAFC] px-3.5 text-ink ${bad ? 'border-[#B3261E]' : 'border-[#EBC4D3]'}`
  const labelCls = 'text-xs font-semibold uppercase tracking-[.14em]'

  return (
    <section id="book" className="py-20 lg:py-36">
      <div className="wrap grid items-start gap-16 lg:grid-cols-[5fr_6fr] lg:gap-20">
        <div>
          <p className="eyebrow mb-4">Book a session</p>
          <h2 className="h2">
            Let's capture something <em className="font-normal text-pink">beautiful.</em>
          </h2>
          <p className="mt-6 text-[17px] text-body">
            Have a session or special occasion in mind? Get in touch and let's talk about your photography needs.
          </p>
          <div className="mt-9 flex max-w-[360px] flex-col gap-3">
            <a href={studio.messenger} target="_blank" rel="noopener noreferrer" className="btn-pink">
              <MessageCircle size={16} /> Message us on Facebook
            </a>
            <a href={studio.phoneHref} className="btn-line">
              <Phone size={16} /> Call {studio.phoneLocal}
            </a>
          </div>
          <p className="mt-6 text-[13px] text-muted">An inquiry isn't a confirmed booking. We'll reply to confirm your date and details.</p>
        </div>

        <div className="rounded bg-white p-6 shadow-[0_1px_0_var(--color-rose)] sm:p-12">
          {!mailHref ? (
            <form noValidate onSubmit={onSubmit} className="flex flex-col gap-5">
              <h3 className="mb-1 font-serif text-[30px] font-semibold text-berry">Inquire about a session</h3>

              <div className="flex flex-col gap-2">
                <label htmlFor="f-name" className={labelCls}>Full name *</label>
                <input id="f-name" name="name" type="text" autoComplete="name" aria-invalid={!!errors.name} aria-describedby={errors.name ? 'e-name' : undefined} className={fieldCls(errors.name)} />
                {errors.name && <span id="e-name" className="text-[13px] text-[#B3261E]">{errors.name}</span>}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="f-contact" className={labelCls}>Email or mobile number *</label>
                <input id="f-contact" name="contact" type="text" autoComplete="email" aria-invalid={!!errors.contact} aria-describedby={errors.contact ? 'e-contact' : undefined} className={fieldCls(errors.contact)} />
                {errors.contact && <span id="e-contact" className="text-[13px] text-[#B3261E]">{errors.contact}</span>}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label htmlFor="f-type" className={labelCls}>Session</label>
                  <select id="f-type" name="service" defaultValue="" className={fieldCls(false)}>
                    <option value="">Choose a session</option>
                    {sessionOptions.map((o) => <option key={o}>{o}</option>)}
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="f-date" className={labelCls}>Preferred date</label>
                  <input
                    id="f-date"
                    name="date"
                    type="date"
                    min={studioNow().date}
                    value={date}
                    onChange={(e) => {
                      setDate(e.target.value)
                      setTime('')
                    }}
                    className={fieldCls(false)}
                  />
                </div>
              </div>

              <fieldset className="flex flex-col gap-3" aria-describedby="time-hint">
                <legend className={`${labelCls} mb-2`}>Preferred time</legend>
                {!date ? (
                  <p id="time-hint" className="text-[13px] text-muted">Pick a date to see which times are open.</p>
                ) : scheduleStatus === 'loading' ? (
                  <p id="time-hint" role="status" className="text-[13px] text-muted">Checking availability…</p>
                ) : day.closed || openSlots.length === 0 ? (
                  <p id="time-hint" role="status" className="text-[13px] text-body">
                    {day.closed ? 'The studio is closed or fully booked' : 'No open times left'} on {formatDate(date)}. Please pick another date, or message us to ask.
                  </p>
                ) : (
                  <>
                    <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                      {day.slots.map((s) => (
                        <label key={s.value} className={s.available ? 'cursor-pointer' : 'cursor-not-allowed'}>
                          <input
                            type="radio"
                            name="time"
                            value={s.value}
                            disabled={!s.available}
                            checked={time === s.value}
                            onChange={() => setTime(s.value)}
                            className="peer sr-only"
                          />
                          <span
                            className={`flex h-11 items-center justify-center rounded border text-[15px] transition-colors peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-pink ${
                              s.available
                                ? 'border-[#EBC4D3] bg-[#FFFAFC] text-ink hover:border-pink peer-checked:border-pink peer-checked:bg-pink peer-checked:text-white'
                                : 'border-transparent bg-petal text-muted line-through'
                            }`}
                          >
                            {s.label}
                            {!s.available && <span className="sr-only"> (not available)</span>}
                          </span>
                        </label>
                      ))}
                    </div>
                    <p id="time-hint" className="text-xs text-muted">
                      {openSlots.length} open on {formatDate(date)}. Crossed-out times are booked. We'll confirm your time when we reply.
                    </p>
                  </>
                )}
              </fieldset>

              <div className="flex flex-col gap-2">
                <label htmlFor="f-msg" className={labelCls}>Message *</label>
                <textarea
                  id="f-msg"
                  name="msg"
                  rows={4}
                  placeholder="Package you're interested in, number of people, theme ideas…"
                  aria-invalid={!!errors.msg}
                  aria-describedby={errors.msg ? 'e-msg' : undefined}
                  className={`${fieldCls(errors.msg)} h-auto resize-y py-3`}
                />
                {errors.msg && <span id="e-msg" className="text-[13px] text-[#B3261E]">{errors.msg}</span>}
              </div>

              <button type="submit" className="btn-pink h-[54px] cursor-pointer">Prepare my inquiry</button>
              <p className="text-xs text-muted">
                This form doesn't send anything by itself: it opens your inquiry in your email app, addressed to the studio.
              </p>
            </form>
          ) : (
            <div role="status" className="flex flex-col gap-4">
              <h3 className="font-serif text-[32px] font-semibold text-berry">Your inquiry is ready</h3>
              <p className="text-body">
                Nothing has been sent yet. Open it in your email app and press send, or message us on Facebook instead. We'll reply to confirm availability.
              </p>
              <a href={mailHref} className="btn-pink">Open in email</a>
              <a href={studio.messenger} target="_blank" rel="noopener noreferrer" className="btn-line">Message us on Facebook</a>
              <button type="button" onClick={() => setMailHref(null)} className="min-h-11 self-start text-[13px] text-berry underline">
                Edit inquiry
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
