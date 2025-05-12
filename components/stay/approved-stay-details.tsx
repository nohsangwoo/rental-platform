"use client"

import { Button } from "@/components/ui/button"

interface Stay {
  id: number
  title: string
}

interface ApprovedStayDetailsProps {
  stay: Stay
}

export function ApprovedStayDetails({ stay }: ApprovedStayDetailsProps) {
  return (
    <>
      {/* Action buttons for approved status */}
      <div className="py-4">
        <Button className="w-full mb-3" variant="outline">
          계약 연장
        </Button>
        <Button className="w-full" variant="outline">
          계약 취소
        </Button>
      </div>
    </>
  )
}
