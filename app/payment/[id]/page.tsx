"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ArrowLeft, CreditCard, Building, Calendar } from "lucide-react"

export default function PaymentPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const roomId = searchParams.get("roomId") || "1"

  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [firstName, setFirstName] = useState("홍")
  const [lastName, setLastName] = useState("길동")
  const [email, setEmail] = useState("example@gmail.com")
  const [promoCode, setPromoCode] = useState("")
  const [cardNumber, setCardNumber] = useState("")
  const [agreeDeposit, setAgreeDeposit] = useState(false)

  // Mock data for the selected room
  const roomOptions = [
    {
      id: 1,
      title: "[Seoul station] 7 minutes walk from Seoul Station, two room",
      subtitle: "(Girls Only | 5 mins to Hongdae) KOZi Share House",
      capacity: "최대 4명",
      beds: "침대 1개, 더블베드 1개",
      size: "33m²",
      price: 1180000,
      image: "/property-detail-1.jpg",
    },
    {
      id: 2,
      title: "[Seoul station] 5 minutes walk from Seoul Station, studio",
      subtitle: "(Girls Only | 5 mins to Hongdae) KOZi Share House",
      capacity: "최대 2명",
      beds: "침대 1개",
      size: "25m²",
      price: 850000,
      image: "/property-detail-2.jpg",
    },
    {
      id: 3,
      title: "[Seoul station] 10 minutes walk from Seoul Station, three room",
      subtitle: "(Girls Only | 5 mins to Hongdae) KOZi Share House",
      capacity: "최대 6명",
      beds: "침대 2개, 더블베드 1개",
      size: "45m²",
      price: 1450000,
      image: "/property-detail-3.jpg",
    },
  ]

  const selectedRoom = roomOptions.find((room) => room.id === Number.parseInt(roomId)) || roomOptions[0]

  // Calculate fees
  const cleaningFee = 50000
  const serviceFee = Math.round(selectedRoom.price * 0.06) // 6% service fee
  const depositFee = 50000
  const totalAmount = selectedRoom.price + cleaningFee + serviceFee + depositFee

  const handlePayNow = () => {
    setShowPaymentModal(true)
  }

  const handlePaymentComplete = () => {
    setShowPaymentModal(false)
    // In a real app, you would redirect to a confirmation page
    alert("결제가 완료되었습니다!")
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center mb-6">
          <Link href={`/property/${params.id}`} className="flex items-center text-gray-500 hover:text-gray-700">
            <ArrowLeft className="h-4 w-4 mr-2" />
            <span>뒤로 가기</span>
          </Link>
        </div>

        <h1 className="text-2xl font-bold mb-8">계약 상세</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main content */}
          <div className="w-full lg:w-2/3">
            {/* Reservation details */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-1/4">
                  <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                    <Image
                      src={selectedRoom.image || "/placeholder.svg"}
                      alt={selectedRoom.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <h2 className="font-medium">{selectedRoom.title}</h2>
                  <p className="text-sm text-gray-500">{selectedRoom.subtitle}</p>
                  <div className="flex items-center text-sm text-gray-500 mt-2">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Sep 01, 25 - Sep 30, 25 (29 nights) / 1개월권</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-4">* 입주 수칙 숙지하기 기능합니다.</p>
                </div>
              </div>
            </div>

            {/* User information */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="font-medium mb-4">입주자 정보</h2>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">이름 (한글)</label>
                  <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="홍" />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">성 (한글)</label>
                  <Input value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="길동" />
                </div>
              </div>
              <div className="mb-4">
                <label className="text-xs text-gray-500 mb-1 block">이메일 (필수)</label>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@gmail.com"
                  type="email"
                />
              </div>
              <p className="text-xs text-gray-500">* 연락처의 경우 이전에 입력하신 정보를 사용합니다.</p>
            </div>

            {/* Deposit information */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="font-medium mb-4">배당 옵션</h2>
              <div className="flex items-start space-x-2 mb-4">
                <Checkbox
                  id="deposit"
                  checked={agreeDeposit}
                  onCheckedChange={(checked) => setAgreeDeposit(checked as boolean)}
                />
                <div>
                  <label htmlFor="deposit" className="text-sm font-medium">
                    배당 패키지 가격은 단 50,000원입니다.
                  </label>
                  <p className="text-xs text-gray-500">배당 보상 신청 시 배송비, 이름, 배당가 제공됩니다.</p>
                </div>
              </div>
            </div>

            {/* Promotion code */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="font-medium mb-4">프로모션 코드 적용</h2>
              <div className="flex gap-2">
                <Input
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="할인코드를 입력하세요"
                  className="flex-1"
                />
                <Button variant="outline">적용</Button>
              </div>
            </div>

            {/* Payment process */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="font-medium mb-4">계약 과정</h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mb-2">
                      <CreditCard className="h-6 w-6 text-gray-500" />
                    </div>
                    <span className="text-xs text-gray-500">결제 완료</span>
                  </div>
                  <div className="flex-1 border-t border-gray-300 mx-2"></div>
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mb-2">
                      <Building className="h-6 w-6 text-gray-500" />
                    </div>
                    <span className="text-xs text-gray-500">호스트 확인</span>
                  </div>
                  <div className="flex-1 border-t border-gray-300 mx-2"></div>
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mb-2">
                      <Calendar className="h-6 w-6 text-gray-500" />
                    </div>
                    <span className="text-xs text-gray-500">입주일 예약 확정</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Cancellation policy */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="font-medium mb-4">취소 및 환불정책</h2>
              <div className="flex items-center mb-4">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-yellow-500 h-2.5 rounded-full w-1/3"></div>
                </div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mb-4">
                <span>오늘</span>
                <span>입주일</span>
              </div>
              <p className="text-sm text-gray-700 mb-2">
                계약 완료 시 시점으로부터 7일 이내 계약취소시 취소 환불됩니다. 이후에는 결제된 비용에 따라 부분 환불이
                적용됩니다.
              </p>
            </div>

            {/* Payment rules */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="font-medium mb-4">계약 유의사항</h2>
              <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
                <li>이 계약은 법적 구속력이 있습니다.</li>
                <li>입주 시 신분증을 지참해주세요.</li>
                <li>입주 후 시설물 파손 시 배상 책임이 있습니다.</li>
                <li>소음, 흡연 등 다른 입주자에게 피해를 주는 행위는 금지됩니다.</li>
              </ul>
            </div>
          </div>

          {/* Price summary - Floating on the right */}
          <div className="w-full lg:w-1/3">
            <div className="sticky top-8">
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h2 className="font-medium mb-4">가격 세부 정보</h2>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">임대료</span>
                    <span>₩{selectedRoom.price.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">관리비</span>
                    <div className="flex items-center">
                      <span>₩{(selectedRoom.price * 0.06).toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">월별 서비스 수수료</span>
                    <span>₩{serviceFee.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">퇴실 청소비</span>
                    <span>₩{cleaningFee.toLocaleString()}</span>
                  </div>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between font-bold">
                    <span>총액</span>
                    <span>₩{totalAmount.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <Button className="w-full" onClick={handlePayNow}>
                지금 결제하기
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">결제</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-2">[5 mins to Gerong Station] gerong stay</h3>
              <p className="text-sm text-gray-500">입주 기간 : (01 Jan - 01 Jul)</p>
            </div>

            <div className="space-y-2 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">임대료</span>
                <span>₩{selectedRoom.price.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">관리비</span>
                <span>₩100,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">연장 서비스 수수료</span>
                <span>₩260,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">퇴실 청소비</span>
                <span>₩100,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">배당 패키지</span>
                <span>₩50,000</span>
              </div>
            </div>

            <div className="border-t border-b py-4 mb-6">
              <div className="flex justify-between font-bold">
                <span>지금 결제</span>
                <span>₩3,010,000</span>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-medium mb-2">결제수단 정보</h3>
              <div className="flex items-center border rounded-md p-2">
                <CreditCard className="h-5 w-5 text-gray-500 mr-2" />
                <Input
                  placeholder="카드 번호"
                  className="border-0 focus-visible:ring-0 p-0"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                />
                <span className="text-xs bg-green-800 text-white px-2 py-1 rounded">지금 입력</span>
              </div>
            </div>
          </div>
          <Button className="w-full" onClick={handlePaymentComplete} disabled={!cardNumber}>
            지금 결제하기
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}
