import './ProgressTracker.css'

interface ProgressTrackerProps {
  visitedLetters: Set<string>
  totalLetters: number
}

/**
 * Shows how many letters the user has explored so far, as a count and a
 * progress bar. Purely presentational — the parent owns the visited-letter
 * state so it can be shared with other components later if needed.
 */
function ProgressTracker({ visitedLetters, totalLetters }: ProgressTrackerProps) {
  const learnedCount = visitedLetters.size
  const percent = totalLetters === 0 ? 0 : Math.round((learnedCount / totalLetters) * 100)
  const isComplete = learnedCount === totalLetters

  return (
    <section className="progress-tracker" aria-label="Learning progress">
      <div className="progress-tracker-label">
        <span>
          {learnedCount} / {totalLetters} letters learned
        </span>
        {isComplete && <span className="progress-tracker-complete">🎉 All done!</span>}
      </div>
      <div
        className="progress-tracker-bar"
        role="progressbar"
        aria-valuenow={learnedCount}
        aria-valuemin={0}
        aria-valuemax={totalLetters}
      >
        <div className="progress-tracker-fill" style={{ width: `${percent}%` }} />
      </div>
    </section>
  )
}

export default ProgressTracker