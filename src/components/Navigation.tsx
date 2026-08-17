import { BrandMark } from './BrandMark'

export function Navigation({ visible }: { visible: boolean }) {
  const replayIntro = () => {
    const url = new URL(window.location.href)
    url.searchParams.set('intro', '1')
    window.location.assign(url)
  }

  return (
    <header className={`navigation ${visible ? 'is-visible' : ''}`}>
      <a href="#top" className="navigation__brand"><BrandMark compact /></a>
      <nav aria-label="Principal">
        <a href="#transition">CAPABILITIES</a><a href="#transition">ENGINEERING</a><a href="#transition">PROJECTS</a><a href="#transition">CONTACT</a>
        <button type="button" onClick={replayIntro}>REPLAY INTRO</button>
      </nav>
    </header>
  )
}
