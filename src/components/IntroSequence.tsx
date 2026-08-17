import { useEffect, useRef, useState } from 'react'
import { BrandMark } from './BrandMark'
import { TechnicalOverlay } from './TechnicalOverlay'
import { WeldingParticles } from './WeldingParticles'
import { INTRO_TIMELINE, pulse, range } from '../lib/introTimeline'

export function IntroSequence({ onComplete }: { onComplete: () => void }) {
  const rootRef = useRef<HTMLElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const startedAt = useRef(0)
  const [running, setRunning] = useState(false)
  const [withSound, setWithSound] = useState(true)

  const begin = (sound: boolean) => {
    const audio = audioRef.current
    setWithSound(sound)
    startedAt.current = performance.now()
    if (audio) {
      audio.currentTime = 0
      audio.volume = sound ? 1 : 0
      if (sound) void audio.play()
    }
    setRunning(true)
  }

  useEffect(() => {
    if (!running) return
    const root = rootRef.current
    const audio = audioRef.current
    let frame = 0
    const render = () => {
      const clock = (performance.now() - startedAt.current) / 1000
      const time = withSound && audio && !audio.paused && audio.currentTime > 0 ? audio.currentTime : clock
      const logo = range(time, INTRO_TIMELINE.logoForgeStart, INTRO_TIMELINE.logoForgeEnd)
      const impact = pulse(time, INTRO_TIMELINE.northImpact, .16)
      const north = range(time, INTRO_TIMELINE.northImpact - .04, INTRO_TIMELINE.northImpact + .2)
      const engineering = range(time, INTRO_TIMELINE.engineeringStart, 6.35)
      const technical = range(time, INTRO_TIMELINE.technicalStart, INTRO_TIMELINE.technicalPeak)
      const wire = range(time, 8.05, 12.25) * .68
      const finalFlash = Math.max(pulse(time, INTRO_TIMELINE.finalWeld, .22), pulse(time, INTRO_TIMELINE.firstWeld, .1) * .65)
      const weldActive = time >= INTRO_TIMELINE.logoForgeStart && time <= INTRO_TIMELINE.logoForgeEnd ? 1 : 0
      const weldAngle = -90 + logo * 360
      const exit = range(time, INTRO_TIMELINE.heroStart, INTRO_TIMELINE.duration)
      root?.style.setProperty('--intro-logo', logo.toFixed(3))
      root?.style.setProperty('--intro-impact', impact.toFixed(3))
      root?.style.setProperty('--intro-north', north.toFixed(3))
      root?.style.setProperty('--intro-engineering', engineering.toFixed(3))
      root?.style.setProperty('--intro-technical', technical.toFixed(3))
      root?.style.setProperty('--intro-wire', wire.toFixed(3))
      root?.style.setProperty('--intro-flash', finalFlash.toFixed(3))
      root?.style.setProperty('--intro-weld-active', weldActive.toFixed(0))
      root?.style.setProperty('--intro-weld-angle', weldAngle.toFixed(2))
      root?.style.setProperty('--intro-exit', exit.toFixed(3))
      root?.style.setProperty('--intro-progress', Math.min(1, time / INTRO_TIMELINE.duration).toFixed(3))
      root?.style.setProperty('--scroll', wire.toFixed(3))
      if (audio && withSound && time >= INTRO_TIMELINE.audioFadeStart) {
        audio.volume = 1 - range(time, INTRO_TIMELINE.audioFadeStart, INTRO_TIMELINE.duration)
      }
      if (time >= INTRO_TIMELINE.duration) {
        audio?.pause()
        onComplete()
        return
      }
      frame = requestAnimationFrame(render)
    }
    frame = requestAnimationFrame(render)
    return () => cancelAnimationFrame(frame)
  }, [onComplete, running, withSound])

  return (
    <section ref={rootRef} className={`intro-experience ${running ? 'is-running' : 'is-gated'}`} aria-label="North Division cinematic experience">
      <audio ref={audioRef} src={`${import.meta.env.BASE_URL}assets/north-division-intro.mp3?v=3`} preload="auto" />

      <div className="experience-gate" aria-hidden={running}>
        <div className="experience-gate__inner">
          <BrandMark compact />
          <p>STRUCTURAL ENGINEERING / STEEL SYSTEMS</p>
          <button onClick={() => begin(true)}><span>ENTER EXPERIENCE</span><b>→</b></button>
          <button className="experience-gate__silent" onClick={() => begin(false)}>ENTER WITHOUT SOUND</button>
        </div>
        <span className="experience-gate__index">ND / 001</span>
      </div>

      <div className="intro-scene">
        <div className="intro-scene__steel" />
        <div className="intro-scene__structure" style={{ backgroundImage: `url(${import.meta.env.BASE_URL}assets/industrial-structure.webp)` }} />
        <TechnicalOverlay />
        <div className="intro-scene__shade" />
        <div className="intro-scene__frame"><span>ND / FABRICATION SEQUENCE</span><span>CALCULATION → CONSTRUCTION</span><i/><i/><i/><i/></div>

        <div className="intro-scene__logo">
          <BrandMark />
          <svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="46" pathLength="100" /></svg>
          <div className="intro-scene__weld-orbit" aria-hidden="true"><i/></div>
          <div className="intro-scene__heat" />
        </div>

        <div className="intro-scene__wordmark">
          <strong>NORTH DIVISION</strong>
          <span>ENGINEERING GROUP</span>
          <small>STRUCTURAL DESIGN · FABRICATION · ASSEMBLY</small>
        </div>

        <WeldingParticles running={running} startedAt={startedAt} />
        <div className="intro-scene__flash" />
        <div className="intro-scene__progress"><span>00</span><i/><span>15</span></div>
        <button className="intro-scene__skip" onClick={onComplete}>SKIP INTRO</button>
      </div>
    </section>
  )
}
