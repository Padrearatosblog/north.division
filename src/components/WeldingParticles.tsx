import { useEffect, useRef, type RefObject } from 'react'
import { INTRO_TIMELINE } from '../lib/introTimeline'

type Particle = { x:number; y:number; vx:number; vy:number; life:number; maxLife:number; size:number; trail:number; hot:boolean }

export function WeldingParticles({ running, startedAt }: { running: boolean; startedAt: RefObject<number> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !running || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    let frame = 0
    let particles: Particle[] = []
    const mobile = innerWidth < 760
    const resize = () => { canvas.width = innerWidth * devicePixelRatio; canvas.height = innerHeight * devicePixelRatio; ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0) }
    const spawn = (time: number, finalBurst = false) => {
      const forgeProgress = Math.max(0, Math.min(1, (time - INTRO_TIMELINE.logoForgeStart) / (INTRO_TIMELINE.logoForgeEnd - INTRO_TIMELINE.logoForgeStart)))
      const angle = -Math.PI / 2 + forgeProgress * Math.PI * 2
      const radius = Math.min(innerWidth, innerHeight) * (mobile ? .19 : .205)
      const x = innerWidth*.5 + Math.cos(angle)*radius
      const y = innerHeight*.46 + Math.sin(angle)*radius
      const count = (mobile ? 3 : 6) * (finalBurst ? 3 : 1)
      for(let i=0;i<count;i++) {
        const speed = finalBurst ? 1.8 : 1
        const maxLife = 28 + Math.random()*46
        particles.push({ x,y, vx:(Math.cos(angle)*2+(Math.random()-.5)*5)*speed, vy:(Math.sin(angle)*2+(Math.random()-.72)*5)*speed, life:maxLife,maxLife,size:.4+Math.random()*1.7,trail:1.2+Math.random()*1.8,hot:Math.random()>.18 })
      }
    }
    const draw = () => {
      const time = (performance.now() - startedAt.current) / 1000
      ctx.clearRect(0,0,innerWidth,innerHeight)
      const forging = time > INTRO_TIMELINE.logoForgeStart && time < INTRO_TIMELINE.logoForgeEnd
      const finalBurst = Math.abs(time - INTRO_TIMELINE.finalWeld) < .14
      if ((forging && frame%4===0) || (finalBurst && frame%2===0)) spawn(time,finalBurst)
      const floor = innerHeight * .82
      particles = particles.filter(p=>p.life-- > 0)
      particles.forEach(p=>{
        p.x+=p.vx;p.y+=p.vy;p.vy+=.085;p.vx*=.988
        if(p.y>floor&&p.vy>1.2){p.y=floor;p.vy*=-.28;p.vx*=.7}
        const alpha=Math.min(1,p.life/12)*(p.life/p.maxLife)
        ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(p.x-p.vx*p.trail,p.y-p.vy*p.trail)
        ctx.strokeStyle=p.hot?`rgba(255,${125+p.life*1.7},58,${alpha})`:`rgba(190,250,255,${alpha})`
        ctx.lineWidth=p.size;ctx.stroke()
      })
      frame++; if(time<INTRO_TIMELINE.duration+.3) frame=requestAnimationFrame(draw)
    }
    resize();addEventListener('resize',resize);draw()
    return()=>{cancelAnimationFrame(frame);removeEventListener('resize',resize)}
  },[running,startedAt])

  return <canvas className="intro-scene__particles" ref={canvasRef} aria-hidden="true" />
}
