"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import PropertyCard from "@/components/property-card"
import SearchFilters from "@/components/search-filters"

export default function SearchPage() {
  const [viewMode, setViewMode] = useState<"list" | "map">("list")

  return (
    <main>
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">매물 검색 - 지역검색 설정</h1>
          <div className="flex gap-2">
            <Button variant={viewMode === "list" ? "default" : "outline"} onClick={() => setViewMode("list")}>
              리스트뷰
            </Button>
            <Button variant={viewMode === "map" ? "default" : "outline"} onClick={() => setViewMode("map")}>
              지도뷰
            </Button>
          </div>
        </div>

        <SearchFilters />

        <div className="mt-6">
          {viewMode === "list" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="relative w-full h-[600px] bg-gray-100 rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=1000&query=seoul map')] bg-cover bg-center">
                {/* Map price markers */}
                <div className="absolute top-1/2 left-1/4 bg-black text-white px-2 py-1 rounded-full text-sm">
                  290,000원
                </div>
                <div className="absolute top-1/3 left-1/3 bg-black text-white px-2 py-1 rounded-full text-sm">
                  190,000원 외 24개
                </div>
                <div className="absolute top-1/4 right-1/3 bg-black text-white px-2 py-1 rounded-full text-sm">
                  350,000원
                </div>
                <div className="absolute bottom-1/3 right-1/4 bg-black text-white px-2 py-1 rounded-full text-sm">
                  200,000원
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

const properties = [
  {
    id: 1,
    title: "전주 Yeonja-gu",
    location: "Room | 7일",
    price: 220000,
    rating: 4.5,
    reviews: 3,
    image: "/placeholder.svg?height=300&width=400&query=korean traditional house exterior",
  },
  {
    id: 2,
    title: "한옥 명품숙",
    location: "Room | 7일",
    price: 180000,
    rating: 4.8,
    reviews: 5,
    image: "/placeholder.svg?height=300&width=400&query=modern korean house with garden",
  },
  {
    id: 3,
    title: "한국 기록관",
    location: "Room | 7일",
    price: 150000,
    rating: 4.0,
    reviews: 2,
    image: "/placeholder.svg?height=300&width=400&query=korean countryside house",
  },
  {
    id: 4,
    title: "한국 Yangpyeong-myeon, Yanggu",
    location: "Room | 7일",
    price: 250000,
    rating: 4.6,
    reviews: 8,
    image: "/placeholder.svg?height=300&width=400&query=korean mountain house with view",
  },
  {
    id: 5,
    title: "한국 Cheonwon-gun",
    location: "Room | 7일",
    price: 190000,
    rating: 4.7,
    reviews: 6,
    image: "/placeholder.svg?height=300&width=400&query=korean rural house",
  },
  {
    id: 6,
    title: "한국 분당",
    location: "Room | 7일",
    price: 280000,
    rating: 4.9,
    reviews: 12,
    image: "/placeholder.svg?height=300&width=400&query=modern korean apartment exterior",
  },
]
