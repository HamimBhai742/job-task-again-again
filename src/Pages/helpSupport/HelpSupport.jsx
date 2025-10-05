import React, { useState, useEffect, useRef } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import MessageCard from "./MessageCard";
import toast from "react-hot-toast";
import Lottie from "lottie-react";
import animationData from "../../JSONFile/ailoding.json";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaHeadset, 
  FaPaperPlane, 
  FaRobot, 
  FaUser,
  FaCircle,
  FaComments,
  FaLightbulb
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";

const HelpSupport = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  
  const { data: messages = [], refetch } = useQuery({
    enabled: !!user?.email,
    queryKey: [user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/chat?email=${user?.email}`);
      return res.data;
    },
  });

  const sendMessage = async () => {
    if (input.trim() === "") return toast.error("Please enter a message");
    
    setLoading(true);
    setIsTyping(true);
    
    try {
      const res = await axiosPublic.post("/chat", {
        message: input,
        email: user?.email,
      });
      setInput("");
      refetch();
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
      setTimeout(() => setIsTyping(false), 1000);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const quickActions = [
    { icon: FaLightbulb, text: "How to place an order?", color: "from-yellow-500 to-orange-500" },
    { icon: FaComments, text: "Track my order", color: "from-blue-500 to-purple-500" },
    { icon: FaHeadset, text: "Return policy", color: "from-green-500 to-teal-500" }
  ];

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0]
          }}
          transition={{ 
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"
        />
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 bg-white/15 backdrop-blur-xl border-b border-white/20 p-6 shadow-2xl"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <FaHeadset className="text-2xl text-white" />
              </div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute -top-1 -right-1"
              >
                <HiSparkles className="text-yellow-400 text-lg" />
              </motion.div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                Help & Support
              </h1>
              <div className="flex items-center space-x-2 mt-1">
                <FaCircle className="text-green-400 text-xs animate-pulse" />
                <span className="text-white/80 text-sm">AI Assistant Online</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-2 border border-white/20">
            <FaRobot className="text-blue-400" />
            <span className="text-white/80 text-sm font-medium">Smart Chat</span>
          </div>
        </div>
      </motion.div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 relative z-10">
        {messages.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center justify-center h-full text-center"
          >
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl max-w-md">
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="mb-6"
              >
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
                  <FaComments className="text-3xl text-white" />
                </div>
              </motion.div>
              
              <h3 className="text-2xl font-bold text-white mb-4">
                Welcome to Support!
              </h3>
              <p className="text-white/70 mb-6">
                I'm here to help you with any questions or issues. Start a conversation below!
              </p>
              
              <div className="space-y-3">
                <p className="text-white/60 text-sm font-medium">Quick Actions:</p>
                {quickActions.map((action, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setInput(action.text)}
                    className={`w-full flex items-center space-x-3 p-3 bg-gradient-to-r ${action.color} bg-opacity-20 border border-white/20 rounded-xl text-white hover:bg-opacity-30 transition-all duration-300`}
                  >
                    <action.icon className="text-lg" />
                    <span className="text-sm font-medium">{action.text}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <AnimatePresence>
            {messages.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
              >
                <MessageCard msg={msg} index={index} />
              </motion.div>
            ))}
          </AnimatePresence>
        )}
        
        {/* Typing Indicator */}
        <AnimatePresence>
          {(loading || isTyping) && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex justify-start"
            >
              <div className="bg-white/15 backdrop-blur-xl border border-white/20 rounded-3xl p-4 shadow-lg max-w-xs">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <FaRobot className="text-white text-sm" />
                  </div>
                  <div className="flex space-x-1">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                      className="w-2 h-2 bg-blue-400 rounded-full"
                    />
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                      className="w-2 h-2 bg-purple-400 rounded-full"
                    />
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                      className="w-2 h-2 bg-pink-400 rounded-full"
                    />
                  </div>
                  <span className="text-white/70 text-sm">AI is thinking...</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="relative z-10 bg-white/15 backdrop-blur-xl border-t border-white/20 p-6 shadow-2xl"
      >
        <div className="flex items-end space-x-4 max-w-4xl mx-auto">
          <div className="flex-1 relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading}
              placeholder="Ask me anything... (Press Enter to send)"
              rows={1}
              className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all duration-300 backdrop-blur-sm resize-none"
              style={{ minHeight: '56px', maxHeight: '120px' }}
            />
            
            {/* Character count */}
            <div className="absolute bottom-2 right-4 text-white/40 text-xs">
              {input.length}/500
            </div>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            className={`p-4 rounded-2xl shadow-lg transition-all duration-300 flex items-center justify-center ${
              loading || !input.trim()
                ? 'bg-gray-500/50 text-gray-300 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-xl'
            }`}
          >
            {loading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <FaRobot className="text-xl" />
              </motion.div>
            ) : (
              <FaPaperPlane className="text-xl" />
            )}
          </motion.button>
        </div>
        
        {/* Quick Tips */}
        <div className="mt-4 text-center">
          <p className="text-white/50 text-xs">
            💡 Tip: You can ask about orders, returns, shipping, or any product questions
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default HelpSupport;
