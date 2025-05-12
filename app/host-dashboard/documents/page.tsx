"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Search, Filter, Upload, FileText } from "lucide-react"

export default function DocumentsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">문서 관리</h1>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input placeholder="문서명, 게스트 이름으로 검색" className="pl-10" />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            필터
          </Button>
          <Button size="sm" className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            문서 업로드
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="mb-4">
          <TabsTrigger value="all">전체</TabsTrigger>
          <TabsTrigger value="contracts">계약서</TabsTrigger>
          <TabsTrigger value="receipts">영수증</TabsTrigger>
          <TabsTrigger value="others">기타</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <Card>
            <CardContent className="p-8 text-center">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                  <FileText className="h-6 w-6 text-gray-400" />
                </div>
              </div>
              <h3 className="text-lg font-medium mb-2">문서가 없습니다.</h3>
              <p className="text-gray-500 text-sm mb-4">아직 등록된 문서가 없습니다. 문서를 업로드해주세요.</p>
              <Button size="sm" className="flex items-center gap-2 mx-auto">
                <Upload className="h-4 w-4" />
                문서 업로드
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {["contracts", "receipts", "others"].map((tab) => (
          <TabsContent key={tab} value={tab}>
            <Card>
              <CardContent className="p-8 text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                    <FileText className="h-6 w-6 text-gray-400" />
                  </div>
                </div>
                <h3 className="text-lg font-medium mb-2">문서가 없습니다.</h3>
                <p className="text-gray-500 text-sm mb-4">아직 등록된 문서가 없습니다. 문서를 업로드해주세요.</p>
                <Button size="sm" className="flex items-center gap-2 mx-auto">
                  <Upload className="h-4 w-4" />
                  문서 업로드
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
