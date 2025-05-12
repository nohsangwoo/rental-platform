"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Search, Filter, Star } from "lucide-react"

export default function ReviewsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">리뷰 관리</h1>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input placeholder="게스트 이름, 매물명으로 검색" className="pl-10" />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            필터
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="mb-4">
          <TabsTrigger value="all">전체</TabsTrigger>
          <TabsTrigger value="pending">답변 대기</TabsTrigger>
          <TabsTrigger value="completed">답변 완료</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <Card>
            <CardContent className="p-8 text-center">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                  <Star className="h-6 w-6 text-gray-400" />
                </div>
              </div>
              <h3 className="text-lg font-medium mb-2">리뷰가 없습니다.</h3>
              <p className="text-gray-500 text-sm mb-4">
                아직 등록된 리뷰가 없습니다. 게스트가 숙박을 완료하면 리뷰를 작성할 수 있습니다.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {["pending", "completed"].map((tab) => (
          <TabsContent key={tab} value={tab}>
            <Card>
              <CardContent className="p-8 text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                    <Star className="h-6 w-6 text-gray-400" />
                  </div>
                </div>
                <h3 className="text-lg font-medium mb-2">리뷰가 없습니다.</h3>
                <p className="text-gray-500 text-sm mb-4">
                  아직 등록된 리뷰가 없습니다. 게스트가 숙박을 완료하면 리뷰를 작성할 수 있습니다.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
