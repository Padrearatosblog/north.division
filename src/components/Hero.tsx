import { useEffect, useRef } from 'react'
import { TechnicalOverlay } from './TechnicalOverlay'

export function Hero({ ready }: { ready: boolean }) {
  const sectionRef = useRef<HTMLElement>(null)
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    let raf = 0
    const update = () => {
      const r = section.getBoundingClientRect()
      const progress = Math.max(0, Math.min(1, -r.top / Math.max(1, r.height - innerHeight)))
      section.style.setProperty('--scroll', progress.toFixed(3)); raf = 0
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    update(); addEventListener('scroll', onScroll, { passive: true })
    return () => { removeEventListener('scroll', onScroll); cancelAnimationFrame(raf) }
  }, [])

  return (
    <section id="top" ref={sectionRef} className={`hero ${ready ? 'is-ready' : ''}`}>
      <div className="hero__sticky">
        <div className="hero__photo" style={{ backgroundImage: `url(${import.meta.env.BASE_URL}assets/industrial-structure.webp)` }} />
        <div className="hero__wireframe" />
        <TechnicalOverlay />
        <div className="hero__shade" />
        <div className="hero__content">
          <div className="hero__eyebrow"><span>ND / STRUCTURAL SYSTEMS</span><span>PAMPLONA · ES</span></div>
          <h1><span>ENGINEERING</span><span>THE IMPOSSIBLE.</span></h1>
          <p className="hero__lead">Ingeniería especializada en estructuras metálicas.</p>
          <p className="hero__services">DISEÑO <i/> CÁLCULO <i/> MODELADO 3D <i/> FABRICACIÓN <i/> MONTAJE</p>
          <a className="hero__cta" href="#transition"><span>DESCUBRIR CAPACIDADES</span><b>→</b></a>
        </div>
        <div className="hero__index"><span>01</span><i/><span>04</span></div>
        <div className="hero__scroll"><span>SCROLL TO ENGINEERING</span><i/></div>
      </div>
      <div id="transition" className="hero__transition-label">
        <span>PHASE 01</span><h2>FROM STEEL<br/>TO STRUCTURE.</h2><p>La materia desaparece. La lógica permanece.</p>
      </div>
    </section>
  )
}
