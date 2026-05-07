import { useState } from "react";
import { checkPasswordBreach } from "../services/pwnedApi";

function BreachChecker() {
  const [password, setPassword] = useState("");
  const [result, setResult] = useState("");

  const handleCheck = async () => {
    const breachCount = await checkPasswordBreach(password);

    if (breachCount) {
      setResult(
        `⚠️ Password found ${breachCount} times in breaches`
      );
    } else {
      setResult("✅ Password is safe");
    }
  };

  return (
    <div className="p-6 rounded-lg border mt-10">

      <h2 className="text-2xl font-bold mb-4">
        Password Breach Checker
      </h2>

      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-3 border rounded-lg mb-4 text-black"
      />

      <button
        onClick={handleCheck}
        className="px-6 py-3 bg-green-500 text-white rounded-lg"
      >
        Check Password
      </button>

      {result && (
        <p className="mt-4 font-semibold">
          {result}
        </p>
      )}
    </div>
  );
}

export default BreachChecker;