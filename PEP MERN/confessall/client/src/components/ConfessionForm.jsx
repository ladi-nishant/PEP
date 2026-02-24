import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaUserSecret, FaEye, FaEyeSlash, FaLock } from "react-icons/fa";

const ConfessionForm = ({ onSubmit }) => {
  const [text, setText] = useState("");
  const [secretCode, setSecretCode] = useState("");
  const [showCode, setShowCode] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const maxChars = 300;

  const getStrength = () => {
    if (secretCode.length >= 8) return { label: "Strong", color: "bg-green-500" };
    if (secretCode.length >= 5) return { label: "Medium", color: "bg-yellow-500" };
    if (secretCode.length >= 4) return { label: "Weak", color: "bg-red-500" };
    return null;
  };

  const strength = getStrength();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!text.trim()) {
      alert("Confession cannot be empty");
      return;
    }

    if (secretCode.length < 4) {
      alert("Secret code must be at least 4 characters");
      return;
    }

    try {
      setSubmitting(true);
      await onSubmit({ text, secretCode });

      setText("");
      setSecretCode("");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all border border-gray-100 p-6 mb-8"
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <FaUserSecret className="text-indigo-600 text-xl" />
        <h2 className="text-xl font-bold text-gray-800">
          Post Anonymous Confession
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Confession Text */}
        <div className="relative">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            maxLength={maxChars}
            placeholder=" "
            className="peer w-full p-4 pt-5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none resize-none bg-gray-50 h-32"
          />

          <label className="absolute left-3 top-2 text-gray-400 text-sm transition-all 
            peer-placeholder-shown:top-4 
            peer-placeholder-shown:text-base 
            peer-focus:top-2 peer-focus:text-sm">
            What's your secret?
          </label>

          <div className="text-right text-xs text-gray-400 mt-1">
            {text.length}/{maxChars}
          </div>
        </div>

        {/* Secret Code */}
        <div>
          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-gray-400" />

            <input
              type={showCode ? "text" : "password"}
              value={secretCode}
              onChange={(e) => setSecretCode(e.target.value)}
              placeholder="Secret Code (min 4 chars)"
              className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none bg-gray-50"
            />

            <button
              type="button"
              onClick={() => setShowCode(!showCode)}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
            >
              {showCode ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Strength Bar */}
          {strength && (
            <div className="mt-2">
              <div className="h-1 rounded bg-gray-200">
                <div
                  className={`h-1 rounded ${strength.color}`}
                  style={{
                    width:
                      strength.label === "Strong"
                        ? "100%"
                        : strength.label === "Medium"
                        ? "66%"
                        : "33%",
                  }}
                />
              </div>
              <span className="text-xs text-gray-500">
                Strength: {strength.label}
              </span>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          disabled={submitting}
          type="submit"
          className={`w-full py-3 rounded-lg font-semibold text-white transition-all duration-200
            ${
              submitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-lg"
            }`}
        >
          {submitting ? "Posting..." : "Post Anonymously"}
        </motion.button>

        {/* Info Text */}
        <p className="text-xs text-gray-500 text-center">
          Your identity remains anonymous. Remember your secret code to edit or delete.
        </p>
      </form>
    </motion.div>
  );
};

export default ConfessionForm;
