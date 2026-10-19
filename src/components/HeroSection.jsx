import { hero } from '../data/content'

export default function HeroSection() {
  return (
    <section id="home" aria-label="Introduction" className="relative flex min-h-[640px] items-end bg-berry text-white lg:min-h-[860px]">
      <img
        src={hero.src}
        alt={hero.alt}
        width="2048"
        height="1365"
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover object-[50%_35%]"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-[rgba(40,10,26,.72)] via-[rgba(40,10,26,.25)] to-[rgba(40,10,26,.1)]" />

      <div className="wrap relative w-full pb-20 lg:pb-[88px]">
        <p className="mb-5 text-xs font-medium uppercase tracking-[.3em] text-[#FFD6E7]">Twin photographers · Toril, Davao City</p>
        <h1 className="max-w-[800px] font-serif text-[44px] font-medium leading-[1.02] tracking-tight sm:text-6xl lg:text-[78px]">
          Every moment deserves to be <em className="font-normal text-[#FFC2DC]">remembered.</em>
        </h1>
        <p className="mt-6 max-w-[520px] text-lg text-[#FFF0F6]">
          Beautifully captured moments, genuine emotions, and memories to keep for a lifetime, from our home-based studio in Toril.
        </p>
        <div className="mt-10 flex flex-wrap gap-3.5">
          <a href="#book" className="btn-pink">Book a Session</a>
          <a href="#portfolio" className="btn-ghost">Explore Our Portfolio</a>
        </div>
      </div>

      <a href="#about" aria-label="Scroll to About" className="absolute bottom-[88px] right-8 hidden flex-col items-center gap-2.5 text-[10px] uppercase tracking-[.3em] text-[#FFD6E7] no-underline md:flex">
        <span className="[writing-mode:vertical-rl]">Scroll</span>
        <span className="h-12 w-px bg-[#FFD6E7]" />
      </a>
    </section>
  )
}
