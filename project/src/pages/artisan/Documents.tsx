import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Loader2, FileText } from "lucide-react";

export default function Documents() {
    const [prompt, setPrompt] = useState("");
    const [loading, setLoading] = useState(false);
    const [generatedDoc, setGeneratedDoc] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleGenerate = async () => {
        if (!prompt.trim()) {
            setError("Please enter a document title.");
            return;
        }

        setLoading(true);
        setError(null);
        setGeneratedDoc(null);

        try {
            const response = await axios.post(
                "http://localhost:8080/api/generate",
                {
                    prompt: `Generate a detailed professional document for: ${prompt}`,
                    mode: "document",
                },
                { timeout: 60000 }
            );

            console.log("✅ Backend response:", response.data);
            const content =
                response.data.output ||
                response.data.result ||
                response.data.message ||
                "No content received from AI model.";

            setGeneratedDoc(content);
        } catch (err: any) {
            console.error("❌ Error generating document:", err);
            if (err.code === "ECONNABORTED") {
                setError("Request timed out. Please try again.");
            } else {
                setError("Failed to generate document. Check your backend connection.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto py-8 space-y-8">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
            >
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    🧾 Smart Document Generator
                </h1>
                <p className="text-gray-600">
                    Type a title, and AI will create a full document for you
                </p>
            </motion.div>

            {/* Input Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-6 rounded-xl shadow-md space-y-4"
            >
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Document Title
                    </label>
                    <input
                        type="text"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="e.g., Patent on an Art Piece"
                        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                    />
                </div>

                {error && <p className="text-red-600 text-sm">{error}</p>}

                <button
                    onClick={handleGenerate}
                    disabled={loading}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition"
                >
                    {loading ? (
                        <>
                            <Loader2 className="animate-spin w-5 h-5" /> Generating...
                        </>
                    ) : (
                        "Generate Document"
                    )}
                </button>
            </motion.div>

            {/* Output Section */}
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-lg p-6 min-h-[200px]"
            >
                <div className="flex items-center gap-3 mb-4">
                    <FileText className="text-green-600 w-6 h-6" />
                    <h2 className="text-2xl font-semibold text-gray-800">
                        Generated Document
                    </h2>
                </div>

                {loading && (
                    <p className="text-gray-500 italic">AI is preparing your document...</p>
                )}

                {!loading && generatedDoc && (
                    <div className="prose max-w-none text-gray-800 leading-relaxed">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {generatedDoc}
                        </ReactMarkdown>
                    </div>
                )}

                {!loading && !generatedDoc && !error && (
                    <p className="text-gray-400 italic">
                        The generated document will appear here once ready.
                    </p>
                )}
            </motion.div>
        </div>
    );
}
