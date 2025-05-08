import { useState } from 'react'
import { ArrowUpCircleIcon } from '@heroicons/react/24/outline'

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const prompt = input.trim()
    if (!prompt) return

    // Add user message
    setMessages(prev => [...prev, { text: prompt, isBot: false }])
    setLoading(true)
    setInput('')

    try {
      const API_KEY = import.meta.env.GEMINI_API_KEY
      console.log(API_KEY)
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyBSR1Bl3C3I-dt0w39lZgp1IEaqb1B5f8s`
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
      })
      const data = await res.json()
      const response = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response from Gemini.'


      // Add bot response
      setMessages(prev => [...prev, { text: response, isBot: true }])
    } catch (err) {
      console.error('Gemini API error:', err)
      setMessages(prev => [...prev, { text: 'Oops, something went wrong.', isBot: true }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden flex flex-col">
          <div className="px-4 py-3 bg-blue-600 dark:bg-blue-700 text-white font-semibold">
            How can we help?
          </div>
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-[75%] px-3 py-2 rounded-lg ${msg.isBot
                  ? 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                  : 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="text-center text-sm text-gray-500">AI is thinking...</div>
            )}
          </div>
          <form onSubmit={handleSubmit} className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 flex items-center space-x-2 bg-white dark:bg-gray-800">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question..."
              className="flex-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            />
            <button type="submit" disabled={loading} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
              <ArrowUpCircleIcon className="h-8 w-8 text-blue-600 dark:text-blue-300" />
            </button>
          </form>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full shadow-lg bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-800 flex items-center justify-center text-white"
      >
        <span className="text-2xl">?</span>
      </button>
    </div>
  )
}
