"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, Filter, MessageSquare } from "lucide-react"

export default function MessagesPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const conversations = [
    {
      id: 1,
      guest: {
        name: "홍길동",
        image: "/korean-man-portrait.png",
      },
      property: "[5 mins to Gerong Station] gerong stay",
      lastMessage: "안녕하세요! 문의가 있습니다. 문이 있습니까?",
      time: "오늘 14:23",
      unread: 1,
    },
    {
      id: 2,
      guest: {
        name: "김철수",
        image: "/korean-woman-portrait.png",
      },
      property: "[Seoul station] 7 minutes walk from Seoul Station",
      lastMessage: "네, 입주일에 맞춰 준비해 드리겠습니다.",
      time: "어제",
      unread: 0,
    },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">메시지</h1>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="게스트 이름, 매물명으로 검색"
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            필터
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {conversations.length > 0 ? (
          conversations.map((conversation) => (
            <Card key={conversation.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full overflow-hidden relative bg-gray-100">
                      <Image
                        src={conversation.guest.image || "/placeholder.svg"}
                        alt={conversation.guest.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    {conversation.unread > 0 && (
                      <div className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                        {conversation.unread}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium">{conversation.guest.name}</h3>
                      <span className="text-xs text-gray-500 whitespace-nowrap ml-2">{conversation.time}</span>
                    </div>
                    <p className="text-sm text-gray-500">{conversation.property}</p>
                    <p className="text-sm truncate">{conversation.lastMessage}</p>
                  </div>
                  <Button variant="outline" size="sm" className="ml-4 whitespace-nowrap">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    답장하기
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="p-8 text-center">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                  <MessageSquare className="h-6 w-6 text-gray-400" />
                </div>
              </div>
              <h3 className="text-lg font-medium mb-2">메시지가 없습니다.</h3>
              <p className="text-gray-500 text-sm mb-4">아직 받은 메시지가 없습니다.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
