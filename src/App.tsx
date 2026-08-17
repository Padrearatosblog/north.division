import { useEffect, useState } from 'react'
import { IntroSequence } from './components/IntroSequence'
import { Navigation } from './components/Navigation'
import { Hero } from './components/Hero'

export default function App() {
  const [introDone, setIntroDone] = useState(false)

  useEffect(() => {
    document.documentElement.dataset.intro = introDone ? 'done' : 'playing'
  }, [introDone])

  const finishIntro = () => {
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
