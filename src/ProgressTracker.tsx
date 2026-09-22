import './ProgressTracker.css'

interface ProgressTrackerProps {
  visitedLetters: string[]
  totalLetters: number
}

/**
 * Shows how many letters the user has explored so far, as a count and a
 * progress bar. Purely presentational — the parent owns the visited-letter
 * state so it can be shared with other components later if needed.
 */
function ProgressTracker({ visitedLetters, totalLetters }: ProgressTrackerProps) {
  const learnedCount = visitedLetters.length
  const rawPercent = totalLetters === 0 ? 0 : (learnedCount / totalLetters) * 100
  const percent = Math.max(0, Math.min(100, Math.round(rawPercent)))
  const isComplete = learnedCount === totalLetters
  const progressText = `${learnedCount} of ${totalLetters} letters learned (${percent}%)`

  return (
    <section className="progress-tracker">
      <div className="progress-tracker-label" id="progress-tracker-label">
        <span>
          {learnedCount} / {totalLetters} letters learned
        </span>
        {isComplete && (
          <span className="progress-tracker-complete">
            <span aria-hidden="true">🎉 </span>All done!
          </span>
        )}
      </div>
      <div
        className="progress-tracker-bar"
        role="progressbar"
        aria-labelledby="progress-tracker-label"
        aria-valuenow={learnedCount}
        aria-valuemin={0}
        aria-valuemax={totalLetters}
        aria-valuetext={progressText}
      >
        <div className="progress-tracker-fill" style={{ width: `${percent}%` }} />
      </div>
    </section>
  )
}

export default ProgressTracker