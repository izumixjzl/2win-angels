import { reasons } from '../data/content'
import Reveal from './Reveal'

const numerals = ['i.', 'ii.', 'iii.']

export default function WhySection() {
  return (
    <section aria-labelledby="why-heading" className="bg-berry py-20 text-[#FFF0F6] lg:py-32">
      <div className="wrap">
        <p className="mb-4 text-xs font-medium uppercase tracking-[.3em] text-[#FFB3D1]">Why 2win Angels</p>
        <h2 id="why-heading" className="max-w-[720px] font-serif text-[38px] font-medium leading-[1.08] sm:text-5xl lg:text-[54px]">
          Made by two, for every milestone
        </h2>
        <div className="mt-16 grid gap-12 border-t border-white/20 pt-12 md:grid-cols-3">
          {reasons.map((r, i) => (
            <Reveal key={r.title}>
              <span className="font-serif text-2xl text-hot">{numerals[i]}</span>
              <h3 className="mb-2.5 mt-3 font-serif text-[30px] font-medium">{r.title}</h3>
              <p className="text-on-dark">{r.text}</p>
              {r.link && (
                <a
                  href={r.link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-flex min-h-11 items-center text-xs font-semibold uppercase tracking-[.16em] text-white underline underline-offset-[6px]"
                >
                  {r.link.label}
                </a>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
