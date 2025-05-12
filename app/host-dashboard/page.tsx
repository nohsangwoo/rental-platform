"use client"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronRight, ExternalLink } from "lucide-react"
import { useState } from "react"
import PropertyRegistrationModal from "@/components/property/property-registration-modal"

export default function HostDashboardPage() {
  const hostName = "Choi Jin"
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false)

  const openRegistrationModal = () => {
    setIsRegistrationModalOpen(true)
  }

  const closeRegistrationModal = () => {
    setIsRegistrationModalOpen(false)
  }

  return (
    <div className="space-y-12">
      {/* Greeting section */}
      <div className="text-center md:text-left">
        <h1 className="text-3xl font-bold text-gray-900">안녕하세요 {hostName}님!</h1>
      </div>

      {/* Contract management section */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">계약 관리</h2>
          <Button variant="outline" size="sm" onClick={openRegistrationModal}>
            매물 등록하기
          </Button>
        </div>

        <Tabs defaultValue="승인 대기">
          <TabsList className="mb-4">
            <TabsTrigger value="승인 대기">승인 대기 (0)</TabsTrigger>
            <TabsTrigger value="임박 예약">임박 예약 (1)</TabsTrigger>
            <TabsTrigger value="입주 중">입주 중 (0)</TabsTrigger>
            <TabsTrigger value="퇴실 예정">퇴실 예정 (0)</TabsTrigger>
          </TabsList>

          <TabsContent value="승인 대기">
            <p className="text-sm text-gray-500 mb-4">
              현재 4개의 매물이 있습니다. 모든 내역을 확인하시려면 모든 계약 내역 보기를 클릭하세요.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card className="overflow-hidden hover:shadow-md transition-shadow">
                <CardContent className="p-0">
                  <div className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden relative bg-gray-100">
                        <Image src="/korean-man-portrait.png" alt="Guest" fill className="object-cover" />
                      </div>
                      <div>
                        <h3 className="font-medium">홍길동</h3>
                        <p className="text-xs text-rose-600">임박 예약</p>
                      </div>
                    </div>
                    <h4 className="font-medium mb-1">[5 mins to Gerong Station] gerong stay</h4>
                    <p className="text-sm text-gray-500">Gerong Stay</p>
                    <p className="text-xs text-gray-500 mb-2">2025.12.09 - 2025.12.23</p>
                    <p className="font-bold">₩20,276</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="임박 예약">
            <p className="text-sm text-gray-500 mb-4">현재 1개의 임박 예약이 있습니다.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card className="overflow-hidden hover:shadow-md transition-shadow">
                <CardContent className="p-0">
                  <div className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden relative bg-gray-100">
                        <Image src="/korean-man-portrait.png" alt="Guest" fill className="object-cover" />
                      </div>
                      <div>
                        <h3 className="font-medium">홍길동</h3>
                        <p className="text-xs text-rose-600">임박 예약</p>
                      </div>
                    </div>
                    <h4 className="font-medium mb-1">[5 mins to Gerong Station] gerong stay</h4>
                    <p className="text-sm text-gray-500">Gerong Stay</p>
                    <p className="text-xs text-gray-500 mb-2">2025.12.09 - 2025.12.23</p>
                    <p className="font-bold">₩20,276</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="입주 중">
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-500">현재 입주 중인 계약이 없습니다.</p>
            </div>
          </TabsContent>

          <TabsContent value="퇴실 예정">
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-500">현재 퇴실 예정인 계약이 없습니다.</p>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      <div className="border-t my-6"></div>

      {/* Settlement section */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">정산 관리</h2>
          <Link href="/host-dashboard/settlements" className="text-sm text-rose-600 flex items-center">
            모든 정산 내역 보기 <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">✓</span>
            </div>
          </div>
          <h3 className="text-lg font-medium mb-2">정산 내역이 없습니다.</h3>
          <p className="text-gray-500 text-sm mb-4">
            등록하신 스테이가 없거나, 스테이를 등록하신 후 정산이 발생하지 않았습니다.
          </p>
        </div>
      </section>

      <div className="border-t my-6"></div>

      {/* Usage guide section */}
      <section>
        <h2 className="text-2xl font-bold mb-4">이용 가이드</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((index) => (
            <div key={index} className="rounded-lg overflow-hidden border hover:shadow-md transition-shadow">
              <div className="aspect-video relative">
                <Image
                  src={`/korean-house-${index}.jpg`}
                  alt="호스트 온보딩 가이드북 둘러보기"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium mb-2">호스트 온보딩 가이드북 둘러보기</h3>
                <Link href="#" className="text-sm text-rose-600 flex items-center">
                  자세히 보기 <ExternalLink className="h-3 w-3 ml-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <PropertyRegistrationModal isOpen={isRegistrationModalOpen} onClose={closeRegistrationModal} />
    </div>
  )
}
