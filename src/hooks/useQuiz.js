import { useState, useCallback } from 'react'
import { quizQuestions, getRating } from '../data/quizData'

export function useQuiz() {
  const [currentIndex, setCurrentIndex]     = useState(0)
  const [answers, setAnswers]               = useState({})
  const [isFinished, setIsFinished]         = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)

  const totalQuestions  = quizQuestions.length
  const currentQuestion = quizQuestions[currentIndex]
  const selectedAnswer  = answers[currentQuestion?.id]
  const hasAnswered     = selectedAnswer !== undefined
  const isCorrect       = selectedAnswer === currentQuestion?.correctId

  const selectAnswer = useCallback((optionId) => {
    if (hasAnswered) return
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: optionId }))
    setShowExplanation(true)
  }, [hasAnswered, currentQuestion])

  const nextQuestion = useCallback(() => {
    setShowExplanation(false)
    if (currentIndex + 1 < totalQuestions) {
      setCurrentIndex(i => i + 1)
    } else {
      setIsFinished(true)
    }
  }, [currentIndex, totalQuestions])

  const score = quizQuestions.reduce((acc, q) => answers[q.id] === q.correctId ? acc + 1 : acc, 0)
  const rating = getRating(score)

  const resetQuiz = useCallback(() => {
    setCurrentIndex(0)
    setAnswers({})
    setIsFinished(false)
    setShowExplanation(false)
  }, [])

  const progress = isFinished ? 100 : (currentIndex / totalQuestions) * 100

  const results = quizQuestions.map(q => ({
    ...q,
    userAnswer: answers[q.id],
    isCorrect:  answers[q.id] === q.correctId,
  }))

  return {
    currentQuestion, currentIndex, totalQuestions,
    selectedAnswer, hasAnswered, isCorrect,
    isFinished, showExplanation,
    score, rating, progress, results,
    selectAnswer, nextQuestion, resetQuiz,
  }
}