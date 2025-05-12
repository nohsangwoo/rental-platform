"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { BarChart, Building, Home, MessageSquare, Star, Users } from "lucide-react"

export default function HostDashboard() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">호스트 대시보드</h1>
          <p className="text-gray-500">매물 관리 및 예약 현황을 확인하세요.</p>
        </div>
        <Button>
          <Home className="mr-2 h-4 w-4" />새 매물 등록하기
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">총 매물</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">5</div>
              <Building className="h-5 w-5 text-gray-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">이번 달 예약</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">12</div>
              <Users className="h-5 w-5 text-gray-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">이번 달 수익</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">₩3,450,000</div>
              <BarChart className="h-5 w-5 text-gray-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">평균 평점</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">4.8</div>
              <Star className="h-5 w-5 text-yellow-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Tabs defaultValue="properties">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="properties">내 매물</TabsTrigger>
              <TabsTrigger value="reservations">예약 관리</TabsTrigger>
              <TabsTrigger value="messages">메시지</TabsTrigger>
            </TabsList>

            <TabsContent value="properties" className="mt-6">
              <div className="grid gap-4">
                {hostProperties.map((property) => (
                  <div key={property.id} className="flex border rounded-lg overflow-hidden">
                    <div className="w-1/4 relative">
                      <Image
                        src={property.image || "/placeholder.svg"}
                        alt={property.title}
                        width={200}
                        height={150}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="w-3/4 p-4 flex flex-col">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{property.title}</h3>
                          <p className="text-sm text-gray-500">{property.location}</p>
                        </div>
                        <div className="flex items-center">
                          <span
                            className={`px-2 py-1 text-xs rounded ${
                              property.status === "active"
                                ? "bg-green-100 text-green-800"
                                : property.status === "pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {property.status === "active"
                              ? "공개"
                              : property.status === "pending"
                                ? "승인 대기중"
                                : "비공개"}
                          </span>
                        </div>
                      </div>
                      <div className="mt-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span>{property.rating}</span>
                          <span className="text-gray-500">({property.reviews} 후기)</span>
                        </div>
                      </div>
                      <div className="mt-auto flex justify-between items-center">
                        <div className="font-bold">₩{property.price.toLocaleString()}/월</div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            수정
                          </Button>
                          <Button variant="outline" size="sm">
                            관리
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="reservations" className="mt-6">
              <div className="grid gap-4">
                {reservations.map((reservation) => (
                  <div key={reservation.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{reservation.propertyTitle}</h3>
                        <p className="text-sm text-gray-500">
                          {reservation.checkIn} ~ {reservation.checkOut}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <span
                          className={`px-2 py-1 text-xs rounded ${
                            reservation.status === "confirmed"
                              ? "bg-green-100 text-green-800"
                              : reservation.status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                          }`}
                        >
                          {reservation.status === "confirmed"
                            ? "확정"
                            : reservation.status === "pending"
                              ? "대기중"
                              : "취소됨"}
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center gap-3">
                      <Image
                        src={reservation.guestImage || "/placeholder.svg"}
                        alt={reservation.guestName}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div>
                        <p className="font-medium">{reservation.guestName}</p>
                        <p className="text-sm text-gray-500">게스트 {reservation.guests}명</p>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                      <div className="font-bold">₩{reservation.amount.toLocaleString()}</div>
                      <div className="flex gap-2">
                        {reservation.status === "pending" && (
                          <>
                            <Button variant="default" size="sm">
                              승인
                            </Button>
                            <Button variant="outline" size="sm">
                              거절
                            </Button>
                          </>
                        )}
                        {reservation.status === "confirmed" && (
                          <Button variant="outline" size="sm">
                            상세 보기
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="messages" className="mt-6">
              <div className="grid gap-4">
                {messages.map((message) => (
                  <div key={message.id} className="border rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      <Image
                        src={message.senderImage || "/placeholder.svg"}
                        alt={message.senderName}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div>
                        <p className="font-medium">{message.senderName}</p>
                        <p className="text-sm text-gray-500">{message.propertyTitle}</p>
                      </div>
                      <div className="ml-auto text-sm text-gray-500">{message.time}</div>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm line-clamp-2">{message.content}</p>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <Button variant="outline" size="sm">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        답장하기
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>예약 일정</CardTitle>
              <CardDescription>매물별 예약 현황을 확인하세요.</CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />

              <div className="mt-6 space-y-4">
                <h3 className="font-medium">오늘의 일정</h3>

                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <p className="font-medium">체크인: 홍길동님</p>
                  <p className="text-sm text-gray-500">해에하우스 원룸 #103</p>
                  <p className="text-sm text-gray-500">15:00</p>
                </div>

                <div className="border-l-4 border-red-500 pl-4 py-2">
                  <p className="font-medium">체크아웃: 김철수님</p>
                  <p className="text-sm text-gray-500">해에하우스 원룸 #201</p>
                  <p className="text-sm text-gray-500">11:00</p>
                </div>

                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <p className="font-medium">청소 일정</p>
                  <p className="text-sm text-gray-500">해에하우스 원룸 #201</p>
                  <p className="text-sm text-gray-500">13:00 - 15:00</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

const hostProperties = [
  {
    id: 1,
    title: "해에하우스-원룸 기준 룸쉐어 중&여-미공개",
    location: "서울시 마포구 홍대입구역 5분 거리",
    price: 670000,
    rating: 4.5,
    reviews: 12,
    status: "active",
    image: "/modern-korean-bedroom.png",
  },
  {
    id: 2,
    title: "홍대 프리미엄 스튜디오",
    location: "서울시 마포구 홍대입구역 3분 거리",
    price: 750000,
    rating: 4.8,
    reviews: 8,
    status: "active",
    image: "/placeholder.svg?height=200&width=300&query=premium studio apartment seoul",
  },
  {
    id: 3,
    title: "신촌역 도보 5분 원룸",
    location: "서울시 서대문구 신촌역 5분 거리",
    price: 550000,
    rating: 4.2,
    reviews: 5,
    status: "pending",
    image: "/placeholder.svg?height=200&width=300&query=sinchon seoul apartment",
  },
]

const reservations = [
  {
    id: 1,
    propertyTitle: "해에하우스-원룸 기준 룸쉐어 중&여-미공개",
    checkIn: "2023-12-15",
    checkOut: "2024-01-15",
    guestName: "홍길동",
    guestImage: "/placeholder.svg?height=100&width=100&query=asian person portrait",
    guests: 1,
    amount: 670000,
    status: "confirmed",
  },
  {
    id: 2,
    propertyTitle: "홍대 프리미엄 스튜디오",
    checkIn: "2023-12-20",
    checkOut: "2024-02-20",
    guestName: "김철수",
    guestImage: "/placeholder.svg?height=100&width=100&query=young korean man portrait",
    guests: 2,
    amount: 1500000,
    status: "pending",
  },
  {
    id: 3,
    propertyTitle: "신촌역 도보 5분 원룸",
    checkIn: "2023-12-10",
    checkOut: "2023-12-25",
    guestName: "이영희",
    guestImage: "/placeholder.svg?height=100&width=100&query=korean woman portrait",
    guests: 1,
    amount: 275000,
    status: "cancelled",
  },
]

const messages = [
  {
    id: 1,
    senderName: "홍길동",
    senderImage: "/placeholder.svg?height=100&width=100&query=asian person portrait",
    propertyTitle: "해에하우스-원룸 기준 룸쉐어 중&여-미공개",
    time: "오늘 14:23",
    content: "안녕하세요, 체크인 시간을 조금 늦출 수 있을까요? 비행기가 지연되어서 17시 정도에 도착할 것 같습니다.",
  },
  {
    id: 2,
    senderName: "김철수",
    senderImage: "/placeholder.svg?height=100&width=100&query=young korean man portrait",
    propertyTitle: "홍대 프리미엄 스튜디오",
    time: "어제 18:45",
    content: "주변에 추천해주실 만한 식당이 있을까요? 한국 전통 음식을 먹어보고 싶습니다.",
  },
  {
    id: 3,
    senderName: "박지민",
    senderImage: "/placeholder.svg?height=100&width=100&query=korean person portrait",
    propertyTitle: "신촌역 도보 5분 원룸",
    time: "2023-12-05",
    content: "숙소에 드라이기가 있나요? 그리고 수건은 몇 개 제공되나요?",
  },
]
