"use client"

import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import type { UnitInfo } from "../property-registration-modal"

interface CompletionStepProps {
  formData: {
    operationType: string
    stayType: string
    location: {
      address: string
      unitNumber: string
      nearbyFacilities: string[]
    }
    units: UnitInfo[]
    minimumStay: number
  }
  updateFormData: (data: any) => void
}

export default function CompletionStep({ formData }: CompletionStepProps) {
  const getStayTypeName = (type: string) => {
    const types: Record<string, string> = {
      apartment: "아파트",
      house: "주택",
      oneroom: "원룸",
      hotel: "호텔",
      villa: "빌라",
      officetel: "오피스텔",
      shared: "공유리빙",
    }
    return types[type] || type
  }

  const getOperationTypeName = (type: string) => {
    return type === "shared" ? "쉐어하우스" : "프라이빗"
  }

  return (
    <div className="space-y-8 text-center">
      <div className="flex justify-center">
        <div className="bg-green-100 rounded-full p-4">
          <Check className="h-12 w-12 text-green-600" />
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-2">축하합니다!</h2>
        <p className="text-xl">세입자의 계약을 받을 스테이가 준비됐습니다!</p>
      </div>

      {formData.units.length > 0 && (
        <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto">
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <h3 className="font-medium text-lg mb-2">등록된 스테이 정보</h3>
            <div className="text-sm text-left space-y-2">
              <p>
                <span className="font-medium">운영 타입:</span> {getOperationTypeName(formData.operationType)}
              </p>
              <p>
                <span className="font-medium">스테이 형태:</span> {getStayTypeName(formData.stayType)}
              </p>
              <p>
                <span className="font-medium">위치:</span> {formData.location.address} {formData.location.unitNumber}
              </p>
              <p>
                <span className="font-medium">최소 거주일:</span> {formData.minimumStay}일
              </p>
              <p>
                <span className="font-medium">등록된 호실:</span> {formData.units.length}개
              </p>
            </div>
          </div>

          <div className="border rounded-lg overflow-hidden">
            {formData.units[0].photos.length > 0 ? (
              <img
                src={formData.units[0].photos[0] || "/placeholder.svg"}
                alt="Property"
                className="w-full h-48 object-cover"
              />
            ) : (
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-400">이미지 없음</div>
            )}
            <div className="p-4">
              <h4 className="font-medium">{formData.units[0].name || "이름 없음"}</h4>
              <p className="text-gray-600">₩{formData.units[0].price.toLocaleString()}/월</p>
              <p className="text-green-600 text-sm mt-1">1 옵션 사용 가능</p>
            </div>
          </div>

          <Button className="w-full mt-4">스테이 관리로 돌아가기</Button>
        </div>
      )}

      <p className="text-gray-500 text-sm mt-4">
        앤코 호스트가 되신걸 진심으로 환영합니다.
        <br />
        아래 카드를 클릭하시면 등록하신 스테이가 세입자에게 어떻게 보이는지 확인할수 있습니다.
      </p>
    </div>
  )
}
