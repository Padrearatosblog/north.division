import { useEffect, useRef } from 'react'

export function WeldingParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    let frame = 0
    let particles: { x:number; y:number; vx:number; vy:number; life:number; size:number; hot:boolean }[] = []
    const resize = () => { canvas.width = innerWidth * devicePixelRatio; canvas.height = innerHeight * devicePixelRatio; ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0) }
    const spark = () => {
      const angle = Math.random() * Math.PI * 2
      const radius = Math.min(innerWidth, innerHeight) * .205
      const x = innerWidth * .5 + Math.cos(angle) * radius
      const y = innerHeight * .45 + Math.sin(angle) * radius
      const burst = frame > 150 && frame < 190 ? 2.2 : 1
      for (let i=0; i<(4 + Math.random()*9)*burst; i++) particles.push({ x,y, vx:(Math.cos(angle)*2.5+(Math.random()-.5)*6)*burst, vy:(Math.sin(angle)*2.2+(Math.random()-.7)*5)*burst, life:28+Math.random()*48, size:.35+Math.random()*2.2, hot:Math.random()>.16 })
    }
    const draw = () => {
      ctx.clearRect(0,0,innerWidth,innerHeight)
      if (frame % (frame > 150 && frame < 190 ? 2 : 6) === 0) spark()
      particles = particles.filter(p => p.life-- > 0)
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.vy += .075; p.vx *= .985
        ctx.beginPath(); ctx.moveTo(p.x,p.y); ctx.lineTo(p.x-p.vx*1.8,p.y-p.vy*1.8)
        ctx.strokeStyle = p.hot ? `rgba(255,${120 + p.life*2},70,${Math.min(1,p.life/18)})` : `rgba(98,238,255,${p.life/28})`
        ctx.lineWidth = p.size; ctx.stroke()
      })
      frame++; frame = requestAnimationFrame(draw)
    }
    resize(); addEventListener('resize',resize); draw()
    return () => { cancelAnimationFrame(frame); removeEventListener('resize',resize) }
  }, [])

  return <canvas className="welding-particles" ref={canvasRef} aria-hidden="true" />
}
