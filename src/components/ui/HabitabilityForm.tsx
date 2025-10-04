import { useState } from "react";
import { motion } from "motion/react";

// Form component for habitability calculator
function HabitabilityForm({ orbitalPeriod, stellarTemperature, onCalculate }) {
  const [planetRadius, setPlanetRadius] = useState("");
  const [planetMass, setPlanetMass] = useState("");
  const [stellarMass, setStellarMass] = useState("");
  const [habitabilityScore, setHabitabilityScore] = useState(null);

  const handleCalculate = () => {
    const radius = parseFloat(planetRadius);
    const mass = parseFloat(planetMass);
    const sMass = parseFloat(stellarMass);

    if (isNaN(radius) || isNaN(mass) || isNaN(sMass)) {
      alert("Please enter valid numbers for all fields");
      return;
    }

    const score = onCalculate(
      radius,
      mass,
      orbitalPeriod,
      sMass,
      stellarTemperature
    );
    setHabitabilityScore(score);
  };

  return (
    <div className="mt-6 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
      <h4 className="text-lg text-white mb-3">Habitability Calculator</h4>
      <div className="space-y-3">
        <div className="grid grid-cols-5 gap-2">
          <input
            type="number"
            step="0.01"
            value={planetRadius}
            onChange={(e) => setPlanetRadius(e.target.value)}
            placeholder="Radius (R⊕)"
            className="bg-gray-700 text-white px-2 py-1 rounded text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          <input
            type="number"
            step="0.01"
            value={planetMass}
            onChange={(e) => setPlanetMass(e.target.value)}
            placeholder="Mass (M⊕)"
            className="bg-gray-700 text-white px-2 py-1 rounded text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          <input
            type="number"
            value={orbitalPeriod}
            readOnly
            placeholder="Period (d)"
            className="bg-gray-600 text-gray-300 px-2 py-1 rounded text-sm cursor-not-allowed"
          />
          <input
            type="number"
            step="0.01"
            value={stellarMass}
            onChange={(e) => setStellarMass(e.target.value)}
            placeholder="St. Mass (M☉)"
            className="bg-gray-700 text-white px-2 py-1 rounded text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          <input
            type="number"
            value={stellarTemperature}
            readOnly
            placeholder="St. Temp (K)"
            className="bg-gray-600 text-gray-300 px-2 py-1 rounded text-sm cursor-not-allowed"
          />
        </div>

        <button
          onClick={handleCalculate}
          className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white py-2 rounded text-sm font-semibold transition-all"
        >
          Calculate Habitability
        </button>

        {habitabilityScore !== null && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between bg-gray-700/50 px-3 py-2 rounded"
          >
            <span className="text-gray-300 text-sm">Habitability Score:</span>
            <div className="flex items-center gap-2">
              <span className="text-white font-semibold">
                {habitabilityScore.toFixed(1)}%
              </span>
              <div className="w-20 h-2 bg-gray-600 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-green-400 to-blue-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${habitabilityScore}%` }}
                  transition={{ duration: 1 }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
export default HabitabilityForm;
