"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Building, ChevronRight } from "lucide-react"
import StayDetailsModal from "@/components/stay-details-modal"

export default function MyStaysPage() {
  const [activeTab, setActiveTab] = useState("current")

  // Function to handle "more" button clicks
  const handleViewMore = (tabName: string) => {
    setActiveTab(tabName)
    // Scroll to top to show the tab content
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="w-full max-w-5xl">
      <h1 className="text-2xl font-medium mb-6">내 스테이</h1>

      {/* Custom tabs */}
      <div className="border-b mb-8">
        <div className="flex space-x-8">
          <button
            onClick={() => setActiveTab("current")}
            className={`pb-2 px-1 ${activeTab === "current" ? "border-b-2 border-black font-medium" : "text-gray-500"}`}
          >
            현재 스테이
          </button>
          <button
            onClick={() => setActiveTab("upcoming")}
            className={`pb-2 px-1 ${
              activeTab === "upcoming" ? "border-b-2 border-black font-medium" : "text-gray-500"
            }`}
          >
            예정된 스테이
          </button>
          <button
            onClick={() => setActiveTab("past")}
            className={`pb-2 px-1 ${activeTab === "past" ? "border-b-2 border-black font-medium" : "text-gray-500"}`}
          >
            지난 스테이
          </button>
        </div>
      </div>

      {/* Tab content */}
      {activeTab === "current" && (
        <div>
          <CurrentStaysSection />

          {/* Upcoming stays section */}
          <div className="mt-12">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-medium">예정된 스테이</h2>
              <button
                onClick={() => handleViewMore("upcoming")}
                className="text-sm text-gray-500 hover:text-black flex items-center"
              >
                더보기 <ChevronRight className="h-4 w-4 ml-1" />
              </button>
            </div>
            <div className="space-y-4">
              {upcomingStays.slice(0, 3).map((stay) => (
                <StayCard key={stay.id} stay={stay} />
              ))}
              {upcomingStays.length === 0 && (
                <p className="text-gray-500 text-center py-8">예정된 스테이가 없습니다.</p>
              )}
            </div>
          </div>

          {/* Past stays section */}
          <div className="mt-12">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-medium">지난 스테이</h2>
              <button
                onClick={() => handleViewMore("past")}
                className="text-sm text-gray-500 hover:text-black flex items-center"
              >
                더보기 <ChevronRight className="h-4 w-4 ml-1" />
              </button>
            </div>
            <div className="space-y-4">
              {pastStays.slice(0, 3).map((stay) => (
                <StayCard key={stay.id} stay={stay} />
              ))}
              {pastStays.length === 0 && <p className="text-gray-500 text-center py-8">지난 스테이가 없습니다.</p>}
            </div>
          </div>
        </div>
      )}

      {activeTab === "upcoming" && (
        <div>
          <h2 className="text-xl font-medium mb-4">예정된 스테이</h2>
          <div className="space-y-4">
            {upcomingStays.map((stay) => (
              <StayCard key={stay.id} stay={stay} />
            ))}
            {upcomingStays.length === 0 && <p className="text-gray-500 text-center py-8">예정된 스테이가 없습니다.</p>}
          </div>
        </div>
      )}

      {activeTab === "past" && (
        <div>
          <h2 className="text-xl font-medium mb-4">지난 스테이</h2>
          <div className="space-y-4">
            {pastStays.map((stay) => (
              <StayCard key={stay.id} stay={stay} />
            ))}
            {pastStays.length === 0 && <p className="text-gray-500 text-center py-8">지난 스테이가 없습니다.</p>}
          </div>
        </div>
      )}
    </div>
  )
}

