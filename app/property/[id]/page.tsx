"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Star,
  MapPin,
  Info,
  Grid,
  ChevronLeft,
  ChevronRight,
  X,
  Wifi,
  Droplet,
  Zap,
  Flame,
  Check,
  ArrowLeft,
  CalendarIcon,
  MessageSquare,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Minus, Plus, User } from "lucide-react"
import ChatInterface from "@/components/chat/chat-interface"
import ContactHostModal from "@/components/property/contact-host-modal"

interface PropertyPageProps {
  params: {
    id: string
  }
}

export default function PropertyPage({ params }: PropertyPageProps) {
  const router = useRouter()
  const [selectedStartDate, setSelectedStartDate] = useState<Date | undefined>(new Date())
  const [selectedEndDate, setSelectedEndDate] = useState<Date | undefined>(
    new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  )
  const [showCalendar, setShowCalendar] = useState(false)
  const [guestCount, setGuestCount] = useState(2)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showAllImages, setShowAllImages] = useState(false)
  const [selectedRoomId, setSelectedRoomId] = useState<number | null>(1)
  const [showUserInfoModal, setShowUserInfoModal] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [showChatModal, setShowChatModal] = useState(false)
  const [showContactHostModal, setShowContactHostModal] = useState(false)
  const [propertyId, setPropertyId] = useState<number>(0)

  // Form states
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [gender, setGender] = useState("")
  const [email, setEmail] = useState("")
  const [phoneCountry, setPhoneCountry] = useState("+82")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [agreePrivacy, setAgreePrivacy] = useState(false)
  const [agreeMarketing, setAgreeMarketing] = useState(false)
  const [agreeNews, setAgreeNews] = useState(false)
  const [cardNumber, setCardNumber] = useState("")

  // 컴포넌트가 마운트될 때 params.id 사용
  useEffect(() => {
    if (params.id) {
      setPropertyId(Number.parseInt(params.id))
    }
  }, [params.id])

  // In a real app, you would fetch the property data based on the ID
  const property = {
    id: propertyId,
    title: "[7mins to Seoul Station on foot] Joyenjoy Stay",
    description:
      "- Safe entrance with CCTV and IOT smart door lock\n- Hotel-quality bedding and 43-inch smart plana TV (Netflix/Disney+/YouTube, etc.)\n- Convenience stores, brunch cafes, and laundry facilities nearby...",
    location: "서울특별시 용산구 청파로73가길",
    price: 99000,
    managementFee: 50000,
    cleaningFee: 50000,
    deposit: 330000,
    rating: 4.8,
    reviews: 32,
    host: {
      name: "Joy SEO",
      image: "/host-profile.png",
      joinDate: "Mar 2022",
    },
    amenities: ["에어컨", "세탁기", "냉장고", "인터넷", "전자레인지", "TV"],
    includedUtilities: ["가스", "수도", "인터넷", "전기"],
    images: [
      "/property-detail-1.jpg",
      "/property-detail-2.jpg",
      "/property-detail-3.jpg",
      "/property-detail-4.jpg",
      "/property-detail-5.jpg",
      "/property-detail-6.jpg",
    ],
    discounts: {
      longTerm: {
        condition: "4주 이상 계약 시",
        amount: "10% 할인",
      },
      earlyMoveIn: {
        condition: "5일 이내 입주 시",
        amount: "1만원 할인",
      },
    },
    refundPolicy: [
      {
        condition: "입주일 15일 이전",
        refund: "임대료의 80% 환불",
      },
      {
        condition: "입주일 14일 ~ 8일 이전",
        refund: "임대료의 50% 환불",
      },
      {
        condition: "입주일 7일 ~ 1일 이전",
        refund: "임대료의 30% 환불",
      },
      {
        condition: "입주일 당일",
        refund: "환불 불가",
      },
    ],
  }

  const roomOptions = [
    {
      id: 1,
      title: "[Seoul station] 7 minutes walk from Seoul Station, two room",
      capacity: "최대 4명",
      beds: "침대 1개, 더블베드 1개",
      size: "33m²",
      price: 1180000,
      image: "/property-detail-1.jpg",
    },
    {
      id: 2,
      title: "[Seoul station] 5 minutes walk from Seoul Station, studio",
      capacity: "최대 2명",
      beds: "침대 1개",
      size: "25m²",
      price: 850000,
      image: "/property-detail-2.jpg",
    },
    {
      id: 3,
      title: "[Seoul station] 10 minutes walk from Seoul Station, three room",
      capacity: "최대 6명",
      beds: "침대 2개, 더블베드 1개",
      size: "45m²",
      price: 1450000,
      image: "/property-detail-3.jpg",
    },
  ]

  const selectedRoom = roomOptions.find((room) => room.id === selectedRoomId) || roomOptions[0]

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? property.images.length - 1 : prev - 1))
  }

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === property.images.length - 1 ? 0 : prev + 1))
  }

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index)
    setShowAllImages(true)
  }

  const decreaseGuests = () => {
    if (guestCount > 1) {
      setGuestCount(guestCount - 1)
    }
  }

  const increaseGuests = () => {
    if (guestCount < 4) {
      setGuestCount(guestCount + 1)
    }
  }

  const handleRoomSelect = (roomId: number) => {
    setSelectedRoomId(roomId)
  }

  const handleRentRoom = () => {
    setShowUserInfoModal(true)
  }

  const handleUserInfoSubmit = () => {
    setShowUserInfoModal(false)
    router.push(`/payment/${propertyId}?roomId=${selectedRoomId}`)
  }

  const handlePayNow = () => {
    setShowPaymentModal(true)
  }

  const handlePaymentComplete = () => {
    setShowPaymentModal(false)
    // In a real app, you would redirect to a confirmation page
    alert("결제가 완료되었습니다!")
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Image Gallery */}
      <section className="relative bg-gray-100 border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="relative">
            <div className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide">
              {property.images.map((image, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 relative cursor-pointer"
                  onClick={() => handleImageClick(index)}
                >
                  <div className="w-72 h-48 relative rounded-lg overflow-hidden">
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`Property image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              className="absolute right-4 bottom-8 bg-white"
              onClick={() => setShowAllImages(true)}
            >
              <Grid className="h-4 w-4 mr-2" />
              사진 모두 보기
            </Button>
          </div>
        </div>
      </section>

      {/* Property Information */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold mb-4">{property.title}</h1>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <span className="ml-1">{property.rating}</span>
              <span className="text-gray-500 ml-1">({property.reviews} 후기)</span>
            </div>
            <div className="flex items-center">
              <MapPin className="h-5 w-5 text-gray-500" />
              <span className="ml-1">{property.location}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Column - Property Details */}
            <div className="md:col-span-2">
              <div className="flex items-center justify-between p-4 mb-6 border rounded-lg shadow-sm bg-white">
                <div className="flex items-center gap-4">
                  <Image
                    src={property.host.image || "/placeholder.svg?height=50&width=50&query=person"}
                    alt={property.host.name}
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                  <div>
                    <h3 className="font-medium">{property.host.name}</h3>
                    <p className="text-sm text-gray-500">호스트 등록일: {property.host.joinDate}</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="flex items-center gap-2"
                  onClick={() => setShowContactHostModal(true)}
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>호스트와 채팅하기</span>
                </Button>
              </div>

              <div className="prose max-w-none mb-6">
                <h3 className="text-lg font-medium mb-2">호스트의 메시지</h3>
                <p className="whitespace-pre-line text-gray-700">{property.description}</p>
                <Button variant="link" className="p-0 h-auto text-primary">
                  Show more
                </Button>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-medium mb-4">방을 선택하세요</h3>
                <div className="space-y-4">
                  {roomOptions.map((room) => (
                    <div
                      key={room.id}
                      className={cn(
                        "border rounded-lg overflow-hidden cursor-pointer transition-all",
                        selectedRoomId === room.id
                          ? "border-yellow-400 bg-yellow-50"
                          : "border-gray-200 bg-white hover:border-gray-300",
                      )}
                      onClick={() => handleRoomSelect(room.id)}
                    >
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/4 relative">
                          <div className="aspect-[4/3] relative">
                            <Image
                              src={room.image || "/placeholder.svg"}
                              alt={room.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                        </div>
                        <div className="p-4 flex-1">
                          <div className="flex justify-between">
                            <h4 className="font-medium">{room.title}</h4>
                            {selectedRoomId === room.id && (
                              <span className="text-yellow-500 flex items-center">
                                <Check className="h-4 w-4 mr-1" />
                                선택됨
                              </span>
                            )}
                          </div>
                          <div className="grid grid-cols-3 gap-2 mt-2 text-sm text-gray-500">
                            <div className="flex items-center">
                              <User className="h-4 w-4 mr-1" />
                              <span>{room.capacity}</span>
                            </div>
                            <div className="flex items-center">
                              <span>{room.beds}</span>
                            </div>
                            <div className="flex items-center">
                              <span>{room.size}</span>
                            </div>
                          </div>
                          <div className="mt-4 flex justify-between items-center">
                            <div className="font-bold text-lg">
                              ₩{room.price.toLocaleString()}
                              <span className="text-gray-500 text-sm font-normal">/ 월</span>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                variant={selectedRoomId === room.id ? "default" : "outline"}
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleRoomSelect(room.id)
                                }}
                              >
                                {selectedRoomId === room.id ? "선택됨" : "선택하기"}
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  // Handle view details action
                                }}
                              >
                                자세히 보기
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Booking */}
            <div className="border rounded-lg p-6 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <div className="text-2xl font-bold">
                  ₩
                  {(selectedRoomId
                    ? roomOptions.find((r) => r.id === selectedRoomId)?.price || property.price
                    : property.price
                  ).toLocaleString()}
                </div>
                <span className="text-gray-500">/ 월</span>
              </div>

              <div className="mb-6 space-y-4">
                <div
                  className="flex items-center justify-between bg-gray-100 rounded-md p-4 cursor-pointer"
                  onClick={() => setShowCalendar(!showCalendar)}
                >
                  <div className="flex items-center">
                    <CalendarIcon className="h-5 w-5 text-gray-500 mr-2" />
                    <span className="text-gray-700">날짜 선택</span>
                  </div>
                  {selectedStartDate && selectedEndDate ? (
                    <span className="text-sm font-medium">
                      {format(selectedStartDate, "yyyy.MM.dd")} - {format(selectedEndDate, "yyyy.MM.dd")}
                    </span>
                  ) : (
                    <span className="text-sm text-gray-500">날짜를 선택하세요</span>
                  )}
                </div>

                {showCalendar && (
                  <div className="border rounded-md p-2 bg-white shadow-md">
                    <Calendar
                      mode="range"
                      selected={{
                        from: selectedStartDate,
                        to: selectedEndDate,
                      }}
                      onSelect={(range) => {
                        setSelectedStartDate(range?.from)
                        setSelectedEndDate(range?.to)
                        if (range?.to) {
                          setShowCalendar(false)
                        }
                      }}
                      className="rounded-md"
                    />
                  </div>
                )}

                <div className="flex items-center justify-between bg-gray-100 rounded-md p-4">
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
                      disabled={guestCount >= 4}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <Button className="w-full mb-4" onClick={handleRentRoom}>
                방 임대하기
              </Button>

              <div className="mt-6 bg-gray-100 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium text-lg">보증금</h3>
                  <span className="font-bold text-lg">₩0</span>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  한국의 대부분의 집주인은 보증금을 요구하지만 앤코 세입자는 보증금이 면제됩니다.
                </p>

                <h3 className="font-medium mb-2">추가 비용 없음</h3>
                <p className="text-sm text-gray-600">지금 보이는 금액이 실제로 지불하는 금액입니다.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nearby Transportation and Amenities */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-bold mb-6">근처 교통 및 편의시설</h2>

          <div className="h-[300px] bg-gray-100 rounded-lg overflow-hidden mb-4 relative">
            <Image
              src="/seoul-station-map.png"
              alt="Map showing nearby transportation and amenities"
              fill
              className="object-cover"
            />
            <div className="absolute bottom-2 left-2 text-xs text-gray-500">지도 데이터 ©2025 TMap Mobility</div>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <MapPin className="h-5 w-5 text-yellow-500" />
            <span className="font-medium">{property.location}</span>
          </div>

          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>서울역 (1호선,4호선,공항철도)역까지 도보 10분</li>
            <li>편의점, 카페, 식당 도보 5분 이내</li>
            <li>남산공원 도보 15분</li>
          </ul>
        </div>
      </section>

      {/* Contract Information */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">계약 정보</h2>
            <div className="flex items-center text-red-500 text-sm">
              <Info className="h-4 w-4 mr-1" />
              최소 계약 기간 1주
            </div>
          </div>

          {/* Fees */}
          <div className="border-b pb-6 mb-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <h3 className="text-gray-500 text-sm mb-1">임대료 (1주)</h3>
                <p className="font-bold">{property.price.toLocaleString()}원</p>
              </div>
              <div>
                <h3 className="text-gray-500 text-sm mb-1">관리비용 (1주)</h3>
                <p className="font-bold">{property.managementFee.toLocaleString()}원</p>
              </div>
              <div>
                <h3 className="text-gray-500 text-sm mb-1">청소비용 (퇴실 후 청소)</h3>
                <p className="font-bold">{property.cleaningFee.toLocaleString()}원</p>
              </div>
              <div>
                <h3 className="text-gray-500 text-sm mb-1">보증금 (퇴실 후 환급)</h3>
                <p className="font-bold">{property.deposit.toLocaleString()}원</p>
              </div>
            </div>
          </div>

          {/* Discounts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-gray-50 rounded-lg p-5">
              <h3 className="font-medium mb-4">장기계약 할인</h3>
              <div className="border-b border-gray-200 pb-4">
                <div className="flex justify-between">
                  <span>{property.discounts.longTerm.condition}</span>
                  <span className="font-bold">{property.discounts.longTerm.amount}</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-5">
              <h3 className="font-medium mb-4">빠른입주 할인</h3>
              <div className="border-b border-gray-200 pb-4">
                <div className="flex justify-between">
                  <span>{property.discounts.earlyMoveIn.condition}</span>
                  <span className="font-bold">{property.discounts.earlyMoveIn.amount}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Included Utilities */}
          <div className="mb-8 bg-gray-50 rounded-lg p-5">
            <h3 className="font-medium mb-4">관리비 포함항목</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mb-2">
                  <Flame className="h-5 w-5 text-gray-500" />
                </div>
                <span className="text-sm">가스</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mb-2">
                  <Droplet className="h-5 w-5 text-gray-500" />
                </div>
                <span className="text-sm">수도</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mb-2">
                  <Wifi className="h-5 w-5 text-gray-500" />
                </div>
                <span className="text-sm">인터넷</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mb-2">
                  <Zap className="h-5 w-5 text-gray-500" />
                </div>
                <span className="text-sm">전기</span>
              </div>
            </div>

            <div className="mt-4 text-sm text-gray-700">
              <p>
                상하수도요금은 관리비에 포함되어 있습니다. 단, 과도하게 사용하는 경우 추가 관리비를 요청할 수 있습니다.
              </p>
              <p className="text-red-500 mt-1">불포함 : 가스, 전기</p>
            </div>
          </div>

          {/* Refund Policy */}
          <div className="bg-gray-50 rounded-lg p-5">
            <h3 className="font-medium mb-4">환불 규정</h3>
            <div className="space-y-2">
              {property.refundPolicy.map((policy, index) => (
                <div key={index} className="flex justify-between">
                  <span>{policy.condition}</span>
                  <span>{policy.refund}</span>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-4">
              환불금액은 방법에 따라게 적용 될 수 있습니다.
              <br />
              계약 당일 취소시 10% 위약금(90% 환불)이 적용됩니다.
            </p>
          </div>
        </div>
      </section>

      {/* Image Gallery Modal */}
      <Dialog open={showAllImages} onOpenChange={setShowAllImages}>
        <DialogContent className="max-w-5xl w-full h-[90vh] p-0 bg-black">
          <div className="relative h-full flex items-center justify-center">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-white z-10"
              onClick={() => setShowAllImages(false)}
            >
              <X className="h-6 w-6" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 text-white z-10 rounded-full bg-black/50"
              onClick={handlePrevImage}
            >
              <ChevronLeft className="h-8 w-8" />
            </Button>

            <div className="h-full w-full flex items-center justify-center">
              <Image
                src={property.images[currentImageIndex] || "/placeholder.svg"}
                alt={`Property image ${currentImageIndex + 1}`}
                fill
                className="object-contain"
              />
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 text-white z-10 rounded-full bg-black/50"
              onClick={handleNextImage}
            >
              <ChevronRight className="h-8 w-8" />
            </Button>

            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              {property.images.map((_, index) => (
                <button
                  key={index}
                  className={cn("w-2 h-2 rounded-full", currentImageIndex === index ? "bg-white" : "bg-white/50")}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* User Information Modal */}
      <Dialog open={showUserInfoModal} onOpenChange={setShowUserInfoModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-0 top-0"
                onClick={() => setShowUserInfoModal(false)}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              정보를 입력해주세요
              <DialogClose className="absolute right-0 top-0">
                <X className="h-4 w-4" />
              </DialogClose>
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-gray-500 mb-6">
              EnkorStay가 제공하는 모든 서비스를 즐기기 위해 추가 정보를 제공해 주세요.
            </p>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">여권 상 이름</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Input placeholder="이름" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                  </div>
                  <div>
                    <Input placeholder="성" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">성별</h3>
                <Input placeholder="성별" value={gender} onChange={(e) => setGender(e.target.value)} />
                <p className="text-xs text-gray-500 mt-1">여권 상 이름과 일치하는 이름을 입력해 주세요.</p>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">비상 연락처</h3>
                <div className="flex gap-2">
                  <Select value={phoneCountry} onValueChange={setPhoneCountry}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="국가 코드" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="+82">+82 (South Korea)</SelectItem>
                      <SelectItem value="+1">+1 (USA/Canada)</SelectItem>
                      <SelectItem value="+44">+44 (UK)</SelectItem>
                      <SelectItem value="+81">+81 (Japan)</SelectItem>
                      <SelectItem value="+86">+86 (China)</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    placeholder="전화번호"
                    className="flex-1"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  주로 이메일로 소통하지만, 긴급한 상황일 때 연락할 수 있도록 전화번호를 남겨 주세요.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={agreeTerms}
                    onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                  />
                  <label htmlFor="terms" className="text-sm">
                    아래의 모든 약관과 개인정보 처리방침에 동의합니다.
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="privacy"
                    checked={agreePrivacy}
                    onCheckedChange={(checked) => setAgreePrivacy(checked as boolean)}
                  />
                  <label htmlFor="privacy" className="text-sm">
                    (필수) <span className="text-yellow-500">Enkor Stay 약관</span>과{" "}
                    <span className="text-yellow-500">개인정보 처리방침</span>에 동의합니다.
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="marketing"
                    checked={agreeMarketing}
                    onCheckedChange={(checked) => setAgreeMarketing(checked as boolean)}
                  />
                  <label htmlFor="marketing" className="text-sm">
                    (필수) <span className="text-yellow-500">게스트 정책</span>에 동의합니다.
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="news"
                    checked={agreeNews}
                    onCheckedChange={(checked) => setAgreeNews(checked as boolean)}
                  />
                  <label htmlFor="news" className="text-sm">
                    (선택) EnkorStay의 최신 혜택 및 유용한 정보를 먼저 받아보세요.
                  </label>
                </div>
                <p className="text-xs text-gray-500 mt-1">언제든지 My account에서 변경 가능합니다.</p>
              </div>
            </div>
          </div>
          <Button
            className="w-full"
            onClick={handleUserInfoSubmit}
            disabled={!firstName || !lastName || !gender || !phoneNumber || !agreeTerms || !agreePrivacy}
          >
            확인
          </Button>
        </DialogContent>
      </Dialog>

      {/* Chat Modal */}
      <Dialog open={showChatModal} onOpenChange={setShowChatModal}>
        <DialogContent className="sm:max-w-md h-[80vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Image
                src={property.host.image || "/placeholder.svg?height=40&width=40&query=person"}
                alt={property.host.name}
                width={40}
                height={40}
                className="rounded-full"
              />
              <span>{property.host.name}님과 채팅</span>
            </DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-hidden h-full">
            <ChatInterface
              hostName={property.host.name}
              hostImage={property.host.image}
              propertyTitle={property.title}
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* Contact Host Modal */}
      <ContactHostModal
        open={showContactHostModal}
        onClose={() => setShowContactHostModal(false)}
        host={property.host}
        rooms={roomOptions}
        propertyTitle={property.title}
      />
    </main>
  )
}
