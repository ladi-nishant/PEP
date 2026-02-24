import React from "react";
import {
  FaHeart,
  FaGrinSquint,
  FaThumbsUp,
  FaEdit,
  FaTrash,
  FaUserSecret,
} from "react-icons/fa";
import { motion } from "framer-motion";

const ConfessionCard = ({ confession, onReact, onEdit, onDelete }) => {
  const { _id, text, reactions = {}, createdAt } = confession;

  const timeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);

    const intervals = {
      year: 31536000,
      month: 2592000,
      day: 86400,
      hour: 3600,
      minute: 60,
    };

    for (let key in intervals) {
      const interval = Math.floor(seconds / intervals[key]);
      if (interval >= 1)
        return `${interval} ${key}${interval > 1 ? "s" : ""} ago`;
    }
    return "Just now";
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.25 }}
      className="bg-white rounded-2xl shadow-md hover:shadow-xl border border-gray-100 p-6 mb-6 transition-all duration-300"
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2 text-gray-500 text-sm font-medium">
          <FaUserSecret className="text-indigo-500" />
          Anonymous
        </div>

        <div className="flex gap-3">
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={() => onEdit(confession)}
            className="text-gray-400 hover:text-blue-500 transition"
          >
            <FaEdit />
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={() => onDelete(confession)}
            className="text-gray-400 hover:text-red-500 transition"
          >
            <FaTrash />
          </motion.button>
        </div>
      </div>

      {/* Confession Text */}
      <p className="text-gray-800 text-lg leading-relaxed font-medium whitespace-pre-line">
        {text}
      </p>

      {/* Footer */}
      <div className="flex justify-between items-center mt-5 pt-4 border-t border-gray-100">
        <span className="text-xs text-gray-400 font-semibold">
          {timeAgo(createdAt)}
        </span>

        <div className="flex gap-2">
          <ReactionButton
            icon={<FaThumbsUp />}
            count={reactions.like || 0}
            color="text-blue-500"
            bg="hover:bg-blue-50"
            onClick={() => onReact(_id, "like")}
          />

          <ReactionButton
            icon={<FaHeart />}
            count={reactions.love || 0}
            color="text-pink-500"
            bg="hover:bg-pink-50"
            onClick={() => onReact(_id, "love")}
          />

          <ReactionButton
            icon={<FaGrinSquint />}
            count={reactions.laugh || 0}
            color="text-yellow-500"
            bg="hover:bg-yellow-50"
            onClick={() => onReact(_id, "laugh")}
          />
        </div>
      </div>
    </motion.div>
  );
};

const ReactionButton = ({ icon, count, color, bg, onClick }) => {
  return (
    <motion.button
      whileTap={{ scale: 0.8 }}
      whileHover={{ scale: 1.08 }}
      onClick={onClick}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-gray-500 ${bg} ${color} transition-all duration-200`}
    >
      <span className="text-lg">{icon}</span>
      <span className="text-sm font-semibold">{count}</span>
    </motion.button>
  );
};

export default ConfessionCard;
