import { ArrowUpRight } from 'lucide-react'
import { about, studio } from '../data/content'
import Reveal from './Reveal'

export default function AboutSection() {
  return (
    <section id="about" className="py-20 lg:py-36">
      <div className="wrap grid items-center gap-16 lg:grid-cols-[5fr_6fr] lg:gap-24">
        <Reveal className="relative mx-auto w-full max-w-[480px]">
          <div aria-hidden="true" className="absolute -left-6 -top-6 h-[70%] w-[70%] rounded-t-[240px] bg-rose" />
          <div className="group relative aspect-[2/3] overflow-hidden rounded-t-[240px]">
            <img
              src={about.src}
              alt={about.alt}
              width="1028"
              height="1500"
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            />
          </div>
        </Reveal>

        <Reveal>
          <p className="eyebrow mb-4">About the studio</p>
          <h2 className="h2">
            More than photographs. <em className="font-normal text-pink">Memories that last.</em>
          </h2>
          <p className="mt-7 text-[17px] text-body">
            We're twin photographers working from a home-based studio in Toril, Davao City. Two of us, one shared eye: we keep sessions relaxed and prices approachable, so good photographs never feel out of reach.
          </p>
          <p className="mt-4 text-[17px] text-body">
            From first birthdays and family portraits to prenups and maternity shoots, our promise stays the same: affordable, good-quality photoshoots.
          </p>
          <p className="mt-8 font-serif text-[27px] italic text-pink-dark">— the twins behind the lens</p>
          <a
            href={studio.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2.5 border-b border-pink pb-1 text-[13px] font-medium uppercase tracking-[.14em] text-pink no-underline hover:text-pink-dark"
          >
            Follow us on Facebook <ArrowUpRight size={14} />
          </a>
        </Reveal>
      </div>
    </section>
  )
}
