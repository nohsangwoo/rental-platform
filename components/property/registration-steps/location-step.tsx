"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { X, Search, Plus } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface LocationStepProps {
  formData: {
    location: {
      address: string
      unitNumber: string
      nearbyFacilities: string[]
    }
  }
  updateFormData: (data: {
    location: {
      address: string
      unitNumber: string
      nearbyFacilities: string[]
    }
  }) => void
}

export default function LocationStep({ formData, updateFormData }: LocationStepProps) {
  const [facilityName, setFacilityName] = useState("")
  const [transportType, setTransportType] = useState("도보")
  const [duration, setDuration] = useState("10분")

  const handleAddressChange = (address: string) => {
    updateFormData({
      location: {
        ...formData.location,
        address,
      },
    })
  }

  const handleUnitNumberChange = (unitNumber: string) => {
    updateFormData({
      location: {
        ...formData.location,
        unitNumber,
      },
    })
  }

  const handleAddFacility = () => {
    if (!facilityName.trim()) return

    const newFacility = `${facilityName} · ${transportType} · ${duration}`
    updateFormData({
      location: {
        ...formData.location,
        nearbyFacilities: [...formData.location.nearbyFacilities, newFacility],
      },
    })

    setFacilityName("")
  }

  const handleRemoveFacility = (index: number) => {
    const updatedFacilities = formData.location.nearbyFacilities.filter((_, i) => i !== index)
    updateFormData({
      location: {
        ...formData.location,
        nearbyFacilities: updatedFacilities,
      },
    })
  }

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-medium text-center mb-6">스테이의 위치가 어디인가요?</h3>

      <div className="space-y-4">
        <div className="relative">
          <Input
            placeholder="주소를 입력해주세요"
            value={formData.location.address}
            onChange={(e) => handleAddressChange(e.target.value)}
            className="pr-10"
          />
          {formData.location.address && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
              onClick={() => handleAddressChange("")}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        <Input
          placeholder="상세 주소 (동/호수 등)"
          value={formData.location.unitNumber}
          onChange={(e) => handleUnitNumberChange(e.target.value)}
        />
      </div>

      <div className="pt-4">
        <h4 className="text-lg font-medium mb-2">주변에 이런 시설이 있어요</h4>

        <div className="flex flex-wrap gap-2 mb-4">
          {formData.location.nearbyFacilities.map((facility, index) => (
            <div
              key={index}
              className="flex items-center gap-1 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm"
            >
              {facility}
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0 ml-1"
                onClick={() => handleRemoveFacility(index)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>

        <p className="text-sm text-gray-500 mb-2">주변에 가까운 시설을 추가해주세요</p>

        <div className="flex gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="지하철역 · 대학교"
              className="pl-10"
              value={facilityName}
              onChange={(e) => setFacilityName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  handleAddFacility()
                }
              }}
            />
          </div>

          <Select value={transportType} onValueChange={setTransportType}>
            <SelectTrigger className="w-24">
              <SelectValue placeholder="이동수단" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="도보">도보</SelectItem>
              <SelectItem value="버스">버스</SelectItem>
              <SelectItem value="지하철">지하철</SelectItem>
              <SelectItem value="자동차">자동차</SelectItem>
            </SelectContent>
          </Select>

          <Select value={duration} onValueChange={setDuration}>
            <SelectTrigger className="w-24">
              <SelectValue placeholder="소요시간" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5분">5분</SelectItem>
              <SelectItem value="10분">10분</SelectItem>
              <SelectItem value="15분">15분</SelectItem>
              <SelectItem value="20분">20분</SelectItem>
              <SelectItem value="30분">30분</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="icon" onClick={handleAddFacility}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
