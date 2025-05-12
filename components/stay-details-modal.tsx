"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { ChevronRight, X } from "lucide-react"
// Update the import path to use the correct components
import { RejectedStayDetails } from "./stay/rejected-stay-details"
import { PendingStayDetails } from "./stay/pending-stay-details"
import { ApprovedStayDetails } from "./stay/approved-stay-details"

// Update the interface to include all necessary fields
interface Stay {
  id: number
  title: string
  location: string
  dates?: string
  image: string
  host: {
    name: string
    email?: string
    image: string
  }
  status: "upcoming" | "past"
  badge?: string
  contractStatus?: "rejected" | "pending" | "approved"
  contractCode?: string
  contractDate?: string
  checkInDate?: string
  checkOutDate?: string
  tenantCount?: number
  totalAmount?: number
}

interface StayDetailsModalProps {
  stay: Stay
  onClose: () => void
}

// Update the component to handle different statuses
export default function StayDetailsModal({ stay, onClose }: StayDetailsModalProps) {
  // Determine which component to render based on contract status
  const renderStatusSpecificContent = () => {
    switch (stay.contractStatus) {
      case "rejected":
        return <RejectedStayDetails stay={stay} />
      case "pending":
        return <PendingStayDetails stay={stay} />
      case "approved":
        return <ApprovedStayDetails stay={stay} />
      default:
        return <PendingStayDetails stay={stay} />
    }
  }

  // Get status badge color
  const getStatusColor = () => {
    switch (stay.contractStatus) {
      case "rejected":
        return "text-red-500"
      case "pending":
        return "text-purple-500"
      case "approved":
        return "text-green-500"
      default:
        return "text-gray-500"
    }
  }

  // Get status text
  const getStatusText = () => {
    switch (stay.contractStatus) {
      case "rejected":
        return "거절"
      case "pending":
        return "대기 중"
      case "approved":
        return "승인"
      default:
        return "대기 중"
    }
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center">계약 세부 사항</DialogTitle>
          <Button variant="ghost" size="icon" className="absolute right-4 top-4" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <div className="py-4">
          {/* Property header with status */}
          <div className="flex items-center gap-3 border-b pb-4">
            <div className="w-16 h-16 relative rounded-md overflow-hidden">
              <Image src={stay.image || "/placeholder.svg"} alt={stay.title} fill className="object-cover" />
            </div>
            <div className="flex-1">
              <div className={`text-sm font-medium ${getStatusColor()}`}>{getStatusText()}</div>
              <h3 className="font-medium">{stay.title}</h3>
              <div className="flex items-center text-sm text-gray-500">
                <ChevronRight className="h-4 w-4" />
              </div>
            </div>
          </div>

          {/* Contract information */}
          <div className="py-4 border-b">
            <h3 className="font-medium mb-4">계약 정보</h3>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">방 이름</span>
                <span className="text-sm">{stay.location}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-sm text-gray-500">입주일</span>
                <span className="text-sm">{stay.checkInDate}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-sm text-gray-500">퇴거일</span>
                <span className="text-sm">{stay.checkOutDate}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-sm text-gray-500">세입자</span>
                <span className="text-sm">세입자 {stay.tenantCount}명</span>
              </div>

              <div className="flex justify-between">
                <span className="text-sm text-gray-500">계약 코드</span>
                <span className="text-sm">{stay.contractCode}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-sm text-gray-500">계약 날짜</span>
                <span className="text-sm">{stay.contractDate}</span>
              </div>
            </div>
          </div>

          {/* Host information */}
          <div className="py-4 border-b">
            <h3 className="font-medium mb-4">호스트 프로필</h3>
            <div className="flex items-center">
              <div className="w-12 h-12 relative rounded-full overflow-hidden bg-gray-100 mr-3">
                <Image src={stay.host.image || "/placeholder.svg"} alt={stay.host.name} fill className="object-cover" />
              </div>
              <div>
                <p className="font-medium">{stay.host.name}</p>
                <p className="text-sm text-gray-500">{stay.host.email}</p>
              </div>
            </div>
          </div>

          {/* Status-specific content */}
          {renderStatusSpecificContent()}
        </div>
      </DialogContent>
    </Dialog>
  )
}
