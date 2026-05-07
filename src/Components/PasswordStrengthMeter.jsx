import zxcvbn from 'zxcvbn'

const STRENGTH_LEVELS = [
  { label: 'Very Weak',  color: 'bg-cyber-red',   textColor: 'text-cyber-red'   },
  { label: 'Weak',       color: 'bg-orange-500',  textColor: 'text-orange-500'  },
  { label: 'Fair',       color: 'bg-cyber-amber', textColor: 'text-cyber-amber' },
  { label: 'Strong',     color: 'bg-cyber-blue',  textColor: 'text-cyber-blue'  },
  { label: 'Very Strong',color: 'bg-cyber-green', textColor: 'text-cyber-green' },
]

/**
 * Normalizes the crack time strings from zxcvbn to be more readable.
 */
function humanizeCrackTime(timeString) {
  if (!timeString) return 'instantly'
  // zxcvbn uses underscores in some cases, clean those up
  return timeString.replace(/_/g, ' ')
}

export default function PasswordStrengthMeter({ password }) {
  if (!password) return null

  // zxcvbn is the industry standard for realistic password strength estimation
  const evaluation = zxcvbn(password)
  const score = evaluation.score
  const currentLevel = STRENGTH_LEVELS[score]
  
  // We use the 'offline_slow_hashing' metric as it represents a realistic brute-force attack
  const estimatedCrackTime = humanizeCrackTime(
    evaluation.crack_times_display?.offline_slow_hashing_1e4_per_second
  )

  return (
    <div className="mt-3 space-y-2">
      {/* Visual Progress Bar */}
      <div className="flex gap-1 h-1.5">
        {[0, 1, 2, 3, 4].map(step => (
          <div
            key={step}
            className={`flex-1 rounded-full transition-all duration-500 ${
              step <= score ? currentLevel.color : 'bg-cyber-border/40'
            }`}
          />
        ))}
      </div>

      {/* Text Feedback */}
      <div className="flex items-center justify-between">
        <span className={`text-[10px] uppercase tracking-wider font-black font-mono ${currentLevel.textColor}`}>
          {currentLevel.label}
        </span>
        <span className="text-[10px] font-mono text-cyber-muted uppercase tracking-tight">
          Crack time: <span className="text-cyber-text font-bold">{estimatedCrackTime}</span>
        </span>
      </div>

      {/* Helpful Suggestions */}
      {evaluation.feedback?.suggestions?.length > 0 && (
        <div className="pt-1">
          {evaluation.feedback.suggestions.slice(0, 1).map((suggestion, idx) => (
            <p key={idx} className="text-xs font-mono text-cyber-muted leading-relaxed flex gap-2">
              <span className="text-cyber-amber shrink-0">💡</span>
              <span>{suggestion}</span>
            </p>
          ))}
        </div>
      )}
    </div>
  )
}
