"use client"

import { Slider } from "@/components/ui/slider"
import { useState, useEffect } from "react"

interface MinimumStayStepProps {
  formData: {
    minimumStay: number
  }
  updateFormData: (data: { minimumStay: number }) => void
}

export default function MinimumStayStep({ formData, updateFormData }: MinimumStayStepProps) {
  const [value, setValue] = useState(formData.minimumStay)

  useEffect(() => {
    setValue(formData.minimumStay)
  }, [formData.minimumStay])

  const handleChange = (newValue: number[]) => {
    const days = newValue[0]
    setValue(days)
    updateFormData({ minimumStay: days })
  }

  return (
    <div className="space-y-8">
      <h3 className="text-xl font-medium text-center">최소 거주일을 선택해주세요</h3>

      <div className="space-y-6">
        <Slider defaultValue={[value]} max={365} min={14} step={1} onValueChange={handleChange} />

        <div className="text-center text-2xl font-bold text-blue-600">{value}일</div>

        <div className="flex justify-between text-sm text-gray-500">
          <span>최소: 14일</span>
          <span>최대: 365일</span>
        </div>
      </div>
    </div>
  )
}
