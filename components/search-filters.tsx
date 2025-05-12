"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search } from "lucide-react"

export default function SearchFilters() {
  const [activeTab, setActiveTab] = useState("location")

  return (
    <div className="border-b sticky top-0 bg-white z-10">
      <div className="container mx-auto px-4">
        <Tabs defaultValue="location" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-5 h-auto">
            <TabsTrigger
              value="location"
              className="py-3 data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none"
            >
              주거 형태
            </TabsTrigger>
            <TabsTrigger
              value="address"
              className="py-3 data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none"
            >
              지역: 주변으로 검색
            </TabsTrigger>
            <TabsTrigger
              value="price"
              className="py-3 data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none"
            >
              입주일 ~ 퇴거일
            </TabsTrigger>
            <TabsTrigger
              value="options"
              className="py-3 data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none"
            >
              옵션
            </TabsTrigger>
            <TabsTrigger
              value="more"
              className="py-3 data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none"
            >
              편의옵션
            </TabsTrigger>
          </TabsList>

          <div className="py-4">
            <TabsContent value="location" className="mt-0">
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm">
                  스튜디오
                </Button>
                <Button variant="outline" size="sm">
                  원룸
                </Button>
                <Button variant="outline" size="sm">
                  투룸
                </Button>
                <Button variant="outline" size="sm">
                  쉐어하우스
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="address" className="mt-0">
              <div className="flex gap-2">
                <Input placeholder="지역명, 지하철역으로 검색" className="max-w-md" />
                <Button>
                  <Search className="h-4 w-4 mr-2" />
                  검색
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="price" className="mt-0">
              <div className="flex gap-2">
                <Input type="date" className="max-w-xs" />
                <span className="flex items-center">~</span>
                <Input type="date" className="max-w-xs" />
              </div>
            </TabsContent>

            <TabsContent value="options" className="mt-0">
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm">
                  에어컨
                </Button>
                <Button variant="outline" size="sm">
                  세탁기
                </Button>
                <Button variant="outline" size="sm">
                  냉장고
                </Button>
                <Button variant="outline" size="sm">
                  인터넷
                </Button>
                <Button variant="outline" size="sm">
                  전자레인지
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="more" className="mt-0">
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm">
                  엘리베이터
                </Button>
                <Button variant="outline" size="sm">
                  주차장
                </Button>
                <Button variant="outline" size="sm">
                  보안
                </Button>
                <Button variant="outline" size="sm">
                  반려동물
                </Button>
                <Button variant="outline" size="sm">
                  베란다
                </Button>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  )
}
