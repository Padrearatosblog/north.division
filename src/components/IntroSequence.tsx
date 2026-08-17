import { useEffect, useRef, useState } from 'react'
import { BrandMark } from './BrandMark'
import { WeldingParticles } from './WeldingParticles'

export function IntroSequence({ onComplete }: { onComplete: () => void }) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const startedAt = useRef(0)
  const [soundOn, setSoundOn] = useState(true)

  useEffect(() => { startedAt.current = performance.now() }, [])

  useEffect(() => {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
    const id = window.setTimeout(onComplete, reduced ? 700 : 4450)
    return () => clearTimeout(id)
  }, [onComplete])

  useEffect(() => {
    if (!soundOn || !audioRef.current) return
    const audio = audioRef.current
    const elapsed = Math.max(0, (performance.now() - startedAt.current) / 1000)
    const syncAndPlay = () => {
      audio.currentTime = Math.min(elapsed, Math.max(0, audio.duration - .05))
      void audio.play().catch(() => {
        setSoundOn(false)
        try { sessionStorage.setItem('northDivisionSoundEnabled', 'false') } catch { /* private mode */ }
      })
    }
    if (Number.isFinite(audio.duration)) syncAndPlay()
    else audio.addEventListener('loadedmetadata', syncAndPlay, { once: true })
    return () => audio.removeEventListener('loadedmetadata', syncAndPlay)
  }, [soundOn])

  const toggleSound = () => {
    const next = !soundOn
    try { sessionStorage.setItem('northDivisionSoundEnabled', String(next)) } catch { /* private mode */ }
    if (!next) audioRef.current?.pause()
    setSoundOn(next)
  }

  return (
    <section className="intro" aria-label="North Division intro">
      <audio ref={audioRef} src={`${import.meta.env.BASE_URL}assets/north-division-intro.mp3?v=2`} preload="auto" autoPlay />
      <div className="intro__steel" />
      <div className="intro__structure-reveal" style={{ backgroundImage: `linear-gradient(90deg,rgba(2,4,5,.83),rgba(2,4,5,.3)),url(${import.meta.env.BASE_URL}assets/industrial-structure.webp)` }} />
      <div className="intro__technical-frame" aria-hidden="true">
        <span>ND / FORGING SEQUENCE</span><span>STRUCTURAL SYSTEM · 01</span>
        <i/><i/><i/><i/>
      </div>
      <div className="intro__flash intro__flash--first" />
      <div className="intro__logo-wrap">
        <BrandMark className="intro__logo" />
        <div className="intro__weld-line" />
        <svg className="intro__weld-arc" viewBox="0 0 100 100" aria-hidden="true">
          <circle cx="50" cy="50" r="46" pathLength="100" />
        </svg>
        <div className="intro__heat-ring" />
      </div>
      <div className="intro__wordmark" aria-hidden="true">
        <strong>NORTH DIVISION</strong>
        <span>ENGINEERING GROUP</span>
        <small>ENGINEERING · STRUCTURES · INDUSTRIAL ASSEMBLY</small>
      </div>
      <WeldingParticles />
      <div className="intro__impact-bars" aria-hidden="true"><i/><i/></div>
      <div className="intro__phase" aria-hidden="true"><span>01</span><i/><span>STEEL / CALCULATION / ASSEMBLY</span></div>
      <div className="intro__flash intro__flash--final" />
      <button className="intro__skip" onClick={onComplete}>SKIP INTRO</button>
      <button className={`intro__sound ${soundOn ? 'is-on' : ''}`} onClick={toggleSound} aria-pressed={soundOn}>
        <span aria-hidden="true">{soundOn ? '◖))' : '◖×'}</span>{soundOn ? 'SONIDO ACTIVO' : 'ACTIVAR SONIDO'}
      </button>
    </section>
  )
}
