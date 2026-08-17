import { useEffect, useState } from 'react'
import { IntroSequence } from './components/IntroSequence'
import { Navigation } from './components/Navigation'
import { Hero } from './components/Hero'

export default function App() {
  const [introDone, setIntroDone] = useState(() => {
    const forceIntro = new URLSearchParams(window.location.search).get('intro') === '1'
    if (forceIntro) return false
    try { return sessionStorage.getItem('northDivisionIntroSeen') === 'true' } catch { return false }
  })

  useEffect(() => {
    document.documentElement.dataset.intro = introDone ? 'done' : 'playing'
  }, [introDone])

  const finishIntro = () => {
    try { sessionStorage.setItem('northDivisionIntroSeen', 'true') } catch { /* private mode */ }
    setIntroDone(true)
  }

  return (
    <main>
      {!introDone && <IntroSequence onComplete={finishIntro} />}
      <Navigation visible={introDone} />
      <Hero ready={introDone} />
    </main>
  )
}
