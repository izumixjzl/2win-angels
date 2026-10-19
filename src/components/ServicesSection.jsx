import { services } from '../data/content'
import Reveal from './Reveal'

export default function ServicesSection() {
  return (
    <section id="services" className="bg-petal py-20 lg:pb-36 lg:pt-32">
      <div className="wrap">
        <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow mb-4">Sessions</p>
            <h2 className="h2">Photoshoots we offer</h2>
          </div>
          <p className="max-w-[380px] text-body">
            Seven kinds of sessions, each with a few package levels. Prices shown are the current promo rates.
          </p>
        </div>

        <div className="grid gap-x-7 gap-y-14 sm:grid-cols-2 xl:grid-cols-4">
          {services.map((s, i) => (
            <Reveal as="article" key={s.name} className={i % 2 === 1 ? 'sm:mt-14' : ''}>
              {s.img ? (
                <div className="group aspect-[3/4] overflow-hidden rounded-t-[160px] bg-rose">
                  <img
                    src={s.img}
                    alt={s.alt}
                    loading="lazy"
                    width="1000"
                    height="1500"
                    style={{ objectPosition: s.pos }}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>
              ) : (
                <div
                  className={`flex aspect-[3/4] flex-col items-center justify-center gap-1.5 rounded-t-[160px] p-6 text-center ${
                    s.tone === 'pink' ? 'bg-pink text-white' : 'bg-rose text-pink-deep'
                  }`}
                >
                  <span className="font-serif text-[34px] italic leading-tight">{s.title}</span>
                  <span className="text-xs uppercase tracking-[.2em]">{s.sub}</span>
                </div>
              )}
              <h3 className="mt-5 font-serif text-[28px] font-semibold leading-tight text-berry">{s.name}</h3>
              <p className="mt-1.5 text-[15px] text-body">{s.desc}</p>
              <p className="mt-2.5 text-[13px] font-semibold tracking-wide text-pink-dark">{s.from}</p>
              <a
                href={s.href || '#packages'}
                className="inline-flex min-h-11 items-center text-xs font-semibold uppercase tracking-[.14em] text-pink no-underline hover:text-pink-dark"
              >
                {s.cta || 'View packages'} →
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
