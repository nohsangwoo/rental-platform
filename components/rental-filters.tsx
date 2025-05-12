"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Search, CalendarIcon, MapPin } from "lucide-react"
import { ko } from "date-fns/locale"
import { format } from "date-fns"

interface RentalFiltersProps {
  onLocationChange?: (location: string | null) => void
}

export default function RentalFilters({ onLocationChange }: RentalFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [startDate, setStartDate] = useState<Date | undefined>(undefined)
  const [endDate, setEndDate] = useState<Date | undefined>(undefined)
  const [location, setLocation] = useState<string>(searchParams.get("location") || "")
  const [housingType, setHousingType] = useState<string>(searchParams.get("type") || "")

  // Housing type options
  const housingTypes = ["스튜디오", "원룸", "투룸", "쉐어하우스"]

  // Popular locations
  const popularLocations = ["강남", "홍대", "이태원", "잠실", "신촌", "강북"]

  // Initialize dates from URL params if available
  useEffect(() => {
    const checkIn = searchParams.get("checkIn")
    const checkOut = searchParams.get("checkOut")

    if (checkIn) {
      setStartDate(new Date(checkIn))
    }

    if (checkOut) {
      setEndDate(new Date(checkOut))
    }
  }, [searchParams])

  useEffect(() => {
    // Call the callback when location changes
    if (onLocationChange) {
      onLocationChange(location || null)
    }
  }, [location, onLocationChange])

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString())

    if (location) {
      params.set("location", location)
    } else {
      params.delete("location")
    }

    if (housingType) {
      params.set("type", housingType)
    } else {
      params.delete("type")
    }

    if (startDate && endDate) {
      params.set("checkIn", format(startDate, "yyyy-MM-dd"))
      params.set("checkOut", format(endDate, "yyyy-MM-dd"))
    } else {
      params.delete("checkIn")
      params.delete("checkOut")
    }

    router.push(`/rentals?${params.toString()}`)
  }

  const handleLocationSelect = (loc: string) => {
    setLocation(loc)
    if (onLocationChange) {
      onLocationChange(loc)
    }
  }

  return (
    <div className="sticky top-16 z-30 bg-white border-b">
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
                    <Button variant="ghost" className="justify-start text-gray-500" onClick={() => setHousingType("")}>
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
                        <Button key={loc} variant="outline" size="sm" onClick={() => handleLocationSelect(loc)}>
                          {loc}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {location && (
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-gray-500"
                      onClick={() => handleLocationSelect("")}
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

            <Button variant="outline" className="border rounded-none h-10">
              편의옵션
            </Button>
          </div>

          <Button className="h-10" onClick={handleSearch}>
            <Search className="h-4 w-4 mr-2" />
            검색
          </Button>
        </div>
      </div>
    </div>
  )
}
