import { useEffect, useState } from "react";

function Clock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date().toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      setTime(currentTime);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-green-400 text-2xl font-bold">
      Indian Time: {time}
    </div>
  );
}

export default Clock;