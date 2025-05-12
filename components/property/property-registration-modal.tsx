"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import OperationTypeStep from "./registration-steps/operation-type-step"
import StayTypeStep from "./registration-steps/stay-type-step"
import LocationStep from "./registration-steps/location-step"
import UnitInfoStep from "./registration-steps/unit-info-step"
import MinimumStayStep from "./registration-steps/minimum-stay-step"
import CompletionStep from "./registration-steps/completion-step"

interface PropertyRegistrationModalProps {
  isOpen: boolean
  onClose: () => void
}

export type UnitInfo = {
  id: string
  name: string
  price: number
  maintenanceFee: number
  deposit: number
  photos: string[]
  wifiId?: string
  wifiPassword?: string
  wifiBackupPassword?: string
}

export default function PropertyRegistrationModal({ isOpen, onClose }: PropertyRegistrationModalProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    operationType: "",
    stayType: "",
    location: {
      address: "",
      unitNumber: "",
      nearbyFacilities: [] as string[],
    },
    units: [] as UnitInfo[],
    minimumStay: 30,
    // 추가 필드는 여기에 추가
  })

  const steps = [
    {
      title: "운영 옵션 선택",
      component: OperationTypeStep,
    },
    {
      title: "스테이 형태 선택",
      component: StayTypeStep,
    },
    {
      title: "스테이 위치 입력",
      component: LocationStep,
    },
    {
      title: "호실(세대) 정보 추가",
      component: UnitInfoStep,
    },
    {
      title: "최소 거주일 선택",
      component: MinimumStayStep,
    },
    {
      title: "등록 완료",
      component: CompletionStep,
    },
  ]

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const updateFormData = (data: Partial<typeof formData>) => {
    setFormData({ ...formData, ...data })
  }

  const isLastStep = currentStep === steps.length - 1

  // 현재 단계의 컴포넌트 가져오기
  const StepComponent = steps[currentStep].component

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader className="p-6 border-b sticky top-0 bg-white z-10">
          <DialogTitle className="text-xl font-bold text-center">{steps[currentStep].title}</DialogTitle>
          <Button variant="ghost" size="icon" className="absolute right-4 top-4" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <div className="p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <StepComponent formData={formData} updateFormData={updateFormData} />
            </motion.div>
          </AnimatePresence>
        </div>

        {!isLastStep && (
          <div className="p-6 border-t sticky bottom-0 bg-white z-10 flex justify-between">
            <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 0}>
              이전으로
            </Button>
            <Button onClick={handleNext}>다음</Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
