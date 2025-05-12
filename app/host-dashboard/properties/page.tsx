"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Search, ChevronLeft, MoreVertical, Edit, MapPin, User, Square, Wifi } from "lucide-react"
import PropertyRegistrationModal from "@/components/property/property-registration-modal"

export default function PropertiesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false)
  const [selectedProperty, setSelectedProperty] = useState<number | null>(1) // 기본적으로 첫 번째 매물 선택

  const properties = [
    {
      id: 1,
      title: "asdfasdf",
      description: "asdasdasdas",
      location: "서울특별시 용산구 이태원로 153 (이태원동) 321",
      price: 132,
      image: "/property-detail-1.jpg",
      status: "운영중",
      minimumStay: 30,
      area: 50,
      units: [
        {
          id: "unit1",
          name: "asdfasdf",
          status: "운영중",
          price: 132,
          deposit: 0,
          maintenanceFee: 0,
          area: 50,
        },
      ],
      facilities: ["공용 화장실 1개", "주방", "세탁기", "에어컨"],
      nearbyFacilities: ["가락시장 (3호선,8호선) · 도보 · 10분"],
      additionalInfo: {
        wifiPassword: "asd",
      },
    },
    {
      id: 2,
      title: "[Seoul station] 7 minutes walk from Seoul Station",
      description: "서울역에서 도보 7분 거리의 편안한 숙소입니다.",
      location: "서울 용산구 한강대로 405",
      price: 150,
      image: "/property-detail-2.jpg",
      status: "운영중",
      minimumStay: 14,
      area: 45,
      units: [],
      facilities: ["전용 화장실 1개", "주방", "세탁기", "에어컨"],
      nearbyFacilities: ["서울역 (1호선,4호선) · 도보 · 7분"],
      additionalInfo: {
        wifiPassword: "seoul123",
      },
    },
  ]

  const openRegistrationModal = () => {
    setIsRegistrationModalOpen(true)
  }

  const closeRegistrationModal = () => {
    setIsRegistrationModalOpen(false)
  }

  const selectedPropertyData = properties.find((p) => p.id === selectedProperty) || properties[0]

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden">
      {/* 왼쪽 패널 - 매물 목록 */}
      <div className="w-1/3 border-r overflow-y-auto p-4 flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">스테이 관리</h1>
          <Button onClick={openRegistrationModal}>매물 등록하기</Button>
        </div>

        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="스테이 이름으로 검색해주세요"
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          {properties.map((property) => (
            <div
              key={property.id}
              className={`p-2 rounded-lg cursor-pointer transition-colors ${
                selectedProperty === property.id ? "bg-blue-50 border-l-4 border-blue-500" : "hover:bg-gray-100"
              }`}
              onClick={() => setSelectedProperty(property.id)}
            >
              <div className="flex items-center gap-3">
                <div className="relative w-16 h-16 rounded overflow-hidden flex-shrink-0">
                  <Image
                    src={property.image || "/placeholder.svg"}
                    alt={property.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">{property.title}</span>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        property.status === "운영중" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {property.status}
                    </span>
                  </div>
                  <div className="flex items-center mt-1">
                    <div className="w-2 h-2 rounded-full bg-green-500 mr-1"></div>
                    <span className="text-xs text-gray-500">1개 호실 운영중</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 오른쪽 패널 - 매물 상세 */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        <div className="mb-4 flex items-center">
          <Button variant="ghost" size="sm" className="mr-2">
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-4 max-w-3xl mx-auto">
          {/* 운영 상태 관리 */}
          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">운영 상태 관리</h3>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
              <div className="mt-2 flex items-center">
                <div className="w-2 h-2 rounded-full bg-green-500 mr-1"></div>
                <span className="text-sm">1개 호실 운영중</span>
              </div>
            </CardContent>
          </Card>

          {/* 스테이 이름 */}
          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">스테이 이름</h3>
                <Button variant="ghost" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
              <p className="mt-2 text-sm">{selectedPropertyData.title}</p>
            </CardContent>
          </Card>

          {/* 스테이 설명 */}
          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">스테이 설명</h3>
                <Button variant="ghost" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
              <p className="mt-2 text-sm">{selectedPropertyData.description}</p>
            </CardContent>
          </Card>

          {/* 호실(세대) */}
          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">호실(세대)</h3>
                <Button variant="outline" size="sm" className="text-xs">
                  추가하기
                </Button>
              </div>

              {selectedPropertyData.units.length > 0 ? (
                <div className="mt-4">
                  {selectedPropertyData.units.map((unit) => (
                    <div key={unit.id} className="mt-2 border rounded-lg p-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="text-xs text-gray-500">현재 입주자가 없습니다.</div>
                          <div className="text-sm mt-1">-</div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="mt-4 flex items-center gap-2">
                        <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center">
                          <Image
                            src="/property-detail-1.jpg"
                            alt="Unit thumbnail"
                            width={64}
                            height={64}
                            className="object-cover rounded-md"
                          />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                            <span className="text-xs">운영중</span>
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <User className="h-3 w-3" />
                            <span className="text-xs">최대인원 2명</span>
                            <Square className="h-3 w-3 ml-2" />
                            <span className="text-xs">{unit.area}m²</span>
                          </div>
                          <div className="mt-1">
                            <span className="font-medium">₩{unit.price}</span>
                            <span className="text-xs text-gray-500">/월</span>
                            <span className="text-xs text-gray-500 ml-1">보증금 ₩{unit.deposit}/월</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mt-4 text-center py-6 border border-dashed rounded-lg">
                  <p className="text-sm text-gray-500">등록된 호실이 없습니다.</p>
                  <p className="text-sm text-gray-500">호실을 추가해주세요.</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* 최소 계약기간 */}
          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">최소 계약기간</h3>
                <Button variant="ghost" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
              <div className="mt-2">
                <ul className="list-disc list-inside">
                  <li className="text-sm">{selectedPropertyData.minimumStay}일</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* 시설 */}
          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">시설</h3>
                <Button variant="ghost" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
              <div className="mt-2">
                <div className="flex items-center gap-1 mb-2">
                  <Image src="/modern-bathroom.png" alt="화장실" width={20} height={20} />
                  <span className="text-sm">{selectedPropertyData.facilities[0]}</span>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div className="flex flex-col items-center justify-center p-2 border rounded-lg">
                    <Image src="/modern-minimalist-kitchen.png" alt="주방" width={24} height={24} />
                    <span className="text-xs mt-1">주방</span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-2 border rounded-lg">
                    <Image src="/modern-washing-machine.png" alt="세탁기" width={24} height={24} />
                    <span className="text-xs mt-1">세탁기</span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-2 border rounded-lg">
                    <Image src="/home-air-conditioner.png" alt="에어컨" width={24} height={24} />
                    <span className="text-xs mt-1">에어컨</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 대표 사진 */}
          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">대표 사진</h3>
                <Button variant="ghost" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
              <div className="mt-4 grid grid-cols-4 gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="aspect-square relative rounded-md overflow-hidden border">
                    <Image
                      src={`/property-detail-${i}.jpg`}
                      alt={`Property image ${i}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 위치 */}
          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">위치</h3>
                <Button variant="ghost" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
              <div className="mt-2 p-3 bg-gray-100 rounded-lg">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{selectedPropertyData.location}</span>
                </div>
              </div>
              <div className="mt-2">
                <ul className="list-disc list-inside">
                  {selectedPropertyData.nearbyFacilities.map((facility, index) => (
                    <li key={index} className="text-sm">
                      {facility}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* 추가정보 */}
          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">추가정보</h3>
                <Button variant="ghost" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
              <div className="mt-4">
                <div className="flex justify-between items-center py-2 border-b">
                  <div className="flex items-center gap-2">
                    <Wifi className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">와이파이 비밀번호</span>
                  </div>
                  <span className="text-sm">{selectedPropertyData.additionalInfo.wifiPassword}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-sm">공동공간 비밀번호</span>
                  <span className="text-sm">asd</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <PropertyRegistrationModal isOpen={isRegistrationModalOpen} onClose={closeRegistrationModal} />
    </div>
  )
}
