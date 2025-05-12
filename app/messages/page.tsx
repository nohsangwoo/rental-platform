"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, X, ChevronRight, Archive, ImageIcon } from "lucide-react"
import ChatInterface from "@/components/chat/chat-interface"
import { Separator } from "@/components/ui/separator"

export default function MessagesPage() {
  const [selectedChat, setSelectedChat] = useState<number | null>(0)
  const [searchTerm, setSearchTerm] = useState("")
  const [showDetails, setShowDetails] = useState(true)

  const chats = [
    {
      id: 0,
      hostName: "최에진",
      hostImage: "/host-profile.png",
      propertyTitle: "[5 mins to Gerong Station] gerong stay",
      propertyLocation: "Gerong Stay",
      propertyImage: "/property-detail-1.jpg",
      lastMessage: "안녕하세요! 무엇을 도와드릴까요?",
      time: "10:30 AM",
      unread: 1,
      hostEmail: "yjchoi450312k@daum.net",
      propertyDetails: {
        price: "₩670,000/월",
        checkIn: "Dec 9, 2026",
        checkOut: "Dec 23, 2026",
        guests: 2,
        bedrooms: 1,
        beds: 2,
        baths: 1,
        amenities: ["에어컨", "세탁기", "냉장고", "인터넷", "전자레인지", "TV"],
      },
    },
    {
      id: 1,
      hostName: "Kim Host",
      hostImage: "/korean-woman-portrait.png",
      propertyTitle: "[Hongdae] 5 minutes to Hongik University Station",
      propertyLocation: "Hongdae, Mapo-gu",
      propertyImage: "/property-detail-2.jpg",
      lastMessage: "네, 입주일에 맞춰 준비해 드리겠습니다.",
      time: "어제",
      unread: 0,
      hostEmail: "kim.host@example.com",
      propertyDetails: {
        price: "₩750,000/월",
        checkIn: "Jan 15, 2027",
        checkOut: "Feb 15, 2027",
        guests: 2,
        bedrooms: 1,
        beds: 1,
        baths: 1,
        amenities: ["에어컨", "세탁기", "냉장고", "인터넷", "전자레인지"],
      },
    },
    {
      id: 2,
      hostName: "Park Manager",
      hostImage: "/korean-man-portrait.png",
      propertyTitle: "[Gangnam] Luxury Studio near Gangnam Station",
      propertyLocation: "Gangnam-gu, Seoul",
      propertyImage: "/property-detail-3.jpg",
      lastMessage: "주변에 편의점과 카페가 도보 3분 거리에 있습니다.",
      time: "3일 전",
      unread: 0,
      hostEmail: "park.manager@example.com",
      propertyDetails: {
        price: "₩950,000/월",
        checkIn: "Mar 1, 2027",
        checkOut: "Apr 1, 2027",
        guests: 1,
        bedrooms: 1,
        beds: 1,
        baths: 1,
        amenities: ["에어컨", "세탁기", "냉장고", "인터넷", "전자레인지", "TV", "헬스장"],
      },
    },
  ]

  const filteredChats = chats.filter(
    (chat) =>
      chat.hostName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chat.propertyTitle.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const selectedChatData = selectedChat !== null ? chats[selectedChat] : null

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">메시지</h1>

      <div className="flex h-[calc(100vh-200px)] border rounded-lg overflow-hidden">
        {/* Chat list sidebar */}
        <div className="w-full md:w-1/4 border-r">
          <div className="p-3 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="대화 검색"
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="overflow-y-auto h-[calc(100%-60px)]">
            {filteredChats.length > 0 ? (
              filteredChats.map((chat) => (
                <div
                  key={chat.id}
                  className={`flex items-start p-4 gap-3 cursor-pointer hover:bg-gray-50 ${
                    selectedChat === chat.id ? "bg-gray-100" : ""
                  }`}
                  onClick={() => setSelectedChat(chat.id)}
                >
                  <div className="relative">
                    <Image
                      src={chat.hostImage || "/placeholder.svg"}
                      alt={chat.hostName}
                      width={50}
                      height={50}
                      className="rounded-full"
                    />
                    {chat.unread > 0 && (
                      <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                        {chat.unread}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium truncate">{chat.hostName}</h3>
                      <span className="text-xs text-gray-500 whitespace-nowrap ml-2">{chat.time}</span>
                    </div>
                    <p className="text-sm text-gray-500 truncate">{chat.propertyTitle}</p>
                    <p className="text-sm truncate">{chat.lastMessage}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-gray-500">검색 결과가 없습니다</div>
            )}
          </div>
        </div>

        {/* Chat interface */}
        <div className="hidden md:block md:w-2/4 bg-gray-50 border-r">
          {selectedChat !== null ? (
            <div className="flex flex-col h-full">
              {/* Chat header */}
              <div className="flex items-center justify-between p-4 border-b bg-white">
                <div className="flex items-center">
                  <Image
                    src={selectedChatData?.hostImage || "/placeholder.svg"}
                    alt={selectedChatData?.hostName || ""}
                    width={40}
                    height={40}
                    className="rounded-full mr-3"
                  />
                  <div>
                    <h3 className="font-medium">{selectedChatData?.hostName}</h3>
                    <p className="text-xs text-gray-500">{selectedChatData?.propertyTitle}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" title="Archive">
                    <Archive className="h-5 w-5 text-gray-500" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowDetails(!showDetails)}
                    title="Toggle details"
                  >
                    {showDetails ? (
                      <X className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-gray-500" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Chat messages */}
              <div className="flex-1 overflow-y-auto p-4">
                <ChatInterface
                  hostName={selectedChatData?.hostName || ""}
                  hostImage={selectedChatData?.hostImage || ""}
                  propertyTitle={selectedChatData?.propertyTitle || ""}
                />
              </div>

              {/* Chat input */}
              <div className="border-t p-3 bg-white">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <ImageIcon className="h-5 w-5 text-gray-500" />
                  </Button>
                  <Input placeholder="메시지를 입력하세요..." className="flex-1" />
                  <Button size="sm">보내기</Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center text-gray-500">
                <div className="mb-4">
                  <MessageIcon className="mx-auto h-16 w-16 text-gray-300" />
                </div>
                <h3 className="text-lg font-medium mb-2">메시지를 선택하세요</h3>
                <p>왼쪽에서 대화를 선택하여 채팅을 시작하세요</p>
              </div>
            </div>
          )}
        </div>

        {/* Property details sidebar */}
        <div className={`hidden ${showDetails ? "md:block" : "md:hidden"} md:w-1/4 bg-white`}>
          {selectedChatData && (
            <div className="h-full overflow-y-auto">
              {/* Property image and title */}
              <div className="relative">
                <div className="aspect-[4/3] relative">
                  <Image
                    src={selectedChatData.propertyImage || "/placeholder.svg"}
                    alt={selectedChatData.propertyTitle}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <h3 className="text-white font-medium">{selectedChatData.propertyTitle}</h3>
                  <p className="text-white/80 text-sm">{selectedChatData.propertyLocation}</p>
                </div>
              </div>

              {/* Property details */}
              <div className="p-4">
                <Link
                  href={`/property/${selectedChatData.id}`}
                  className="flex items-center text-sm text-blue-600 hover:underline mb-4"
                >
                  방 상세 보기 <ChevronRight className="h-4 w-4 ml-1" />
                </Link>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">가격</h4>
                    <p className="text-lg font-bold">{selectedChatData.propertyDetails.price}</p>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">날짜</h4>
                    <div className="flex justify-between text-sm">
                      <div>
                        <p className="text-gray-500">체크인</p>
                        <p>{selectedChatData.propertyDetails.checkIn}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">체크아웃</p>
                        <p>{selectedChatData.propertyDetails.checkOut}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">세부 정보</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-gray-500">게스트</p>
                        <p>{selectedChatData.propertyDetails.guests}명</p>
                      </div>
                      <div>
                        <p className="text-gray-500">침실</p>
                        <p>{selectedChatData.propertyDetails.bedrooms}개</p>
                      </div>
                      <div>
                        <p className="text-gray-500">침대</p>
                        <p>{selectedChatData.propertyDetails.beds}개</p>
                      </div>
                      <div>
                        <p className="text-gray-500">욕실</p>
                        <p>{selectedChatData.propertyDetails.baths}개</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">편의시설</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedChatData.propertyDetails.amenities.map((amenity, index) => (
                        <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <Separator className="my-4" />

              {/* Host profile */}
              <div className="p-4">
                <h3 className="font-medium mb-4">호스트 프로필</h3>
                <div className="flex items-center mb-4">
                  <Image
                    src={selectedChatData.hostImage || "/placeholder.svg"}
                    alt={selectedChatData.hostName}
                    width={60}
                    height={60}
                    className="rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-medium">{selectedChatData.hostName}</h4>
                    <p className="text-sm text-gray-500">{selectedChatData.hostEmail}</p>
                  </div>
                </div>
              </div>

              <Separator className="my-4" />

              {/* Help section */}
              <div className="p-4">
                <h3 className="font-medium mb-4">도움이 필요하신가요?</h3>
                <Button variant="outline" className="w-full">
                  Enkor 고객센터에 문의하기
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Simple message icon component
function MessageIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>
  )
}
