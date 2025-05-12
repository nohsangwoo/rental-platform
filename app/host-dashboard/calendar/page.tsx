"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, ChevronRight, Filter } from "lucide-react"

export default function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [view, setView] = useState<"month" | "week" | "day">("month")

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold">달력</h1>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="font-medium">2025년 5월</span>
            <Button variant="outline" size="icon">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            필터
          </Button>

          <Select value={view} onValueChange={(value) => setView(value as "month" | "week" | "day")}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="보기 방식" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">월간 보기</SelectItem>
              <SelectItem value="week">주간 보기</SelectItem>
              <SelectItem value="day">일간 보기</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-4">
            <h3 className="font-medium mb-3">오늘의 일정</h3>
            <div className="text-center py-8">
              <p className="text-gray-500">오늘 예정된 일정이 없습니다.</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h3 className="font-medium mb-3">체크인 예정</h3>
            <div className="text-center py-8">
              <p className="text-gray-500">오늘 체크인 예정이 없습니다.</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h3 className="font-medium mb-3">체크아웃 예정</h3>
            <div className="text-center py-8">
              <p className="text-gray-500">오늘 체크아웃 예정이 없습니다.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
