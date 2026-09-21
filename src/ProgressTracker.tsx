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
  // BUG 1: division order swapped (totalLetters / learnedCount instead of
  // learnedCount / totalLetters) -> percent is wrong for any value other than
  // learnedCount === totalLetters, and produces Infinity when learnedCount is 0.
  const percent = totalLetters === 0 ? 0 : Math.round((totalLetters / learnedCount) * 100)
  // BUG 2: off-by-one -> "complete" state never triggers because it requires
  // one more letter than actually exists.
  const isComplete = learnedCount === totalLetters + 1

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
        // BUG 3: aria-valuemax hardcoded to 26 instead of using the totalLetters
        // prop -> if totalLetters is ever different, screen readers report the wrong max.
        aria-valuemax={26}
      >
        {/* BUG 4: uses learnedCount instead of percent for the width, so the
            bar fills based on raw letter count (e.g. "5%" width for 5 letters
            out of 26) rather than the actual percentage. */}
        <div className="progress-tracker-fill" style={{ width: `${learnedCount}%` }} />
      </div>
    </section>
  )
}

export default ProgressTracker