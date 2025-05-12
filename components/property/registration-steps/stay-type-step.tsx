"use client"
import { Building2, Home, Hotel, Building, Castle, Warehouse, Users } from "lucide-react"

interface StayTypeStepProps {
  formData: {
    stayType: string
  }
  updateFormData: (data: { stayType: string }) => void
}

export default function StayTypeStep({ formData, updateFormData }: StayTypeStepProps) {
  const stayTypes = [
    { id: "apartment", label: "아파트", icon: Building2 },
    { id: "house", label: "주택", icon: Home },
    { id: "oneroom", label: "원룸", icon: Building },
    { id: "hotel", label: "호텔", icon: Hotel },
    { id: "villa", label: "빌라", icon: Castle },
    { id: "officetel", label: "오피스텔", icon: Warehouse },
    { id: "shared", label: "공유리빙", icon: Users },
  ]

  const handleSelectType = (typeId: string) => {
    updateFormData({ stayType: typeId })
  }

  return (
    <div className="space-y-6">
      <p className="text-center text-lg">등록하실 스테이의 형태를 선택해주세요</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stayTypes.map((type) => {
          const Icon = type.icon
          const isSelected = formData.stayType === type.id

          return (
            <div
              key={type.id}
              className={`
                flex flex-col items-center justify-center p-4 rounded-lg cursor-pointer
                border transition-all
                ${isSelected ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-blue-200"}
              `}
              onClick={() => handleSelectType(type.id)}
            >
              <Icon className={`h-8 w-8 mb-2 ${isSelected ? "text-blue-500" : "text-gray-500"}`} />
              <span className={isSelected ? "font-medium text-blue-700" : "text-gray-700"}>{type.label}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
