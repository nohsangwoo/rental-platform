"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ChevronLeft, ChevronRight, Calendar, Download, HelpCircle, BanknoteIcon as BankIcon } from "lucide-react"
import { AccountRegistrationModal } from "@/components/settlement/account-registration-modal"
import { ExpectedAmountModal } from "@/components/settlement/expected-amount-modal"

export default function SettlementsPage() {
  const [showAccountModal, setShowAccountModal] = useState(false)
  const [showExpectedAmountModal, setShowExpectedAmountModal] = useState(false)
  const [currentYear, setCurrentYear] = useState(2025)
  const [currentMonth, setCurrentMonth] = useState(5)

  const months = [5, 4, 3, 2, 1]

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">정산 관리</h1>
        <Button
          variant="outline"
          className="text-blue-500 border-blue-500 hover:bg-blue-50"
          onClick={() => setShowAccountModal(true)}
        >
          계좌 등록하기
        </Button>
      </div>

      <Alert className="bg-blue-50 border-blue-200 text-blue-800">
        <AlertDescription className="flex flex-col">
          <p>정산을 받으려면 정산받을 계좌를 등록해야합니다.</p>
          <button
            className="text-blue-500 font-medium text-left w-fit hover:underline"
            onClick={() => setShowAccountModal(true)}
          >
            계좌를 등록해주세요.
          </button>
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-gray-200">
          <CardContent className="p-6 flex flex-col h-full">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-4">
              <Calendar className="h-5 w-5 text-blue-600" />
            </div>
            <p className="text-gray-800 font-medium">
              정산금은 매월 10일이다. 정산일이 휴일인 경우 그 전 영업일에 정산됩니다.
            </p>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardContent className="p-6 flex flex-col h-full">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-4">
              <BankIcon className="h-5 w-5 text-blue-600" />
            </div>
            <p className="text-gray-800 font-medium">
              세금 계산 및 원천징수 등다 정확한 진행을 위해 세금 신고가 진행됩니다.
            </p>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardContent className="p-6 flex flex-col h-full">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-4">
              <Download className="h-5 w-5 text-blue-600" />
            </div>
            <p className="text-gray-800 font-medium">정산이 완료되고 나면 계좌정보와 가 출력된지 확인해주세요</p>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardContent className="p-6 flex flex-col h-full">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-4">
              <HelpCircle className="h-5 w-5 text-blue-600" />
            </div>
            <p className="text-gray-800 font-medium">도움이 필요하시면 문의하기에서 문의해주세요.</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold">정산 예정 내역</h2>
        <p className="text-gray-600">추후 정산 예정인 내역을 확인할 수 있습니다.</p>

        <div>
          <Button variant="outline" className="border-gray-300 mb-6" onClick={() => setShowExpectedAmountModal(true)}>
            정산 예정 금액 확인
          </Button>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" onClick={() => setCurrentYear((prev) => prev - 1)}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="font-medium">{currentYear}년 수익</span>
            <Button variant="ghost" size="icon" onClick={() => setCurrentYear((prev) => prev + 1)}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="border rounded-md overflow-hidden">
          {months.map((month) => (
            <div key={month} className="border-b last:border-b-0">
              <div className="grid grid-cols-4 py-4 px-6 items-center">
                <div className="flex items-center">
                  <span className="font-medium">{month}월</span>
                  {month === 5 && <span className="ml-4 text-blue-500 text-sm">정산 처리중</span>}
                </div>
                <div className="text-right">계약건 0건</div>
                <div className="text-right">정산금 ₩0</div>
                <div className="text-right">미수금 ₩0</div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-6">
          <Button variant="outline" className="border-gray-300">
            정산 내역 모두 보기
          </Button>
        </div>
      </div>

      <AccountRegistrationModal isOpen={showAccountModal} onClose={() => setShowAccountModal(false)} />

      <ExpectedAmountModal isOpen={showExpectedAmountModal} onClose={() => setShowExpectedAmountModal(false)} />
    </div>
  )
}