function CurrentStaysSection() {
  return (
    <div>
      <h2 className="text-xl font-medium mb-4">현재 스테이</h2>
      <div className="border border-dashed rounded-lg py-16 flex flex-col items-center justify-center">
        <div className="w-16 h-16 mb-4 flex items-center justify-center">
          <Building className="w-10 h-10 text-gray-300" />
        </div>
        <h3 className="text-xl font-medium mb-2">진행 중인 계약이 아직 없습니다!</h3>
        <p className="text-gray-500 mb-8 max-w-md text-center">
          계약 신청을 완료하면
          <br />
          호스트가 응답할 때까지 계약 상태는 "대기 중"으로 표시됩니다.
        </p>
        <Link href="/rentals">
          <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium px-6 py-2 rounded-lg">
            스테이 탐색
          </Button>
        </Link>
      </div>
    </div>
  )
}

interface Stay {
  id: number
  title: string
  location: string
  dates: string
  image: string
  host: {
    name: string
    email?: string
    image: string
  }
  status: "upcoming" | "past"
  badge?: string
  contractStatus?: "rejected" | "pending" | "approved"
  contractCode?: string
  contractDate?: string
  checkInDate?: string
  checkOutDate?: string
  tenantCount?: number
  totalAmount?: number
}

// Update the StayCard component to show the correct status tag
function StayCard({ stay }: { stay: Stay }) {
  const [showDetailsModal, setShowDetailsModal] = useState(false)

  // Get status text based on contractStatus
  const getStatusText = () => {
    switch (stay.contractStatus) {
      case "rejected":
        return "거절됨"
      case "pending":
        return "대기중"
      case "approved":
        return "승인"
      default:
        return "대기중"
    }
  }

  // Get status color based on contractStatus
  const getStatusColor = () => {
    switch (stay.contractStatus) {
      case "rejected":
        return "text-red-500"
      case "pending":
        return "text-purple-500"
      case "approved":
        return "text-green-500"
      default:
        return "text-gray-500"
    }
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="flex">
        <div className="w-1/4 relative">
          <div className="aspect-square relative">
            <Image src={stay.image || "/placeholder.svg"} alt={stay.title} fill className="object-cover" />
          </div>
        </div>
        <div className="flex-1 p-4">
          <div className="flex items-center mb-1">
            <span className={`text-sm font-medium ${getStatusColor()}`}>{getStatusText()}</span>
            <span className="text-sm text-gray-400 mx-2">•</span>
          </div>

          <h3 className="font-medium text-base mb-1">{stay.title}</h3>
          <p className="text-sm text-gray-500 mb-1">{stay.location}</p>
          <p className="text-sm text-gray-500">{stay.dates}</p>

          <div className="flex items-center mt-3">
            <div className="w-6 h-6 rounded-full overflow-hidden relative mr-2 bg-gray-100">
              <Image src={stay.host.image || "/placeholder.svg"} alt={stay.host.name} fill className="object-cover" />
            </div>
            <span className="text-sm">{stay.host.name}</span>
            <ChevronRight className="w-4 h-4 ml-1" />
          </div>
        </div>
        <div className="w-1/4 p-4 flex flex-col justify-center items-end">
          <Button
            variant="outline"
            size="sm"
            className="mb-2 w-full rounded-lg border-gray-300 hover:bg-gray-50 text-sm font-normal"
            onClick={() => setShowDetailsModal(true)}
          >
            자세히 보기
          </Button>

          <Button variant="outline" size="sm" className="w-full text-gray-500 hover:text-black text-sm font-normal">
            {stay.status === "upcoming" ? "문서 발급" : "문서 발급"}
          </Button>
        </div>
      </div>

      {showDetailsModal && <StayDetailsModal stay={stay} onClose={() => setShowDetailsModal(false)} />}
    </div>
  )
}

