"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface ExpectedAmountModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ExpectedAmountModal({ isOpen, onClose }: ExpectedAmountModalProps) {
  // 예시 데이터
  const settlements = [
    {
      id: 1,
      property: "[5 mins to Gerong Station] gerong stay",
      guest: "예원 황",
      period: "2025.05.01 - 2025.05.31",
      amount: 2000000,
      fee: 100000,
      tax: 190000,
      total: 1710000,
    },
    {
      id: 2,
      property: "[5 mins to Gerong Station] gerong stay",
      guest: "민준 김",
      period: "2025.05.15 - 2025.06.14",
      amount: 2500000,
      fee: 125000,
      tax: 237500,
      total: 2137500,
    },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>2025년 5월 정산 예정 금액</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <div className="bg-gray-50 p-4 rounded-md mb-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">총 계약 건수</p>
                <p className="font-medium">2건</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">총 정산 예정 금액</p>
                <p className="font-medium">₩3,847,500</p>
              </div>
            </div>
          </div>

          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>매물</TableHead>
                  <TableHead>게스트</TableHead>
                  <TableHead>이용 기간</TableHead>
                  <TableHead className="text-right">결제 금액</TableHead>
                  <TableHead className="text-right">수수료</TableHead>
                  <TableHead className="text-right">세금</TableHead>
                  <TableHead className="text-right">정산 금액</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {settlements.map((settlement) => (
                  <TableRow key={settlement.id}>
                    <TableCell className="font-medium">{settlement.property}</TableCell>
                    <TableCell>{settlement.guest}</TableCell>
                    <TableCell>{settlement.period}</TableCell>
                    <TableCell className="text-right">₩{settlement.amount.toLocaleString()}</TableCell>
                    <TableCell className="text-right">₩{settlement.fee.toLocaleString()}</TableCell>
                    <TableCell className="text-right">₩{settlement.tax.toLocaleString()}</TableCell>
                    <TableCell className="text-right font-medium">₩{settlement.total.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <Button onClick={onClose}>닫기</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
