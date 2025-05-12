"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Search, CalendarIcon, MapPin } from "lucide-react"
import { format } from "date-fns"
import { ko } from "date-fns/locale"
import PropertyCard from "@/components/property-card"
import LocationCard from "@/components/location-card"

export default function Home() {
  const router = useRouter()
  const [startDate, setStartDate] = useState<Date | undefined>(undefined)
  const [endDate, setEndDate] = useState<Date | undefined>(undefined)
  const [location, setLocation] = useState<string>("")
  const [housingType, setHousingType] = useState<string>("")

  // Housing type options
  const housingTypes = ["스튜디오", "원룸", "투룸", "쉐어하우스"]

  // Popular locations
  const popularLocations = ["강남", "홍대", "이태원", "잠실", "신촌", "강북"]

  const handleSearch = () => {
    const params = new URLSearchParams()

    if (location) {
      params.set("location", location)
    }

    if (housingType) {
      params.set("type", housingType)
    }

    if (startDate && endDate) {
      params.set("checkIn", format(startDate, "yyyy-MM-dd"))
      params.set("checkOut", format(endDate, "yyyy-MM-dd"))
    }

    router.push(`/rentals?${params.toString()}`)
  }

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-[#2d2a4a] text-white py-16 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-6">No Stress, No Worries</h1>
        </div>
      </section>

      {/* Search Filters */}
      <div className="bg-white border-b sticky top-16 z-30">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between py-2 gap-2">
            <div className="flex flex-wrap items-center gap-2">
              {/* Housing Type Filter */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="border rounded-none h-10">
                    주거 형태
                    {housingType && <span className="ml-2 text-primary">{housingType}</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-56 p-2" align="start">
                  <div className="grid gap-1">
                    {housingTypes.map((type) => (
                      <Button
                        key={type}
                        variant={housingType === type ? "default" : "ghost"}
                        className="justify-start"
                        onClick={() => setHousingType(type)}
                      >
                        {type}
                      </Button>
                    ))}
                    {housingType && (
                      <Button
                        variant="ghost"
                        className="justify-start text-gray-500"
                        onClick={() => setHousingType("")}
                      >
                        초기화
                      </Button>
                    )}
                  </div>
                </PopoverContent>
              </Popover>

              {/* Location Filter */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="border rounded-none h-10">
                    <span>지역: 주변으로 검색</span>
                    {location && <span className="ml-2 text-primary">{location}</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-72 p-3" align="start">
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 text-gray-500 mr-2" />
                        <Input
                          placeholder="지역명, 지하철역으로 검색"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          className="flex-1"
                        />
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium mb-2">인기 지역</h3>
                      <div className="flex flex-wrap gap-2">
                        {popularLocations.map((loc) => (
                          <Button key={loc} variant="outline" size="sm" onClick={() => setLocation(loc)}>
                            {loc}
                          </Button>
                        ))}
                      </div>
                    </div>

                    {location && (
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-gray-500"
                        onClick={() => setLocation("")}
                      >
                        지역 선택 초기화
                      </Button>
                    )}
                  </div>
                </PopoverContent>
              </Popover>

              {/* Date Range Filter */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="border rounded-none h-10">
                    <span>입주일 ~ 퇴거일</span>
                    {startDate && endDate && (
                      <span className="ml-2 text-primary">
                        {format(startDate, "MM.dd")} ~ {format(endDate, "MM.dd")}
                      </span>
                    )}
                    <CalendarIcon className="ml-2 h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="range"
                    selected={{
                      from: startDate,
                      to: endDate,
                    }}
                    onSelect={(range) => {
                      setStartDate(range?.from)
                      setEndDate(range?.to)
                    }}
                    locale={ko}
                    className="rounded-md border"
                  />
                </PopoverContent>
              </Popover>

              <Button variant="outline" className="border rounded-none h-10">
                옵션
              </Button>
            </div>

            <Button className="h-10" onClick={handleSearch}>
              <Search className="h-4 w-4 mr-2" />
              검색
            </Button>
          </div>
        </div>
      </div>

      {/* Featured Properties */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">인기매물</h2>
            <Button variant="outline" size="sm" onClick={() => router.push("/rentals")}>
              <MapPin className="h-4 w-4 mr-2" />
              지도로 검색
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Locations */}
      <section className="py-12 border-t">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">
            Rent Around The <span className="text-black">Korea</span>
          </h2>
          <p className="mb-8 text-gray-600">
            Find apartments for rent in over 60 countries worldwide using our convenient search.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {locations.map((location) => (
              <LocationCard
                key={location.id}
                location={location}
                onClick={() => {
                  setLocation(location.name)
                  handleSearch()
                }}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

const featuredProperties = [
  {
    id: 1,
    title: "해에하우스-원룸 기준 룸쉐어 중&여-미공개",
    subtitle: "Dorm Only | 5 mins to Hongdae",
    details: "전체 일주 완전",
    price: 670000,
    rating: 4.5,
    reviews: 3,
    image: "/modern-korean-bedroom.png",
  },
  {
    id: 2,
    title: "해에하우스-원룸 기준 룸쉐어 중&여-미공개",
    subtitle: "Dorm Only | 5 mins to Hongdae",
    details: "전체 일주 완전",
    price: 670000,
    rating: 4.2,
    reviews: 5,
    image: "/korean-apartment-bedroom.png",
  },
  {
    id: 3,
    title: "해에하우스-원룸 기준 룸쉐어 중&여-미공개",
    subtitle: "Dorm Only | 5 mins to Hongdae",
    details: "전체 일주 완전",
    price: 670000,
    rating: 4.7,
    reviews: 8,
    image: "/bright-korean-bedroom.png",
  },
  {
    id: 4,
    title: "해에하우스-원룸 기준 룸쉐어 중&여-미공개",
    subtitle: "Dorm Only | 5 mins to Hongdae",
    details: "전체 일주 완전",
    price: 670000,
    rating: 4.3,
    reviews: 6,
    image: "/cozy-korean-bedroom.png",
  },
  {
    id: 5,
    title: "해에하우스-원룸 기준 룸쉐어 중&여-미공개",
    subtitle: "Dorm Only | 5 mins to Hongdae",
    details: "전체 일주 완전",
    price: 670000,
    rating: 4.8,
    reviews: 4,
    image: "/modern-korean-living-room.png",
  },
]

const locations = [
  {
    id: 1,
    name: "강남",
    image: "/gangnam-seoul-skyline.png",
  },
  {
    id: 2,
    name: "홍대",
    image: "/hongdae-street-scene.png",
  },
  {
    id: 3,
    name: "이태원",
    image: "/itaewon-seoul.png",
  },
  {
    id: 4,
    name: "잠실",
    image: "/jamsil-seoul.png",
  },
  {
    id: 5,
    name: "신촌",
    image: "/sinchon-seoul.png",
  },
  {
    id: 6,
    name: "강북",
    image: "/placeholder.svg?height=200&width=300&query=Gangbuk Seoul district",
  },
]
