"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import {
  BarChart,
  Building,
  CheckCircle,
  CreditCard,
  Home,
  MessageSquare,
  Search,
  Settings,
  Users,
  XCircle,
} from "lucide-react"

export default function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">관리자 대시보드</h1>
          <p className="text-gray-500">플랫폼 전체 관리 및 통계를 확인하세요.</p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="회원, 매물, 예약 검색..."
              className="pl-8 w-[250px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            설정
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">총 회원수</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">1,245</div>
              <Users className="h-5 w-5 text-gray-400" />
            </div>
            <p className="text-xs text-green-500 mt-1">+12% 지난 달 대비</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">총 매물수</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">328</div>
              <Building className="h-5 w-5 text-gray-400" />
            </div>
            <p className="text-xs text-green-500 mt-1">+8% 지난 달 대비</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">이번 달 예약</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">156</div>
              <Home className="h-5 w-5 text-gray-400" />
            </div>
            <p className="text-xs text-green-500 mt-1">+15% 지난 달 대비</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">이번 달 매출</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">₩24,560,000</div>
              <CreditCard className="h-5 w-5 text-gray-400" />
            </div>
            <p className="text-xs text-green-500 mt-1">+5% 지난 달 대비</p>
          </CardContent>
        </Card>
      </div>

      <div className="mb-8">
        <Card>
          <CardHeader>
            <CardTitle>월별 매출 및 예약 통계</CardTitle>
            <CardDescription>최근 6개월 통계 데이터</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] bg-gray-100 rounded-lg flex items-center justify-center">
              <BarChart className="h-8 w-8 text-gray-400" />
              <span className="ml-2 text-gray-500">차트 데이터 영역</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Tabs defaultValue="users">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="users">회원 관리</TabsTrigger>
              <TabsTrigger value="properties">매물 관리</TabsTrigger>
              <TabsTrigger value="reservations">예약/결제 관리</TabsTrigger>
              <TabsTrigger value="reports">신고/문의 관리</TabsTrigger>
            </TabsList>

            <TabsContent value="users" className="mt-6">
              <div className="grid gap-4">
                {users.map((user) => (
                  <div key={user.id} className="flex border rounded-lg overflow-hidden">
                    <div className="p-4 flex flex-col w-full">
                      <div className="flex items-center">
                        <Image
                          src={user.image || "/placeholder.svg"}
                          alt={user.name}
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                        <div className="ml-3">
                          <h3 className="font-medium">{user.name}</h3>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                        <div className="ml-auto flex items-center">
                          <span
                            className={`px-2 py-1 text-xs rounded ${
                              user.type === "host" ? "bg-purple-100 text-purple-800" : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {user.type === "host" ? "호스트" : "사용자"}
                          </span>
                          <span
                            className={`ml-2 px-2 py-1 text-xs rounded ${
                              user.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                            }`}
                          >
                            {user.status === "active" ? "활성" : "비활성"}
                          </span>
                        </div>
                      </div>
                      <div className="mt-3 flex justify-between items-center">
                        <div className="text-sm text-gray-500">
                          가입일: {user.joinDate} | 마지막 로그인: {user.lastLogin}
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            상세 정보
                          </Button>
                          <Button variant="outline" size="sm">
                            계정 관리
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="properties" className="mt-6">
              <div className="grid gap-4">
                {adminProperties.map((property) => (
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
                          <p className="text-sm text-gray-500">호스트: {property.host}</p>
                        </div>
                        <div className="flex items-center">
                          <span
                            className={`px-2 py-1 text-xs rounded ${
                              property.status === "active"
                                ? "bg-green-100 text-green-800"
                                : property.status === "pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                            }`}
                          >
                            {property.status === "active"
                              ? "승인됨"
                              : property.status === "pending"
                                ? "승인 대기중"
                                : "거부됨"}
                          </span>
                        </div>
                      </div>
                      <div className="mt-auto flex justify-between items-center">
                        <div className="font-bold">₩{property.price.toLocaleString()}/월</div>
                        <div className="flex gap-2">
                          {property.status === "pending" && (
                            <>
                              <Button variant="default" size="sm">
                                승인
                              </Button>
                              <Button variant="outline" size="sm">
                                거부
                              </Button>
                            </>
                          )}
                          <Button variant="outline" size="sm">
                            상세 보기
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
                {adminReservations.map((reservation) => (
                  <div key={reservation.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{reservation.propertyTitle}</h3>
                        <p className="text-sm text-gray-500">
                          {reservation.checkIn} ~ {reservation.checkOut}
                        </p>
                        <p className="text-sm text-gray-500">
                          호스트: {reservation.host} | 게스트: {reservation.guest}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <span
                          className={`px-2 py-1 text-xs rounded ${
                            reservation.status === "confirmed"
                              ? "bg-green-100 text-green-800"
                              : reservation.status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : reservation.status === "cancelled"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {reservation.status === "confirmed"
                            ? "확정"
                            : reservation.status === "pending"
                              ? "대기중"
                              : reservation.status === "cancelled"
                                ? "취소됨"
                                : "환불 처리중"}
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                      <div>
                        <div className="font-bold">₩{reservation.amount.toLocaleString()}</div>
                        <p className="text-sm text-gray-500">
                          결제 상태: {reservation.paymentStatus} | 결제 방법: {reservation.paymentMethod}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          상세 보기
                        </Button>
                        {reservation.status === "refund" && (
                          <Button variant="default" size="sm">
                            환불 처리
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="reports" className="mt-6">
              <div className="grid gap-4">
                {reports.map((report) => (
                  <div key={report.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{report.title}</h3>
                        <p className="text-sm text-gray-500">
                          신고자: {report.reporter} | 대상: {report.target}
                        </p>
                        <p className="text-sm text-gray-500">신고일: {report.date}</p>
                      </div>
                      <div className="flex items-center">
                        <span
                          className={`px-2 py-1 text-xs rounded ${
                            report.status === "new"
                              ? "bg-red-100 text-red-800"
                              : report.status === "investigating"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800"
                          }`}
                        >
                          {report.status === "new" ? "신규" : report.status === "investigating" ? "조사중" : "해결됨"}
                        </span>
                      </div>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm">{report.description}</p>
                    </div>
                    <div className="mt-4 flex justify-end gap-2">
                      {report.status !== "resolved" && (
                        <>
                          <Button variant="outline" size="sm">
                            <CheckCircle className="mr-2 h-4 w-4" />
                            해결 완료
                          </Button>
                          <Button variant="outline" size="sm">
                            <XCircle className="mr-2 h-4 w-4" />
                            거부
                          </Button>
                        </>
                      )}
                      <Button variant="outline" size="sm">
                        상세 보기
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>승인 대기 항목</CardTitle>
              <CardDescription>처리가 필요한 항목들</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Building className="h-5 w-5 text-gray-400 mr-2" />
                    <span>매물 승인 요청</span>
                  </div>
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-1 text-xs rounded-full">12</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <CreditCard className="h-5 w-5 text-gray-400 mr-2" />
                    <span>정산 요청</span>
                  </div>
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-1 text-xs rounded-full">8</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <MessageSquare className="h-5 w-5 text-gray-400 mr-2" />
                    <span>신규 문의/신고</span>
                  </div>
                  <span className="bg-red-100 text-red-800 px-2 py-1 text-xs rounded-full">5</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-gray-400 mr-2" />
                    <span>호스트 신청</span>
                  </div>
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-1 text-xs rounded-full">3</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>공지사항 관리</CardTitle>
              <CardDescription>최근 공지사항</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-b pb-2">
                  <h3 className="font-medium">2023년 12월 서비스 업데이트 안내</h3>
                  <p className="text-sm text-gray-500">2023-12-01</p>
                </div>

                <div className="border-b pb-2">
                  <h3 className="font-medium">연말 특별 프로모션 안내</h3>
                  <p className="text-sm text-gray-500">2023-11-25</p>
                </div>

                <div className="border-b pb-2">
                  <h3 className="font-medium">개인정보처리방침 개정 안내</h3>
                  <p className="text-sm text-gray-500">2023-11-15</p>
                </div>

                <Button className="w-full">공지사항 관리</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

const users = [
  {
    id: 1,
    name: "김철수",
    email: "kim@example.com",
    type: "user",
    status: "active",
    joinDate: "2023-10-15",
    lastLogin: "2023-12-10",
    image: "/placeholder.svg?height=100&width=100&query=korean man portrait",
  },
  {
    id: 2,
    name: "이영희",
    email: "lee@example.com",
    type: "host",
    status: "active",
    joinDate: "2023-09-05",
    lastLogin: "2023-12-12",
    image: "/placeholder.svg?height=100&width=100&query=korean woman portrait",
  },
  {
    id: 3,
    name: "박지민",
    email: "park@example.com",
    type: "user",
    status: "inactive",
    joinDate: "2023-11-20",
    lastLogin: "2023-11-25",
    image: "/placeholder.svg?height=100&width=100&query=young korean person portrait",
  },
]

const adminProperties = [
  {
    id: 1,
    title: "해에하우스-원룸 기준 룸쉐어 중&여-미공개",
    location: "서울시 마포구 홍대입구역 5분 거리",
    price: 670000,
    host: "이영희",
    status: "active",
    image: "/modern-korean-bedroom.png",
  },
  {
    id: 2,
    title: "강남 프리미엄 오피스텔",
    location: "서울시 강남구 강남역 3분 거리",
    price: 950000,
    host: "박호스트",
    status: "pending",
    image: "/placeholder.svg?height=200&width=300&query=gangnam seoul apartment",
  },
  {
    id: 3,
    title: "부산 해운대 오션뷰 숙소",
    location: "부산시 해운대구 해운대해수욕장 도보 10분",
    price: 850000,
    host: "김바다",
    status: "rejected",
    image: "/placeholder.svg?height=200&width=300&query=busan haeundae ocean view apartment",
  },
]

const adminReservations = [
  {
    id: 1,
    propertyTitle: "해에하우스-원룸 기준 룸쉐어 중&여-미공개",
    checkIn: "2023-12-15",
    checkOut: "2024-01-15",
    host: "이영희",
    guest: "김철수",
    amount: 670000,
    status: "confirmed",
    paymentStatus: "완료",
    paymentMethod: "신용카드",
  },
  {
    id: 2,
    propertyTitle: "강남 프리미엄 오피스텔",
    checkIn: "2023-12-20",
    checkOut: "2024-02-20",
    host: "박호스트",
    guest: "이사용",
    amount: 1900000,
    status: "pending",
    paymentStatus: "대기중",
    paymentMethod: "-",
  },
  {
    id: 3,
    propertyTitle: "부산 해운대 오션뷰 숙소",
    checkIn: "2023-12-25",
    checkOut: "2024-01-05",
    host: "김바다",
    guest: "박여행",
    amount: 425000,
    status: "refund",
    paymentStatus: "환불 처리중",
    paymentMethod: "계좌이체",
  },
]

const reports = [
  {
    id: 1,
    title: "매물 정보 불일치",
    reporter: "김철수",
    target: "해에하우스-원룸 기준 룸쉐어 중&여-미공개",
    date: "2023-12-10",
    status: "new",
    description: "실제 방문했을 때 사진과 다른 점이 많았습니다. 특히 방 크기가 사진보다 훨씬 작았습니다.",
  },
  {
    id: 2,
    title: "호스트 응답 없음",
    reporter: "이사용",
    target: "강남 프리미엄 오피스텔",
    date: "2023-12-08",
    status: "investigating",
    description: "예약 후 3일 동안 호스트가 연락이 없어 불편했습니다. 체크인 정보를 받지 못했습니다.",
  },
  {
    id: 3,
    title: "부적절한 메시지",
    reporter: "박여행",
    target: "김바다 (호스트)",
    date: "2023-12-05",
    status: "resolved",
    description: "호스트가 부적절한 개인 정보를 요구했습니다.",
  },
]
