import { useState } from 'react'
import './App.css'

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

/** Devanagari display names for A–Z, sourced from Indian school convention. */
const LETTER_NAMES_HI: Record<string, string> = {
  A: 'ए',
  B: 'बी',
  C: 'सी',
  D: 'डी',
  E: 'ई',
  F: 'एफ',
  G: 'जी',
  H: 'एच',
  I: 'आई',
  J: 'जे',
  K: 'के',
  L: 'एल',
  M: 'एम',
  N: 'एन',
  O: 'ओ',
  P: 'पी',
  Q: 'क्यू',
  R: 'आर',
  S: 'एस',
  T: 'टी',
  U: 'यू',
  V: 'वी',
  W: 'डब्ल्यू',
  X: 'एक्स',
  Y: 'वाई',
  Z: 'ज़ेड',
}

let activeUtterance: SpeechSynthesisUtterance | null = null
let speakTimer: ReturnType<typeof setTimeout> | undefined

function speakLetter(letter: string) {
  if (!('speechSynthesis' in window)) {
    return
  }

  window.speechSynthesis.cancel()
  if (speakTimer !== undefined) {
    clearTimeout(speakTimer)
  }

  speakTimer = setTimeout(() => {
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume()
    }

    activeUtterance = new SpeechSynthesisUtterance(LETTER_NAMES_HI[letter])
    activeUtterance.lang = 'hi-IN'
    activeUtterance.rate = 0.85
    window.speechSynthesis.speak(activeUtterance)
  }, 50)
}

function App() {
  const [activeLetter, setActiveLetter] = useState<string | null>(null)

  function handleLetterClick(letter: string) {
    setActiveLetter(letter)
    speakLetter(letter)
  }

  return (
    <main className="alphabet-app">
      <header className="alphabet-header">
        <h1>Alphabet A to Z</h1>
        <p>Tap a letter to hear the Indian pronunciation.</p>
      </header>

      <div className="active-letter" aria-live="polite">
        {activeLetter ? (
          <>
            <span className="active-letter-upper">{activeLetter}</span>
            <span className="active-letter-lower">{activeLetter.toLowerCase()}</span>
          </>
        ) : (
          <span className="active-letter-hint">Pick a letter</span>
        )}
      </div>

      <div className="alphabet-grid" role="list">
        {LETTERS.map((letter) => (
          <button
            key={letter}
            type="button"
            role="listitem"
            className={`letter-btn${activeLetter === letter ? ' is-active' : ''}`}
            onClick={() => handleLetterClick(letter)}
            aria-label={`Letter ${letter}`}
          >
            {letter}
          </button>
        ))}
      </div>
    </main>
  )
}

export default App