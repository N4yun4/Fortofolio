import { Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import menuVideo from './assets/main1.mp4'
import bgMusic from './assets/color-your-night.flac'
import P3Menu from './P3Menu'
import PageTransition from './PageTransition'
import Socials from './Socials'
import AboutMe from './AboutMe'
import './App.css'

function MusicPlayer() {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    audio.volume = 0.4
    audio.loop = true

    const tryPlay = () => {
      if (!started) {
        audio.play().then(() => {
          setPlaying(true)
          setStarted(true)
        }).catch(() => {})
      }
    }

    document.addEventListener('click', tryPlay, { once: true })
    document.addEventListener('keydown', tryPlay, { once: true })
    return () => {
      document.removeEventListener('click', tryPlay)
      document.removeEventListener('keydown', tryPlay)
    }
  }, [started])

  const toggle = (e) => {
    e.stopPropagation()
    const audio = audioRef.current
    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => {})
      setStarted(true)
    }
  }

  return (
    <>
      <audio ref={audioRef} src={bgMusic} />
      <button
        onClick={toggle}
        style={{
          position: 'fixed',
          bottom: 24,
          left: 24,
          zIndex: 9999,
          background: 'rgba(0,0,0,0.55)',
          border: '1px solid rgba(255,255,255,0.18)',
          borderRadius: 6,
          color: '#fff',
          fontFamily: "'Anton', sans-serif",
          fontSize: 12,
          letterSpacing: 2,
          padding: '6px 14px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <span style={{ fontSize: 16 }}>{playing ? '♪' : '♩'}</span>
        {playing ? 'MUSIC ON' : 'MUSIC OFF'}
      </button>
    </>
  )
}

function MenuScreen() {
  const navigate = useNavigate()

  const handleNavigate = (page) => {
    if (page === 'discord') {
      window.open('https://discord.gg/WDmrMjdu3A', '_blank')
    } else {
      navigate(`/${page}`)
    }
  }

  return (
    <div id="menu-screen">
      <video src={menuVideo} autoPlay loop muted playsInline />
      <P3Menu onNavigate={handleNavigate} />
    </div>
  )
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <PageTransition><MenuScreen /></PageTransition>
        } />
        <Route path="/about" element={
          <PageTransition variant="about"><AboutMe /></PageTransition>
        } />
        <Route path="/socials" element={
          <PageTransition variant="socials"><Socials /></PageTransition>
        } />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <>
      <MusicPlayer />
      <AnimatedRoutes />
    </>
  )
}
