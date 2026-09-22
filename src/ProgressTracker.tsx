import './LetterExample.css'

interface LetterExampleProps {
  letter: string | null
}

/** English letter -> a simple, kid-friendly Hindi example word + translation. */
const EXAMPLE_WORDS: Record<string, { hi: string; translation: string }> = {
  A: { hi: 'अनार', translation: 'Pomegranate' },
  B: { hi: 'बकरी', translation: 'Goat' },
  C: { hi: 'चाय', translation: 'Tea' },
  D: { hi: 'डमरू', translation: 'Hand drum' },
  E: { hi: 'ऐनक', translation: 'Glasses' },
  F: { hi: 'फल', translation: 'Fruit' },
  G: { hi: 'गाय', translation: 'Cow' },
  H: { hi: 'हाथी', translation: 'Elephant' },
  I: { hi: 'इमली', translation: 'Tamarind' },
  J: { hi: 'जहाज़', translation: 'Ship' },
  K: { hi: 'किताब', translation: 'Book' },
  L: { hi: 'लड्डू', translation: 'Laddu' },
  M: { hi: 'मछली', translation: 'Fish' },
  N: { hi: 'नाव', translation: 'Boat' },
  O: { hi: 'ओखली', translation: 'Mortar' },
  P: { hi: 'पतंग', translation: 'Kite' },
  Q: { hi: 'क्यूब', translation: 'Cube' },
  R: { hi: 'रेल', translation: 'Train' },
  S: { hi: 'सूरज', translation: 'Sun' },
  T: { hi: 'तितली', translation: 'Butterfly' },
  U: { hi: 'उल्लू', translation: 'Owl' },
  V: { hi: 'वृक्ष', translation: 'Tree' },
  W: { hi: 'वॉच', translation: 'Watch' },
  X: { hi: 'एक्स-रे', translation: 'X-ray' },
  Y: { hi: 'योगा', translation: 'Yoga' },
  Z: { hi: 'ज़ेबरा', translation: 'Zebra' },
}

/**
 * Shows a simple example word for the currently active letter, to reinforce
 * what the child just heard. Renders nothing until a letter has been picked.
 */
function LetterExample({ letter }: LetterExampleProps) {
  if (!letter) {
    return null
  }

  const example = EXAMPLE_WORDS[letter]
  if (!example) {
    return null
  }

  return (
    <div className="letter-example" aria-live="polite">
      <span className="letter-example-word">{example.hi}</span>
      <span className="letter-example-translation">{example.translation}</span>
    </div>
  )
}

export default LetterExample