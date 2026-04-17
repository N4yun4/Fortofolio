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

  useEffect(() => {
    const audio = audioRef.current
    audio.volume = 0.4
    audio.loop = true

    // Attempt to play immediately (works if browser permits or user previously interacted)
    audio.play().catch(() => {})

    const tryPlay = () => {
      audio.play().catch(() => {})
    }

    document.addEventListener('click', tryPlay, { once: true })
    document.addEventListener('keydown', tryPlay, { once: true })
    
    return () => {
      document.removeEventListener('click', tryPlay)
      document.removeEventListener('keydown', tryPlay)
    }
  }, [])

  return <audio ref={audioRef} src={bgMusic} autoPlay />
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
