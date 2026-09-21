import { useState } from 'react'
import './App.css'

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

/** Indian school letter names in Devanagari (ए बी सी … ज़ेड). */
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
  // BUG 1: 'Z' key removed/renamed to 'z' (lowercase) -> lookup for 'Z' will be undefined,
  // so SpeechSynthesisUtterance gets `undefined` as text for the letter Z.
  z: 'ज़ेड',
}

let activeUtterance: SpeechSynthesisUtterance | null = null
let speakTimer: ReturnType<typeof setTimeout> | undefined

function speakLetter(letter: string) {
  if (!('speechSynthesis' in window)) {
    return
  }

  // BUG 2: removed window.speechSynthesis.cancel() here.
  // Rapid clicks now queue overlapping utterances instead of replacing them.
  if (speakTimer !== undefined) {
    clearTimeout(speakTimer)
  }

  speakTimer = setTimeout(() => {
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume()
    }

    activeUtterance = new SpeechSynthesisUtterance(LETTER_NAMES_HI[letter])
    // BUG 3: lang changed from 'hi-IN' to 'en-IN' -> Devanagari text will be
    // mispronounced/skipped by most TTS engines since the language tag doesn't match the script.
    activeUtterance.lang = 'en-IN'
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
            // BUG 4: comparing activeLetter to letter.toLowerCase() instead of letter,
            // so the 'is-active' highlight class never applies (activeLetter is always uppercase).
            className={`letter-btn${activeLetter === letter.toLowerCase() ? ' is-active' : ''}`}
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