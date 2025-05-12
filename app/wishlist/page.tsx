"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Heart, Star, MapPin, MoreHorizontal, Search, Trash2, FolderPlus, Share2, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface WishlistProperty {
  id: number
  title: string
  subtitle: string
  location: string
  price: number
  originalPrice?: number
  rating: number
  reviews: number
  image: string
  category: string
}

export default function WishlistPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeCategory, setActiveCategory] = useState<string>("all")
  const [wishlistItems, setWishlistItems] = useState<WishlistProperty[]>(sampleWishlistItems)

  // Filter properties based on search term and active category
  const filteredProperties = wishlistItems.filter(
    (property) =>
      (activeCategory === "all" || property.category === activeCategory) &&
      (property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.location.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  // Get unique categories for the tabs
  const categories = ["all", ...new Set(wishlistItems.map((item) => item.category))]

  // Remove property from wishlist
  const removeFromWishlist = (id: number) => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== id))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">위시리스트</h1>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="relative w-full md:w-auto md:min-w-[300px]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="위시리스트 검색"
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory} className="w-full md:w-auto">
          <TabsList className="grid grid-cols-3 md:grid-cols-5 w-full md:w-auto">
            <TabsTrigger value="all" className="text-sm">
              전체 ({wishlistItems.length})
            </TabsTrigger>
            <TabsTrigger value="seoul" className="text-sm">
              서울
            </TabsTrigger>
            <TabsTrigger value="busan" className="text-sm">
              부산
            </TabsTrigger>
            <TabsTrigger value="jeju" className="text-sm">
              제주
            </TabsTrigger>
            <TabsTrigger value="other" className="text-sm">
              기타
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {filteredProperties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProperties.map((property) => (
            <WishlistCard key={property.id} property={property} onRemove={removeFromWishlist} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
            <Heart className="h-8 w-8 text-gray-400" />
          </div>
          <h2 className="text-xl font-medium mb-2">위시리스트가 비어 있습니다</h2>
          <p className="text-gray-500 mb-6">마음에 드는 숙소를 찾아 하트 아이콘을 클릭하여 저장해보세요.</p>
          <Link href="/rentals">
            <Button>숙소 둘러보기</Button>
          </Link>
        </div>
      )}
    </div>
  )
}

interface WishlistCardProps {
  property: WishlistProperty
  onRemove: (id: number) => void
}

function WishlistCard({ property, onRemove }: WishlistCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="relative bg-white rounded-lg overflow-hidden border transition-all hover:shadow-md"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/property/${property.id}`}>
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={property.image || "/placeholder.svg"}
            alt={property.title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
          {property.originalPrice && (
            <div className="absolute top-2 left-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded">특가</div>
          )}
          <div
            className={cn(
              "absolute inset-0 bg-black/20 flex items-center justify-center transition-opacity",
              isHovered ? "opacity-100" : "opacity-0",
            )}
          >
            <Button variant="secondary" size="sm" className="opacity-90">
              자세히 보기
            </Button>
          </div>
        </div>
      </Link>

      <div className="absolute top-2 right-2 flex gap-1">
        <Button
          variant="secondary"
          size="icon"
          className="h-8 w-8 rounded-full bg-white/90 hover:bg-white"
          onClick={(e) => {
            e.stopPropagation()
            onRemove(property.id)
          }}
        >
          <X className="h-4 w-4 text-gray-700" />
        </Button>
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
        <div className="flex items-center text-xs text-gray-500 mt-1">
          <MapPin className="h-3 w-3 mr-1" />
          <span>{property.location}</span>
        </div>

        <div className="mt-2 flex justify-between items-center">
          <div>
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

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onRemove(property.id)} className="text-red-500 cursor-pointer">
                <Trash2 className="h-4 w-4 mr-2" />
                위시리스트에서 삭제
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <FolderPlus className="h-4 w-4 mr-2" />
                다른 위시리스트에 추가
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Share2 className="h-4 w-4 mr-2" />
                공유하기
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}

// Sample wishlist data
const sampleWishlistItems: WishlistProperty[] = [
  {
    id: 1,
    title: "서울구역 아파트",
    subtitle: "강남구 압구정동 3분, 미사거 가기 있음",
    location: "서울 강남구",
    price: 843083,
    originalPrice: 927399,
    rating: 4.42,
    reviews: 62,
    image: "/gangnam-apt-1.png",
    category: "seoul",
  },
  {
    id: 2,
    title: "서울구역 집",
    subtitle: "강남구, 한미를 생각하게 하는 고급빌라",
    location: "서울 강남구",
    price: 283188,
    rating: 4.65,
    reviews: 26,
    image: "/gangnam-apt-2.png",
    category: "seoul",
  },
  {
    id: 3,
    title: "해에하우스-원룸 기준 룸쉐어 중&여-미공개",
    subtitle: "Dorm Only | 5 mins to Hongdae",
    location: "서울 마포구",
    price: 670000,
    rating: 4.5,
    reviews: 3,
    image: "/modern-korean-bedroom.png",
    category: "seoul",
  },
  {
    id: 4,
    title: "부산 해운대 오션뷰 숙소",
    subtitle: "부산시 해운대구 해운대해수욕장 도보 10분",
    location: "부산 해운대구",
    price: 850000,
    rating: 4.7,
    reviews: 15,
    image: "/korean-house-1.jpg",
    category: "busan",
  },
  {
    id: 5,
    title: "부산 광안리 바다뷰 레지던스",
    subtitle: "광안대교가 보이는 프리미엄 숙소",
    location: "부산 수영구",
    price: 750000,
    rating: 4.9,
    reviews: 28,
    image: "/korean-house-2.jpg",
    category: "busan",
  },
  {
    id: 6,
    title: "제주 서귀포 한옥 스테이",
    subtitle: "제주 전통 한옥에서의 특별한 경험",
    location: "제주 서귀포시",
    price: 450000,
    originalPrice: 500000,
    rating: 4.8,
    reviews: 42,
    image: "/korean-house-3.png",
    category: "jeju",
  },
  {
    id: 7,
    title: "제주 애월 오션뷰 풀빌라",
    subtitle: "제주 바다가 보이는 프라이빗 풀빌라",
    location: "제주 제주시 애월읍",
    price: 980000,
    rating: 4.95,
    reviews: 36,
    image: "/korean-house-4.png",
    category: "jeju",
  },
  {
    id: 8,
    title: "경주 한옥 스테이",
    subtitle: "경주 역사 지구 인근 전통 한옥",
    location: "경북 경주시",
    price: 320000,
    rating: 4.7,
    reviews: 19,
    image: "/korean-house-5.png",
    category: "other",
  },
]
