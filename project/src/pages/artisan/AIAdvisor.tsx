import { useState, useRef, useEffect } from 'react';
import { Send, Mic, Paperclip, Bot, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'ai';
    timestamp: Date;
}

const starterPrompts = [
    { text: 'How can I price my products better?', emoji: '💰' },
    { text: 'What documents do I need to start selling?', emoji: '📄' },
    { text: 'How to find buyers for my craft?', emoji: '🔍' },
    { text: 'Tips to improve product quality', emoji: '⭐' },
    { text: 'How to market on social media?', emoji: '📱' },
];

export default function AIAdvisor() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    // ✅ Send message to backend
    const handleSend = async () => {
        if (!inputValue.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            text: inputValue,
            sender: 'user',
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInputValue('');
        setIsTyping(true);

        try {
            const response = await axios.post(
                'http://localhost:8080/api/generate',
                {
                    prompt: inputValue,
                    mode: 'advisor',
                },
                {
                    headers: { 'Content-Type': 'application/json' },
                }
            );

            const aiMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: response.data.output || 'No response received from AI.',
                sender: 'ai',
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, aiMessage]);
        } catch (error: any) {
            console.error('Error calling backend:', error);
            const errorMessage: Message = {
                id: (Date.now() + 2).toString(),
                text:
                    '⚠️ Sorry, I could not connect to the AI service. Please check your backend connection.',
                sender: 'ai',
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleStarterPrompt = (prompt: string) => {
        setInputValue(prompt);
        setTimeout(() => handleSend(), 100);
    };

    return (
        <div className="max-w-6xl mx-auto">
            <div className="mb-6">
                <h1 className="text-3xl font-heading font-bold text-text mb-2">
                    AI Business Advisor
                </h1>
                <p className="text-gray-600">
                    Your 24/7 business companion - Ask me anything about your craft
                    business!
                </p>
            </div>

            <div
                className="bg-white rounded-xl shadow-lg flex flex-col"
                style={{ height: 'calc(100vh - 250px)' }}
            >
                {/* Chat Area */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {messages.length === 0 ? (
                        <div className="h-full flex items-center justify-center">
                            <div className="text-center space-y-6">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="w-24 h-24 mx-auto bg-primary-green rounded-full flex items-center justify-center"
                                >
                                    <Bot className="w-12 h-12 text-white" />
                                </motion.div>
                                <div>
                                    <h3 className="text-xl font-semibold text-text mb-2">
                                        Start a Conversation
                                    </h3>
                                    <p className="text-gray-600 mb-6">
                                        Click on a prompt below or type your question
                                    </p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl">
                                    {starterPrompts.map((prompt, index) => (
                                        <motion.button
                                            key={index}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            onClick={() => handleStarterPrompt(prompt.text)}
                                            className="p-4 bg-gray-50 rounded-lg hover:bg-primary-green hover:text-white transition-all text-left border-2 border-transparent hover:border-primary-green"
                                        >
                                            <span className="text-2xl mb-2 block">{prompt.emoji}</span>
                                            <p className="font-medium">{prompt.text}</p>
                                        </motion.button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <>
                            <AnimatePresence>
                                {messages.map((message) => (
                                    <motion.div
                                        key={message.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={`flex gap-3 ${
                                            message.sender === 'user'
                                                ? 'justify-end'
                                                : 'justify-start'
                                        }`}
                                    >
                                        {message.sender === 'ai' && (
                                            <div className="w-10 h-10 rounded-full bg-primary-green flex items-center justify-center flex-shrink-0">
                                                <Bot className="w-6 h-6 text-white" />
                                            </div>
                                        )}
                                        <div
                                            className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                                                message.sender === 'user'
                                                    ? 'bg-primary-green text-white'
                                                    : 'bg-gray-100 text-text'
                                            }`}
                                        >
                                            {/* ✅ ReactMarkdown FIX */}
                                            {message.sender === 'ai' ? (
                                                <ReactMarkdown
                                                    remarkPlugins={[remarkGfm]}
                                                    components={{
                                                        p: ({ node, ...props }) => (
                                                            <p className="mb-2" {...props} />
                                                        ),
                                                        strong: ({ node, ...props }) => (
                                                            <strong className="font-semibold" {...props} />
                                                        ),
                                                    }}
                                                >
                                                    {message.text}
                                                </ReactMarkdown>
                                            ) : (
                                                <p className="whitespace-pre-wrap">{message.text}</p>
                                            )}
                                            <p
                                                className={`text-xs mt-1 ${
                                                    message.sender === 'user'
                                                        ? 'text-white/70'
                                                        : 'text-gray-500'
                                                }`}
                                            >
                                                {message.timestamp.toLocaleTimeString()}
                                            </p>
                                        </div>
                                        {message.sender === 'user' && (
                                            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                                                <User className="w-6 h-6 text-gray-600" />
                                            </div>
                                        )}
                                    </motion.div>
                                ))}
                            </AnimatePresence>

                            {isTyping && (
                                <div className="flex gap-3">
                                    <div className="w-10 h-10 rounded-full bg-primary-green flex items-center justify-center">
                                        <Bot className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="bg-gray-100 rounded-2xl px-4 py-3">
                                        <div className="flex gap-1">
                                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                                            <span
                                                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                                style={{ animationDelay: '150ms' }}
                                            ></span>
                                            <span
                                                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                                style={{ animationDelay: '300ms' }}
                                            ></span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="border-t p-4 bg-gray-50">
                    <div className="flex gap-2">
                        <button className="p-3 bg-white rounded-lg hover:bg-gray-100 transition-colors">
                            <Paperclip className="w-5 h-5 text-gray-600" />
                        </button>
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Ask me anything about your business..."
                            className="flex-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green"
                        />
                        <button
                            onClick={handleSend}
                            className="p-3 bg-primary-green text-white rounded-lg hover:bg-primary-green-light transition-colors"
                        >
                            <Send className="w-5 h-5" />
                        </button>
                        <button className="p-3 bg-white rounded-lg hover:bg-gray-100 transition-colors">
                            <Mic className="w-5 h-5 text-gray-600" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Sidebar */}
            <div className="hidden lg:block fixed right-8 top-24 w-64 bg-white rounded-xl shadow-lg p-4">
                <h3 className="font-semibold text-text mb-3">Chat History</h3>
                <p className="text-sm text-gray-500">
                    Previous conversations will appear here
                </p>
            </div>
        </div>
    );
}
