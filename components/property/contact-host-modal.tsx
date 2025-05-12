"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { CalendarIcon, Minus, Plus, User, X } from "lucide-react"
import { format } from "date-fns"
import { ko } from "date-fns/locale"

interface Room {
  id: number
  title: string
  price: number
}

interface Host {
  name: string
  image: string
  joinDate: string
}

interface ContactHostModalProps {
  open: boolean
  onClose: () => void
  host: Host
  rooms: Room[]
  propertyTitle: string
}

export default function ContactHostModal({ open, onClose, host, rooms, propertyTitle }: ContactHostModalProps) {
  const router = useRouter()
  const [startDate, setStartDate] = useState<Date | undefined>(undefined)
  const [endDate, setEndDate] = useState<Date | undefined>(undefined)
  const [showCalendar, setShowCalendar] = useState(false)
  const [guestCount, setGuestCount] = useState(1)
  const [selectedRoom, setSelectedRoom] = useState<string>("")
  const [message, setMessage] = useState("")

  const decreaseGuests = () => {
    if (guestCount > 1) {
      setGuestCount(guestCount - 1)
    }
  }

  const increaseGuests = () => {
    if (guestCount < 10) {
      setGuestCount(guestCount + 1)
    }
  }

  const handleSubmit = () => {
    // In a real app, you would send this data to your backend
    console.log({
      host,
      startDate,
      endDate,
      guestCount,
      selectedRoom,
      message,
    })

    // Navigate to messages page after sending
    router.push("/messages")
    onClose()
  }

  const isFormValid = startDate && endDate && selectedRoom && message.trim().length > 0

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center relative">
            호스트에게 연락하기
            <Button variant="ghost" size="icon" className="absolute right-0 top-0" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="py-4">
          {/* Host info */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 relative rounded-full overflow-hidden bg-gray-100">
              <Image src={host.image || "/placeholder.svg"} alt={host.name} fill className="object-cover" />
            </div>
            <div>
              <h3 className="font-medium">{host.name}에게 메세지 보내기</h3>
              <p className="text-sm text-gray-500">May {new Date().getFullYear()} 부터 멤버</p>
            </div>
          </div>

          {/* Stay details */}
          <div className="mb-6">
            <h3 className="font-medium mb-3">숙소 정보를 입력하세요</h3>
            <p className="text-sm text-gray-500 mb-3">원하는 기간</p>

            {/* Date selection */}
            <div
              className="flex items-center justify-between bg-gray-100 rounded-md p-4 cursor-pointer mb-3"
              onClick={() => setShowCalendar(!showCalendar)}
            >
              <div className="flex items-center">
                <CalendarIcon className="h-5 w-5 text-gray-500 mr-2" />
                <span className="text-gray-700">날짜 선택</span>
              </div>
              {startDate && endDate ? (
                <span className="text-sm font-medium">
                  {format(startDate, "yyyy.MM.dd", { locale: ko })} - {format(endDate, "yyyy.MM.dd", { locale: ko })}
                </span>
              ) : (
                <span className="text-sm text-gray-500">날짜를 선택하세요</span>
              )}
            </div>

            {showCalendar && (
              <div className="border rounded-md p-2 bg-white shadow-md mb-3">
                <Calendar
                  mode="range"
                  selected={{
                    from: startDate,
                    to: endDate,
                  }}
                  onSelect={(range) => {
                    setStartDate(range?.from)
                    setEndDate(range?.to)
                    if (range?.to) {
                      setShowCalendar(false)
                    }
                  }}
                  locale={ko}
                  className="rounded-md"
                />
              </div>
            )}

            {/* Guest count */}
            <div className="flex items-center justify-between bg-gray-100 rounded-md p-4 mb-3">
              <div className="flex items-center">
                <User className="h-5 w-5 text-gray-500 mr-2" />
                <span className="text-gray-700">세입자 수</span>
              </div>
              <div className="flex items-center">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={decreaseGuests}
                  disabled={guestCount <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="mx-3 font-medium">{guestCount}</span>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={increaseGuests}
                  disabled={guestCount >= 10}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Room selection */}
            <Select value={selectedRoom} onValueChange={setSelectedRoom}>
              <SelectTrigger className="w-full bg-gray-100 border-0 mb-6">
                <SelectValue placeholder="방 선택하기" />
              </SelectTrigger>
              <SelectContent>
                {rooms.map((room) => (
                  <SelectItem key={room.id} value={room.id.toString()}>
                    {room.title} - ₩{room.price.toLocaleString()}/월
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* FAQ Accordion */}
          <div className="mb-6">
            <h3 className="font-medium mb-3">질문 전에 확인하세요</h3>
            <div className="bg-yellow-50 rounded-lg p-4">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1" className="border-b-0">
                  <AccordionTrigger className="py-2 hover:no-underline">
                    <div className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span>날짜가 가능한가요?</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    &apos;자세히 보기(View details)&apos;를 눌러 달력을 확인하세요. 날짜를 선택하면 예약 가능 여부를 알
                    수 있어요. 질문이 유동적이거나 호스트에게 메시지를 보내보세요!
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2" className="border-b-0">
                  <AccordionTrigger className="py-2 hover:no-underline">
                    <div className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span>어떤 것이 포함되어 있나요?</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    사진 또는 &apos;자세히 보기(View details)&apos;에서 방 옵션과 가구 정보를 확인할 수 있어요.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3" className="border-b-0">
                  <AccordionTrigger className="py-2 hover:no-underline">
                    <div className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span>결제 및 계약 정보</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>숙소 페이지 하단에서 계약 및 결제 관련 정보를 확인할 수 있어요.</AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4" className="border-b-0">
                  <AccordionTrigger className="py-2 hover:no-underline">
                    <div className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span>더 빠른 답장을 받는 메시지 작성 팁</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    짧은 자기소개와 질문(예: 학생, 직장인 등)을 추가하면 호스트로부터 더 빠르게 답변을 받을 수 있어요.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>

          {/* Message input */}
          <div className="mb-6">
            <h3 className="font-medium mb-3">어떤 내용을 질문하실 건가요?</h3>
            <p className="text-sm text-gray-500 mb-3">질문 내용</p>
            <Textarea
              placeholder="예시: 안녕하세요! 저는 현재 미국에 거주 중이며, 고려대학교에 다니게 되어 이 방에 관심이 있습니다. 음악 8월에 입주하길 원하며 계약 기간은 4개월까지 가능한가요?"
              className="min-h-[150px] bg-gray-100 border-0"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          <Button
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black"
            onClick={handleSubmit}
            disabled={!isFormValid}
          >
            전송
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
