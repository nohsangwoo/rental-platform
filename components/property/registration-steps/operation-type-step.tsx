"use client"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Info } from "lucide-react"

interface OperationTypeStepProps {
  formData: {
    operationType: string
  }
  updateFormData: (data: { operationType: string }) => void
}

export default function OperationTypeStep({ formData, updateFormData }: OperationTypeStepProps) {
  const handleChange = (value: string) => {
    updateFormData({ operationType: value })
  }

  return (
    <div className="space-y-6">
      <p className="text-center text-lg">운영하실 옵션을 선택해주세요</p>

      <div className="bg-blue-50 p-4 rounded-md flex gap-2 text-sm">
        <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
        <p className="text-blue-700">
          하나의 또는 주변 등 생활 공간의 일부를 다른 사람들과 공유하는 고시원이나 쉐어룸은 쉐어하우스로 등록해주세요.
        </p>
      </div>

      <RadioGroup value={formData.operationType} onValueChange={handleChange} className="space-y-4">
        <div className="flex items-start space-x-2 bg-gray-50 p-4 rounded-md">
          <RadioGroupItem value="shared" id="shared" className="mt-1" />
          <div className="grid gap-1.5">
            <Label htmlFor="shared" className="font-medium text-lg">
              쉐어하우스
            </Label>
            <p className="text-sm text-gray-500">
              하나의 거주공간에서 여러명의 세입자를 받고싶은 호스트님을 위한 옵션입니다. 세입자는 공유 공간에서 다양한
              사람들과 함께 생활하며 새로운 경험을 쌓을 수 있습니다.
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-2 bg-gray-50 p-4 rounded-md">
          <RadioGroupItem value="private" id="private" className="mt-1" />
          <div className="grid gap-1.5">
            <Label htmlFor="private" className="font-medium text-lg">
              프라이빗
            </Label>
            <p className="text-sm text-gray-500">
              보유하신 공간을 독채로 하나를 운영하거나, 여러개의 프라이빗 공간을 운영하시는 호스트님을 위한 옵션입니다.
              세입자는 단독으로 거주하며, 독립적인 생활을 할 수 있습니다.
            </p>
          </div>
        </div>
      </RadioGroup>

      <p className="text-center text-sm text-gray-500 mt-8">
        50인 이상의 코리빙 하우스를 등록하시는 호스트님은 운영팀에게 문의해주세요.
      </p>
    </div>
  )
}
