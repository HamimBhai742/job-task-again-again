import React, { useState, useEffect, useRef } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import MessageCard from "./MessageCard";
import toast from "react-hot-toast";
import Lottie from "lottie-react";
import animationData from "../../JSONFile/ailoding.json";
const HelpSupport = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  const { data: messages = [], refetch } = useQuery({
    enabled: !!user?.email,
    queryKey: [user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/chat?email=${user?.email}`);
      return res.data;
    },
  });
  console.log(messages);
  const sendMessage = async () => {
    setLoading(true);
    if (input.trim() === "") return toast.error("Please enter a message");
    try {
      const res = await axiosPublic.post("/chat", {
        message: input,
        email: user?.email,
      });
      console.log(res);
      setInput("");
      refetch();
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setLoading(false);
    }
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <div className="p-4 bg-teal-600 text-white text-xl font-semibold shadow">
        💬 Chat Page
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto  p-4 space-y-3">
        {messages.map((msg, index) => (
          <MessageCard msg={msg} key={index} />
        ))}
        {loading && <Lottie animationData={animationData} loop={true} />}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-white flex gap-2 shadow">
        <input
          type="text"
          placeholder="Ask me anything.."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
          className="flex-1 border border-gray-300 rounded-lg h-12 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default HelpSupport;
