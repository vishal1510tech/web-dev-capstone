export default function ResultsScreen({ score, total }) {
  return (
    <div className="text-center p-10">
      <h2 className="text-3xl font-bold text-emerald-400">Quiz Finished!</h2>
      <p className="text-xl mt-4">You scored {score} out of {total}</p>
    </div>
  );
}