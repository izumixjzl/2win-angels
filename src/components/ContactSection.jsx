import { MapPin } from 'lucide-react'
import { studio } from '../data/content'

export default function ContactSection() {
  const rows = [
    { label: 'Address', value: studio.address },
    { label: 'Mobile', value: studio.phoneDisplay, href: studio.phoneHref },
    { label: 'Email', value: studio.email, href: `mailto:${studio.email}` },
    { label: 'Facebook', value: studio.name, href: studio.facebook, external: true },
  ]

  return (
    <section id="contact" className="bg-rose py-20 lg:py-32">
      <div className="wrap grid gap-16 lg:grid-cols-2">
        <div>
          <p className="mb-4 text-xs font-medium uppercase tracking-[.3em] text-pink-deep">Visit &amp; contact</p>
          <h2 className="h2">Find the studio</h2>
          <p className="mt-5 max-w-[440px] text-body">
            We're a home-based studio, so please message or call ahead to set a schedule before visiting.
          </p>
          <a href={studio.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn-line mt-8">
            <MapPin size={16} /> Get directions
          </a>
        </div>

        <dl>
          {rows.map((r, i) => (
            <div key={r.label} className={`flex flex-col gap-1.5 py-5 ${i < rows.length - 1 ? 'border-b border-rose-line' : ''}`}>
              <dt className="text-xs font-semibold uppercase tracking-[.2em] text-pink-deep">{r.label}</dt>
              <dd className="font-serif text-[23px] leading-snug text-ink [overflow-wrap:anywhere]">
                {r.href ? (
                  <a
                    href={r.href}
                    className="no-underline hover:text-pink"
                    {...(r.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    {r.value}
                  </a>
                ) : (
                  r.value
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
