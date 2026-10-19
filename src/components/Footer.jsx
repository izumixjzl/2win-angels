import { navLinks, studio } from '../data/content'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-berry pb-10 pt-[72px] text-on-dark">
      <div className="wrap">
        <div className="flex flex-wrap justify-between gap-10">
          <div className="flex max-w-[440px] items-center gap-5">
            <img src={studio.logo} alt={`${studio.name} logo`} width="96" height="96" loading="lazy" className="h-24 w-24 flex-none rounded-full object-cover" />
            <p>{studio.tagline}</p>
          </div>
          <nav aria-label="Footer" className="flex flex-wrap content-start gap-x-7 gap-y-3.5 text-sm">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="no-underline hover:text-white">{l.label}</a>
            ))}
            <a href={studio.facebook} target="_blank" rel="noopener noreferrer" className="no-underline hover:text-white">Facebook</a>
          </nav>
        </div>
        <div className="mt-14 flex flex-wrap justify-between gap-3 border-t border-white/15 pt-6 text-[13px]">
          <span>© {year} {studio.name}</span>
          <span>{studio.phoneDisplay} · {studio.email}</span>
        </div>
      </div>
    </footer>
  )
}
