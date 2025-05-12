"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"

interface Message {
  id: string
  content: string
  sender: "user" | "host"
  timestamp: Date
}

interface ChatInterfaceProps {
  hostName: string
  hostImage: string
  propertyTitle: string
}

export default function ChatInterface({ hostName, hostImage, propertyTitle }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: `안녕하세요! ${propertyTitle}에 관심을 가져주셔서 감사합니다. 무엇을 도와드릴까요?`,
      sender: "host",
      timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    },
    {
      id: "2",
      content: "안녕하세요. 문의가 있습니다. 문이 있습니까?",
      sender: "user",
      timestamp: new Date(Date.now() - 1000 * 60 * 4), // 4 minutes ago
    },
    {
      id: "3",
      content: "네, 물론이죠! 모든 방에는 문이 있습니다. 더 필요한 정보가 있으신가요?",
      sender: "host",
      timestamp: new Date(Date.now() - 1000 * 60 * 3), // 3 minutes ago
    },
    {
      id: "4",
      content: "I WANT TO RESERVE THIS ROOM FOR 1 MONTH",
      sender: "user",
      timestamp: new Date(Date.now() - 1000 * 60 * 2), // 2 minutes ago
    },
    {
      id: "5",
      content: "네, 1개월 예약 가능합니다. 원하시는 날짜를 알려주시면 확인해 드리겠습니다.",
      sender: "host",
      timestamp: new Date(Date.now() - 1000 * 60 * 1), // 1 minute ago
    },
  ])
  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: "user",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setNewMessage("")

    // Simulate host response after a delay
    setTimeout(() => {
      const hostResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: getRandomResponse(),
        sender: "host",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, hostResponse])
    }, 1000)
  }

  const getRandomResponse = () => {
    const responses = [
      "네, 물론이죠! 더 필요한 정보가 있으신가요?",
      "좋은 질문이네요. 확인 후 알려드리겠습니다.",
      "입주 날짜에 맞춰 준비해 드리겠습니다.",
      "추가 비용은 없습니다. 모든 것이 포함되어 있어요.",
      "주변에 편의점과 카페가 도보 3분 거리에 있습니다.",
    ]
    return responses[Math.floor(Math.random() * responses.length)]
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
          {message.sender === "host" && (
            <Image
              src={hostImage || "/placeholder.svg?height=36&width=36&query=person"}
              alt={hostName}
              width={36}
              height={36}
              className="rounded-full mr-2 self-end"
            />
          )}
          <div
            className={`p-3 rounded-lg max-w-[80%] ${
              message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-gray-100 text-gray-800"
            }`}
          >
            <p className="text-sm">{message.content}</p>
            <p className="text-xs opacity-70 mt-1">{formatTime(message.timestamp)}</p>
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  )
}
