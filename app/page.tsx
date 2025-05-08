"use client";
import { FloatingDock } from "@/components/ui/floating-dock";
import { useState } from "react";
import { FaInstagram } from "react-icons/fa6";
import { IoLogoGithub } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { FaLinkedin } from "react-icons/fa6";
import toast from "react-hot-toast";

export default function Home() {
  const [url, setUrl] = useState("");
  const [method, setMethod] = useState("GET");
  const [body, setBody] = useState("");
  const [response, setResponse] = useState("");

  const sendRequest = async () => {
    try {
      toast("Request sent successfully", {
        icon: "✅",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: method !== "GET" ? body : undefined,
      });

      const text = await res.text();
      setResponse(text);
      
    } catch (err) {
      if (err instanceof Error)
      {
        setResponse("Error: " + err.message);
      }
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(response).then(
      () =>
        toast("Copied to clipboard!", {
          icon: "✅",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        }),
      (err) => alert("Failed to copy: " + err)
    );
  };

  return (
    <main className="min-h-screen text-black bg-gray-100 px-4 py-10 font-mono">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8 cursor-default">
          ⚡ API Tester
        </h1>

        {/* URL + Method + Send */}
        <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Enter API endpoint URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1 w-full border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="border border-gray-300 rounded-lg cursor-pointer px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option>GET</option>
            <option>POST</option>
            <option>PUT</option>
            <option>DELETE</option>
          </select>
          <button
            onClick={sendRequest}
            className="bg-blue-600 hover:bg-blue-700 cursor-pointer hover:shadow-md text-white font-semibold px-6 py-2 rounded-lg transition duration-200"
          >
            Send
          </button>
        </div>

        {/* Request Body */}
        {method !== "GET" && (
          <div className="mb-6">
            <label className="block text-gray-600 cursor-default mb-2">
              Request Body (JSON)
            </label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder='{"key":"value"}'
              rows={6}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-y"
            />
          </div>
        )}

        {/* Response */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-gray-600 font-medium">Response</h2>
            <button
              onClick={copyToClipboard}
              className="text-sm bg-gray-200 cursor-pointer border hover:shadow-md text-black border-gray-300 hover:bg-gray-300 px-3 py-1 rounded-md transition"
            >
              Copy
            </button>
          </div>
          <pre className="w-full bg-gray-100 border border-gray-300 rounded-lg p-4 max-h-80 overflow-y-auto text-sm whitespace-pre-wrap">
            {response || "// Response will appear here"}
          </pre>
        </div>
      </div>
      <div className="fixed bottom-4 left-[42%]">
        <FloatingDock
          items={[
            { title: "Linkedin", icon: <FaLinkedin className="text-white"/>, href: "https://www.linkedin.com/in/anubhav-ghosh11/" },
            { title: "Email", icon: <MdEmail className="text-white"/>, href: "mailto:iamanubhav11@gmail.com" },
            { title: "Instagram", icon: <FaInstagram className="text-white"/>, href: "https://instagram.com/guywhocodess" },
            { title: "Github", icon: <IoLogoGithub className="text-white"/>, href: "https://github.com/Anubhav-Ghosh1" },
          ]}
        />
      </div>
    </main>
  );
}