// Update the sample data with more examples for each status
// Sample data
const upcomingStays: Stay[] = [
  {
    id: 1,
    title: "[5 mins to Gerong Station] gerong stay",
    location: "Gerong Stay",
    dates: "Dec 9, 2026 - Dec 23, 2026",
    image: "/property-detail-1.jpg",
    host: {
      name: "Jin Choi",
      email: "jjchoi450312k@daum.net",
      image: "/host-profile.png",
    },
    status: "upcoming",
    contractStatus: "pending",
    contractCode: "ST7A7F161523",
    contractDate: "May 9, 2025",
    checkInDate: "Dec 9, 2026",
    checkOutDate: "Dec 23, 2026",
    tenantCount: 1,
    totalAmount: 20276,
  },
  {
    id: 2,
    title: "[Hongdae] 5 minutes to Hongik University Station",
    location: "Hongdae Stay",
    dates: "Jan 15, 2027 - Feb 15, 2027",
    image: "/property-detail-2.jpg",
    host: {
      name: "Min Park",
      email: "min.park@example.com",
      image: "/korean-woman-portrait.png",
    },
    status: "upcoming",
    contractStatus: "approved",
    contractCode: "ST8B9C271634",
    contractDate: "Jun 12, 2025",
    checkInDate: "Jan 15, 2027",
    checkOutDate: "Feb 15, 2027",
    tenantCount: 2,
    totalAmount: 35000,
  },
  {
    id: 3,
    title: "[Gangnam] Luxury Studio near Gangnam Station",
    location: "Gangnam Residence",
    dates: "Mar 1, 2027 - Apr 1, 2027",
    image: "/property-detail-3.jpg",
    host: {
      name: "Soo Kim",
      email: "soo.kim@example.com",
      image: "/korean-man-portrait.png",
    },
    status: "upcoming",
    contractStatus: "rejected",
    contractCode: "ST9D0E381745",
    contractDate: "Jul 20, 2025",
    checkInDate: "Mar 1, 2027",
    checkOutDate: "Apr 1, 2027",
    tenantCount: 1,
    totalAmount: 42000,
  },
]

const pastStays: Stay[] = [
  {
    id: 4,
    title: "[5 mins to Gerong Station] gerong stay",
    location: "Gerong Stay",
    dates: "Nov 10, 2026 - Nov 24, 2026",
    image: "/property-detail-4.jpg",
    host: {
      name: "Jin Choi",
      email: "jjchoi450312k@daum.net",
      image: "/host-profile.png",
    },
    status: "past",
    contractStatus: "rejected",
    contractCode: "ST6D58FA1A74",
    contractDate: "May 9, 2025",
    checkInDate: "Nov 10, 2026",
    checkOutDate: "Nov 24, 2026",
    tenantCount: 1,
    totalAmount: 20276,
  },
  {
    id: 5,
    title: "[Seoul station] 7 minutes walk from Seoul Station",
    location: "Seoul, Yongsan-gu",
    dates: "Oct 5, 2026 - Oct 20, 2026",
    image: "/property-detail-5.jpg",
    host: {
      name: "Joy SEO",
      email: "joy.seo@example.com",
      image: "/korean-woman-portrait.png",
    },
    status: "past",
    contractStatus: "approved",
    contractCode: "ST7A7F161523",
    contractDate: "May 9, 2025",
    checkInDate: "Oct 5, 2026",
    checkOutDate: "Oct 20, 2026",
    tenantCount: 1,
    totalAmount: 20276,
  },
  {
    id: 6,
    title: "[Itaewon] Cozy Studio in the Heart of Itaewon",
    location: "Itaewon, Yongsan-gu",
    dates: "Sep 1, 2026 - Sep 30, 2026",
    image: "/property-detail-6.jpg",
    host: {
      name: "Hyun Lee",
      email: "hyun.lee@example.com",
      image: "/korean-man-portrait.png",
    },
    status: "past",
    contractStatus: "pending",
    contractCode: "ST5C47E90963",
    contractDate: "Apr 15, 2025",
    checkInDate: "Sep 1, 2026",
    checkOutDate: "Sep 30, 2026",
    tenantCount: 2,
    totalAmount: 28500,
  },
]
