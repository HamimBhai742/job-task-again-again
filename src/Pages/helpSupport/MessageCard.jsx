import React from "react";
import dayjs from "dayjs";
import ReactMarkdown from "react-markdown";
import Lottie from "lottie-react";
import animationData from "../../JSONFile/aibot.json";
import animationDatadata from "../../JSONFile/user.json";
import { motion } from "framer-motion";
import { FaUser, FaRobot, FaCheck, FaCheckDouble } from "react-icons/fa";

const MessageCard = ({ msg, index }) => {
  const normalDate = dayjs(msg?.timeStamp).format("DD-MM-YYYY hh:mm A");
  const isUser = msg.sender === "You";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div className={`flex max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl ${
        isUser ? 'flex-row-reverse' : 'flex-row'
      } items-end space-x-2`}>
        
        {/* Avatar */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          className={`flex-shrink-0 w-10 h-10 rounded-full overflow-hidden shadow-lg ${
            isUser ? 'ml-2' : 'mr-2'
          }`}
        >
          {isUser ? (
            <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
              <FaUser className="text-white text-sm" />
            </div>
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-green-500 to-teal-600 flex items-center justify-center">
              <FaRobot className="text-white text-sm" />
            </div>
          )}
        </motion.div>

        {/* Message Bubble */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className={`relative p-4 rounded-3xl shadow-lg backdrop-blur-xl border ${
            isUser
              ? 'bg-gradient-to-r from-blue-500/80 to-purple-600/80 border-blue-400/30 text-white'
              : 'bg-white/15 border-white/20 text-white'
          }`}
        >
          {/* Message Content */}
          <div className="relative z-10">
            {/* Sender Badge */}
            <div className={`flex items-center space-x-2 mb-2 ${
              isUser ? 'justify-end' : 'justify-start'
            }`}>
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                isUser 
                  ? 'bg-white/20 text-white/90' 
                  : 'bg-gradient-to-r from-green-500/20 to-teal-500/20 text-green-300 border border-green-500/30'
              }`}>
                {isUser ? 'You' : 'AI Assistant'}
              </span>
            </div>

            {/* Message Text */}
            <div className={`prose prose-sm max-w-none ${
              isUser ? 'prose-invert' : 'prose-invert'
            }`}>
              <ReactMarkdown
                components={{
                  p: ({ children }) => <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>,
                  strong: ({ children }) => <strong className="font-semibold text-yellow-300">{children}</strong>,
                  em: ({ children }) => <em className="italic text-blue-200">{children}</em>,
                  code: ({ children }) => (
                    <code className="bg-black/20 text-yellow-300 px-1 py-0.5 rounded text-sm font-mono">
                      {children}
                    </code>
                  ),
                  ul: ({ children }) => <ul className="list-disc list-inside space-y-1">{children}</ul>,
                  ol: ({ children }) => <ol className="list-decimal list-inside space-y-1">{children}</ol>,
                  li: ({ children }) => <li className="text-sm">{children}</li>
                }}
              >
                {msg.message}
              </ReactMarkdown>
            </div>

            {/* Timestamp and Status */}
            <div className={`flex items-center justify-between mt-3 pt-2 border-t ${
              isUser ? 'border-white/20' : 'border-white/10'
            }`}>
              <span className={`text-xs ${
                isUser ? 'text-white/70' : 'text-white/60'
              }`}>
                {normalDate}
              </span>
              
              {isUser && (
                <div className="flex items-center space-x-1">
                  <FaCheckDouble className="text-blue-200 text-xs" />
                  <span className="text-xs text-blue-200">Delivered</span>
                </div>
              )}
            </div>
          </div>

          {/* Message Tail */}
          <div className={`absolute bottom-0 w-4 h-4 transform rotate-45 ${
            isUser
              ? '-right-2 bg-gradient-to-r from-blue-500/80 to-purple-600/80'
              : '-left-2 bg-white/15'
          }`} />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MessageCard;
