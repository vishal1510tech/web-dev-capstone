import zxcvbn from 'zxcvbn'

const STRENGTH_LEVELS = [
  { label: 'Very Weak', color: 'bg-rose-500', textColor: 'text-rose-400', border: 'border-rose-500/30' },
  { label: 'Weak', color: 'bg-orange-500', textColor: 'text-orange-400', border: 'border-orange-500/30' },
  { label: 'Fair', color: 'bg-amber-500', textColor: 'text-amber-400', border: 'border-amber-500/30' },
  { label: 'Strong', color: 'bg-indigo-500', textColor: 'text-indigo-400', border: 'border-indigo-500/30' },
  { label: 'Very Strong', color: 'bg-emerald-500', textColor: 'text-emerald-400', border: 'border-emerald-500/30' },
]

function humanizeCrackTime(timeString) {
  if (!timeString) return 'instantly'
  return timeString.replace(/_/g, ' ')
}

export default function PasswordStrengthMeter({ password }) {
  if (!password) return null

  const evaluation = zxcvbn(password)
  const score = evaluation.score
  const currentLevel = STRENGTH_LEVELS[score]
  
  const estimatedCrackTime = humanizeCrackTime(
    evaluation.crack_times_display?.offline_slow_hashing_1e4_per_second
  )

  return (
    <div className="mt-4 space-y-2.5 bg-slate-950/40 p-3.5 rounded-xl border border-slate-800">
      {/* Visual Progress Bar */}
      <div className="flex gap-1.5 h-2">
        {[0, 1, 2, 3, 4].map(step => (
          <div
            key={step}
            className={`flex-1 rounded-full transition-all duration-300 ${
              step <= score ? currentLevel.color : 'bg-slate-800'
            }`}
          />
        ))}
      </div>

      {/* Text Feedback */}
      <div className="flex items-center justify-between pt-1">
        <span className={`text-xs font-bold uppercase tracking-wider font-mono ${currentLevel.textColor}`}>
          {currentLevel.label}
        </span>
        <span className="text-xs font-mono text-slate-400">
          Crack estimate: <span className="text-white font-semibold">{estimatedCrackTime}</span>
        </span>
      </div>

      {/* Helpful Suggestions */}
      {evaluation.feedback?.suggestions?.length > 0 && (
        <div className="pt-1 border-t border-slate-800/80">
          {evaluation.feedback.suggestions.slice(0, 1).map((suggestion, idx) => (
            <p key={idx} className="text-xs text-slate-300 leading-relaxed flex items-start gap-2">
              <span className="text-amber-400 text-sm">💡</span>
              <span>{suggestion}</span>
            </p>
          ))}
        </div>
      )}
    </div>
  )
}
