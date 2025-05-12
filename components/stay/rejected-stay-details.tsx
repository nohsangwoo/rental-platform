"use client"

import { Button } from "@/components/ui/button"

interface Stay {
  id: number
  title: string
  location: string
  image: string
  host: {
    name: string
    email?: string
    image: string
  }
  totalAmount?: number
}

interface RejectedStayDetailsProps {
  stay: Stay
}

export function RejectedStayDetails({ stay }: RejectedStayDetailsProps) {
  return (
    <>
      {/* Payment information */}
      <div className="py-4 border-b">
        <h3 className="font-medium mb-4">결제</h3>
        <div className="flex justify-between mb-2">
          <span>총액</span>
          <span className="font-medium">₩{stay.totalAmount?.toLocaleString()}</span>
        </div>
        <p className="text-xs text-gray-500 mb-4">
          호스트가 예약한 숙소에 대한 입주를 거절했습니다. 예약에 대한 전액 환불이 처리됩니다.
        </p>
        <Button className="w-full" variant="outline">
          영수증 받기
        </Button>
      </div>

      {/* Help section */}
      <div className="py-4">
        <h3 className="font-medium mb-4">도움이 필요하신가요?</h3>
        <Button className="w-full" variant="outline">
          Enkor 드림 센터에 문의하기
        </Button>
      </div>
    </>
  )
}
