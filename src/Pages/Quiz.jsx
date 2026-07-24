import { useQuiz } from '../hooks/useQuiz'
import { Link } from 'react-router-dom'

export default function Quiz() {
  const {
    currentQuestion,
    currentIndex,
    totalQuestions,
    selectedAnswer,
    hasAnswered,
    isFinished,
    score,
    rating,
    progress,
    results,
    selectAnswer,
    nextQuestion,
    resetQuiz,
  } = useQuiz()

  if (isFinished) {
    return (
      <div className="pt-24 min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-20">
          
          {/* Summary Header */}
          <div className="cyber-card p-8 text-center mb-8 border-slate-800 bg-slate-900/90">
            <span className="text-5xl mb-4 inline-block">{rating.icon}</span>
            <span className="section-label mb-2">Quiz Complete</span>
            <h1 className="text-3xl font-extrabold text-white mb-2">Assessment Summary</h1>
            
            <div className="my-6 inline-flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-950 border border-slate-800">
              <span className="text-4xl font-extrabold text-indigo-400 font-mono">
                {score} / {totalQuestions}
              </span>
              <span className={`text-sm font-bold mt-1 font-mono ${rating.color}`}>
                Rating: {rating.label}
              </span>
            </div>

            <p className="text-sm text-slate-300 max-w-lg mx-auto leading-relaxed mb-6 font-sans">
              {rating.message}
            </p>

            <div className="flex justify-center gap-4">
              <button onClick={resetQuiz} className="cyber-btn-primary">
                🔄 Retake Quiz
              </button>
              <Link to="/threats" className="cyber-btn-secondary">
                📚 Review Threat Library
              </Link>
            </div>
          </div>

          {/* Question Breakdown */}
          <h2 className="text-xl font-bold text-white mb-4">Question Breakdown</h2>
          <div className="space-y-4">
            {results.map((res, idx) => (
              <div
                key={res.id}
                className={`p-5 rounded-xl border ${
                  res.isCorrect
                    ? 'border-emerald-500/30 bg-emerald-500/5'
                    : 'border-rose-500/30 bg-rose-500/5'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <span className="text-xs font-bold font-mono text-indigo-400">
                    Q{idx + 1}. {res.topic}
                  </span>
                  <span
                    className={`text-xs px-2.5 py-0.5 rounded-full font-mono font-semibold ${
                      res.isCorrect
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                    }`}
                  >
                    {res.isCorrect ? 'Correct' : 'Incorrect'}
                  </span>
                </div>
                <p className="text-sm font-semibold text-white mb-3">{res.question}</p>
                
                <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-lg border border-slate-800">
                  <strong className="text-slate-200">Explanation:</strong> {res.explanation}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-24 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-20">
        
        {/* Header & Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="section-label">Cyber Safety Quiz</span>
            <span className="text-xs font-mono font-semibold text-slate-400">
              Question {currentIndex + 1} of {totalQuestions}
            </span>
          </div>

          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className="bg-indigo-500 h-full transition-all duration-300 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Current Question Card */}
        {currentQuestion && (
          <div className="cyber-card p-6 sm:p-8 bg-slate-900/90 border-slate-800">
            <div className="mb-6">
              <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-slate-800 text-indigo-300 font-semibold mb-3 inline-block">
                {currentQuestion.topic}
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-white leading-snug">
                {currentQuestion.question}
              </h2>
            </div>

            {/* Options */}
            <div className="space-y-3 mb-6">
              {currentQuestion.options.map((opt) => {
                const isSelected = selectedAnswer === opt.id
                const isCorrectOption = opt.id === currentQuestion.correctId

                let optionStyle = 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'

                if (hasAnswered) {
                  if (isCorrectOption) {
                    optionStyle = 'bg-emerald-500/10 border-emerald-500/50 text-emerald-300 font-semibold'
                  } else if (isSelected && !isCorrectOption) {
                    optionStyle = 'bg-rose-500/10 border-rose-500/50 text-rose-300'
                  } else {
                    optionStyle = 'bg-slate-950/40 border-slate-800/40 text-slate-500 opacity-60'
                  }
                }

                return (
                  <button
                    key={opt.id}
                    onClick={() => selectAnswer(opt.id)}
                    disabled={hasAnswered}
                    className={`w-full text-left p-4 rounded-xl border text-sm transition-all flex items-start gap-3 ${optionStyle}`}
                  >
                    <span className="font-mono text-xs font-bold uppercase w-6 h-6 rounded-lg bg-slate-800 flex items-center justify-center shrink-0 mt-0.5">
                      {opt.id}
                    </span>
                    <span className="leading-relaxed">{opt.text}</span>
                  </button>
                )
              })}
            </div>

            {/* Explanation & Next Button */}
            {hasAnswered && (
              <div className="space-y-6 pt-4 border-t border-slate-800 animate-fade-in">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <p className="text-xs font-bold text-indigo-400 uppercase tracking-wider font-mono mb-1">
                    Key Takeaway
                  </p>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {currentQuestion.explanation}
                  </p>
                </div>

                <button
                  onClick={nextQuestion}
                  className="cyber-btn-primary w-full py-3"
                >
                  {currentIndex + 1 < totalQuestions ? 'Next Question →' : 'View Final Results →'}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
