import zxcvbn from 'zxcvbn'

const levels = [
  { label: 'Very Weak',  color: 'bg-cyber-red',   textColor: 'text-cyber-red'   },
  { label: 'Weak',       color: 'bg-orange-500',  textColor: 'text-orange-500'  },
  { label: 'Fair',       color: 'bg-cyber-amber', textColor: 'text-cyber-amber' },
  { label: 'Strong',     color: 'bg-cyber-blue',  textColor: 'text-cyber-blue'  },
  { label: 'Very Strong',color: 'bg-cyber-green', textColor: 'text-cyber-green' },
]

function formatCrackTime(str) {
  if (!str) return 'instantly'
  return str.replace(/_/g, ' ')
}

export default function PasswordStrengthMeter({ password }) {
  if (!password) return null

  const result   = zxcvbn(password)
  const score    = result.score          // 0–4
  const level    = levels[score]
  const crackTime = formatCrackTime(
    result.crack_times_display?.offline_slow_hashing_1e4_per_second
  )
  const segments = [0, 1, 2, 3, 4]

  return (
    <div className="mt-3 space-y-2">
      {/* Bar */}
      <div className="flex gap-1 h-1.5">
        {segments.map(i => (
          <div
            key={i}
            className={`flex-1 rounded-full transition-all duration-300 ${
              i <= score ? level.color : 'bg-cyber-border'
            }`}
          />
        ))}
      </div>

      {/* Label + crack time */}
      <div className="flex items-center justify-between">
        <span className={`text-xs font-mono font-semibold ${level.textColor}`}>
          {level.label}
        </span>
        <span className="text-xs font-mono text-cyber-muted">
          Crack time: <span className="text-cyber-text">{crackTime}</span>
        </span>
      </div>

      {/* Suggestion */}
      {result.feedback?.suggestions?.[0] && (
        <p className="text-xs font-mono text-cyber-muted leading-relaxed">
          <span className="text-cyber-amber">→ </span>
          {result.feedback.suggestions[0]}
        </p>
      )}
    </div>
  )
}
