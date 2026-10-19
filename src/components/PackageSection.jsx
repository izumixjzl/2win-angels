import { packages } from '../data/content'
import Reveal from './Reveal'

export default function PackageSection() {
  return (
    <section id="packages" className="bg-petal py-20 lg:pb-36 lg:pt-32">
      <div className="wrap">
        <Reveal className="mx-auto mb-14 max-w-[680px] text-center">
          <p className="eyebrow mb-4">Packages &amp; rates</p>
          <h2 className="h2">
            Find the right session <em className="font-normal text-pink">for you</em>
          </h2>
          <div className="mt-6 flex justify-center gap-6 text-[13px] uppercase tracking-[.12em]">
            <span className="font-semibold text-pink">Promo price</span>
            <span className="text-muted line-through">Regular price</span>
          </div>
        </Reveal>

        <div className="grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(min(100%,360px),1fr))]">
          {packages.map((g) => (
            <Reveal key={g.category} className="rounded bg-white px-5 pb-7 pt-6 sm:px-9 sm:pt-9">
              <h3 className="mb-4 font-serif text-[30px] font-semibold text-berry">{g.category}</h3>
              <ul>
                {g.items.map((it) => (
                  <li key={it.name} className="flex items-baseline gap-3 border-t border-rose py-3">
                    <span className="text-[15px] text-ink">{it.name}</span>
                    <span aria-hidden="true" className="flex-1 -translate-y-1 border-b-2 border-dotted border-[#EDB3C8]" />
                    <span className="text-[17px] font-semibold text-pink">{it.promo}</span>
                    <span className="min-w-[58px] text-right text-sm text-muted line-through">
                      <span className="sr-only">regular price </span>
                      {it.regular}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}

          <Reveal className="flex flex-col justify-center gap-3.5 rounded bg-berry p-9 text-[#FFF0F6]">
            <h3 className="font-serif text-[32px] font-medium leading-tight">Ready to book?</h3>
            <p className="text-on-dark">
              Promo rates can change. Message us with your package and preferred date and we'll confirm the current price and availability.
            </p>
            <a href="#book" className="btn-light self-start">Inquire now</a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
