"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function ContractsPage() {
  const [activeTab, setActiveTab] = useState("승인 대기")

  // 계약 데이터 (실제로는 API에서 가져올 것)
  const contracts = [
    {
      id: 1,
      status: "신규",
      date: "2025년 05월 09일 (금) 14:55",
      timeElapsed: "지금까지 4d 23h 58m 남았습니다.",
      guestName: "해원 황",
      propertyName: "[5 mins to Gerong Station] gerong stay",
      propertyBranch: "Gerong Stay",
      checkInDate: "26년 11월 10일 (월)",
      checkOutDate: "26년 11월 24일 (월)",
      contractNumber: "ST6D58F41A74",
      payment: "₩20,276",
      distribution: "0",
      tab: "승인 대기",
    },
    {
      id: 2,
      status: "계약 완료",
      date: "",
      timeElapsed: "",
      guestName: "해원 황",
      guestEmail: "h992200@naver.com",
      propertyName: "[5 mins to Gerong Station] gerong stay",
      propertyBranch: "Gerong Stay",
      checkInDate: "26년 12월 09일 (수)",
      checkOutDate: "26년 12월 23일 (수)",
      contractNumber: "ST7A7F161523",
      payment: "₩20,276",
      distribution: "0",
      tab: "계약 완료",
    },
  ]

  // 현재 탭에 해당하는 계약만 필터링
  const filteredContracts = contracts.filter((contract) => contract.tab === activeTab)

  // 승인 대기 중인 계약 수
  const pendingCount = contracts.filter((contract) => contract.tab === "승인 대기").length

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">계약 관리</h1>

      <Tabs defaultValue="승인 대기" onValueChange={setActiveTab}>
        <TabsList className="border-b w-full justify-start rounded-none h-auto p-0 mb-4">
          <TabsTrigger
            value="승인 대기"
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-500 px-6 py-2"
          >
            승인 대기
          </TabsTrigger>
          <TabsTrigger
            value="계약 완료"
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-500 px-6 py-2"
          >
            계약 완료
          </TabsTrigger>
          <TabsTrigger
            value="계약 거절"
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-500 px-6 py-2"
          >
            계약 거절
          </TabsTrigger>
          <TabsTrigger
            value="계약 취소"
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-500 px-6 py-2"
          >
            계약 취소
          </TabsTrigger>
        </TabsList>

        {activeTab === "승인 대기" && pendingCount > 0 && (
          <div className="mb-4 text-sm">호스트의 승인을 기다리는 계약이 {pendingCount}건이 있습니다.</div>
        )}

        <TabsContent value="승인 대기" className="p-0 mt-0">
          <div className="rounded-md border">
            <Table>
              <TableHeader className="bg-gray-700">
                <TableRow>
                  <TableHead className="text-white font-medium w-20">상태</TableHead>
                  <TableHead className="text-white font-medium w-48">계약 날짜</TableHead>
                  <TableHead className="text-white font-medium">계약자 이름 지점명</TableHead>
                  <TableHead className="text-white font-medium">입주일/퇴거일</TableHead>
                  <TableHead className="text-white font-medium">계약번호</TableHead>
                  <TableHead className="text-white font-medium">결제</TableHead>
                  <TableHead className="text-white font-medium w-16">배당</TableHead>
                  <TableHead className="text-white font-medium w-32 text-right pr-4">액션</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredContracts.map((contract) => (
                  <TableRow key={contract.id} className="hover:bg-gray-50">
                    <TableCell className="py-4">
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100 rounded-full font-normal">
                        {contract.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-4">
                      <div>{contract.date}</div>
                      <div className="text-xs text-red-500">{contract.timeElapsed}</div>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="font-medium">{contract.guestName}</div>
                      <div className="text-sm">{contract.propertyName}</div>
                      <div className="text-sm text-gray-500">{contract.propertyBranch}</div>
                    </TableCell>
                    <TableCell className="py-4">
                      <div>{contract.checkInDate} ~</div>
                      <div>{contract.checkOutDate}</div>
                    </TableCell>
                    <TableCell className="py-4">{contract.contractNumber}</TableCell>
                    <TableCell className="py-4">{contract.payment}</TableCell>
                    <TableCell className="py-4">{contract.distribution}</TableCell>
                    <TableCell className="py-4 text-right space-x-1">
                      <Button variant="outline" size="sm" className="h-8">
                        거절
                      </Button>
                      <Button size="sm" className="h-8 bg-blue-500 hover:bg-blue-600">
                        승인
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="계약 완료" className="p-0 mt-0">
          <div className="rounded-md border">
            <Table>
              <TableHeader className="bg-gray-700">
                <TableRow>
                  <TableHead className="text-white font-medium w-24">상태</TableHead>
                  <TableHead className="text-white font-medium w-48">계약자 이름</TableHead>
                  <TableHead className="text-white font-medium">계약자 이름 지점명</TableHead>
                  <TableHead className="text-white font-medium">입주일/퇴거일</TableHead>
                  <TableHead className="text-white font-medium">계약번호</TableHead>
                  <TableHead className="text-white font-medium">결제</TableHead>
                  <TableHead className="text-white font-medium w-16">배당</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contracts
                  .filter((c) => c.tab === "계약 완료")
                  .map((contract) => (
                    <TableRow key={contract.id} className="hover:bg-gray-50">
                      <TableCell className="py-4">
                        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 rounded-full font-normal">
                          {contract.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="py-4">{contract.guestName}</TableCell>
                      <TableCell className="py-4">
                        <div className="font-medium">{contract.guestEmail}</div>
                        <div className="text-sm">{contract.propertyName}</div>
                        <div className="text-sm text-gray-500">{contract.propertyBranch}</div>
                      </TableCell>
                      <TableCell className="py-4">
                        <div>{contract.checkInDate} ~</div>
                        <div>{contract.checkOutDate}</div>
                      </TableCell>
                      <TableCell className="py-4">{contract.contractNumber}</TableCell>
                      <TableCell className="py-4">{contract.payment}</TableCell>
                      <TableCell className="py-4">{contract.distribution}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="계약 거절" className="p-0 mt-0">
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500">거절된 계약이 없습니다.</p>
          </div>
        </TabsContent>

        <TabsContent value="계약 취소" className="p-0 mt-0">
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500">취소된 계약이 없습니다.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
