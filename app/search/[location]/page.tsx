"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Heart, Star, MapPin, ZoomIn, ZoomOut } from "lucide-react"
import RentalFilters from "@/components/rental-filters"
import { cn } from "@/lib/utils"

interface SearchPageProps {
  params: {
    location: string
  }
}

export default function LocationSearchPage({ params }: SearchPageProps) {
  const { location } = params
  const decodedLocation = decodeURIComponent(location)

  const [mapVisible, setMapVisible] = useState(true)
  const [isMobileView, setIsMobileView] = useState(false)
  const [visibleProperties, setVisibleProperties] = useState(areaProperties)
  const [zoomLevel, setZoomLevel] = useState(1)
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Simulate filtering properties based on map zoom level
  const handleZoomIn = () => {
    const newZoomLevel = Math.min(zoomLevel + 0.5, 3)
    setZoomLevel(newZoomLevel)

    // Filter properties based on zoom level (simulated)
    if (newZoomLevel >= 2) {
      setVisibleProperties(areaProperties.slice(0, Math.ceil(areaProperties.length / 2)))
    }
  }

  const handleZoomOut = () => {
    const newZoomLevel = Math.max(zoomLevel - 0.5, 1)
    setZoomLevel(newZoomLevel)

    // Show all properties when zoomed out
    if (newZoomLevel < 2) {
      setVisibleProperties(areaProperties)
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <RentalFilters />

      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-lg font-medium">
            {decodedLocation}에 숙소 {visibleProperties.length}개
          </h1>
          <Button variant="outline" onClick={() => setMapVisible(!mapVisible)} className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            {mapVisible ? "지도 숨기기" : "지도 보기"}
          </Button>
        </div>

        <div
          className={cn(
            "grid gap-4",
            mapVisible
              ? "grid-cols-1 md:grid-cols-3 lg:grid-cols-5 lg:grid-rows-[auto_1fr]"
              : "grid-cols-1 md:grid-cols-2 lg:grid-cols-5",
          )}
        >
          {/* Map section - spans full width on mobile, right side on desktop */}
          {mapVisible && (
            <div
              className={cn(
                "relative rounded-lg overflow-hidden bg-gray-100 border",
                isMobileView
                  ? "order-1 h-[300px]"
                  : "order-2 md:col-span-2 lg:col-span-3 lg:row-span-2 h-[calc(100vh-220px)] sticky top-[180px]",
              )}
            >
              <div
                className="absolute inset-0 bg-[url('/map-gangnam.png')] bg-cover bg-center"
                style={{ transform: `scale(${zoomLevel})`, transformOrigin: "center" }}
                ref={mapRef}
              >
                {/* Map price markers */}
                <div className="absolute top-1/3 left-1/4 bg-black text-white px-2 py-1 rounded-full text-sm">
                  350,000원
                </div>
                <div className="absolute bottom-1/3 left-1/3 bg-black text-white px-2 py-1 rounded-full text-sm">
                  290,000원 외 <span className="font-bold">24</span>개
                </div>
                <div className="absolute top-1/2 right-1/3 bg-black text-white px-2 py-1 rounded-full text-sm">
                  190,000원
                </div>
                <div className="absolute bottom-1/4 right-1/4 bg-black text-white px-2 py-1 rounded-full text-sm">
                  200,000원
                </div>
              </div>

              {/* Map controls */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <Button size="icon" variant="secondary" onClick={handleZoomIn}>
                  <ZoomIn className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="secondary" onClick={handleZoomOut}>
                  <ZoomOut className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Property listings */}
          <div
            className={cn(
              "space-y-4",
              mapVisible
                ? isMobileView
                  ? "order-2"
                  : "order-1 md:col-span-1 lg:col-span-2"
                : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4",
            )}
          >
            {visibleProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

interface PropertyCardProps {
  property: {
    id: number
    title: string
    subtitle: string
    details: string
    price: number
    originalPrice?: number
    rating: number
    reviews: number
    image: string
  }
}

function PropertyCard({ property }: PropertyCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsFavorite(!isFavorite)
  }

  return (
    <div className="bg-white rounded-lg overflow-hidden border">
      <div className="relative">
        <div className="aspect-[4/3] relative">
          <Image src={property.image || "/placeholder.svg"} alt={property.title} fill className="object-cover" />
        </div>

        {property.originalPrice && (
          <div className="absolute top-2 left-2 bg-gray-800/70 text-white text-xs px-2 py-1 rounded">슈퍼호스트</div>
        )}

        <button
          className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 hover:bg-white"
          onClick={toggleFavorite}
        >
          <Heart className={cn("h-5 w-5", isFavorite ? "fill-red-500 text-red-500" : "text-gray-600")} />
        </button>
      </div>

      <div className="p-3">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-sm">{property.title}</h3>
          <div className="flex items-center">
            <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
            <span className="text-xs ml-1">{property.rating}</span>
            <span className="text-xs text-gray-500 ml-1">({property.reviews})</span>
          </div>
        </div>

        <p className="text-xs text-gray-500 mt-1">{property.subtitle}</p>
        <p className="text-xs text-gray-500 mt-0.5">{property.details}</p>

        <div className="mt-2">
          {property.originalPrice ? (
            <div>
              <span className="line-through text-xs text-gray-500">₩{property.originalPrice.toLocaleString()}</span>
              <span className="font-bold ml-1">₩{property.price.toLocaleString()}</span>
              <span className="text-gray-500 text-xs">/박</span>
            </div>
          ) : (
            <div className="font-bold">
              ₩{property.price.toLocaleString()}
              <span className="text-gray-500 font-normal text-xs">/박</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const areaProperties = [
  {
    id: 1,
    title: "서울구역 아파트",
    subtitle: "강남구 압구정동 3분, 미사거 가기 있음",
    details: "전체 일주 완전",
    price: 843083,
    originalPrice: 927399,
    rating: 4.42,
    reviews: 62,
    image: "/gangnam-apt-1.png",
  },
  {
    id: 2,
    title: "서울구역 집",
    subtitle: "강남구, 한미를 생각하게 하는 고급빌라",
    details: "전체 일주 완전",
    price: 283188,
    rating: 4.65,
    reviews: 26,
    image: "/gangnam-apt-2.png",
  },
  {
    id: 3,
    title: "서울의 아파트",
    subtitle: "강남역에서 도보 5분 #Cozy House",
    details: "스튜디오 전체 1개",
    price: 83822,
    originalPrice: 93654,
    rating: 4.6,
    reviews: 10,
    image: "/gangnam-apt-3.png",
  },
  {
    id: 4,
    title: "강남구역 아파트",
    subtitle: "강남역 7분거리 중심지",
    details: "전체 1개",
    price: 399587,
    rating: 4.8,
    reviews: 40,
    image: "/gangnam-apt-4.png",
  },
  {
    id: 5,
    title: "강남 럭셔리 아파트",
    subtitle: "강남역 3분거리, 고급 인테리어",
    details: "전체 일주 완전",
    price: 350000,
    rating: 4.9,
    reviews: 28,
    image: "/gangnam-apt-5.png",
  },
  {
    id: 6,
    title: "강남 모던 스튜디오",
    subtitle: "신논현역 도보 5분, 깔끔한 원룸",
    details: "스튜디오 전체",
    price: 290000,
    rating: 4.7,
    reviews: 15,
    image: "/gangnam-apt-6.png",
  },
  {
    id: 7,
    title: "압구정 프리미엄 숙소",
    subtitle: "압구정로데오 인접, 쇼핑 최적",
    details: "전체 일주 완전",
    price: 190000,
    rating: 4.5,
    reviews: 32,
    image: "/gangnam-apt-7.png",
  },
  {
    id: 8,
    title: "청담동 럭셔리 레지던스",
    subtitle: "청담역 5분, 고급 주거단지",
    details: "아파트 전체",
    price: 200000,
    rating: 4.85,
    reviews: 22,
    image: "/gangnam-apt-8.png",
  },
]
