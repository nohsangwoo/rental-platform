"use client"

import { useState, useEffect, useRef } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { MapPin, ZoomIn, ZoomOut, X } from "lucide-react"
import RentalFilters from "@/components/rental-filters"
import PropertyCard from "@/components/property-card"
import { cn } from "@/lib/utils"
import { useInView } from "react-intersection-observer"
import Head from "next/head"

// 카카오맵 타입 정의
declare global {
  interface Window {
    kakao: any
    kakaoMapCallback: (() => void) | null
  }
}

export default function RentalsPage() {
  const searchParams = useSearchParams()
  const location = searchParams.get("location")

  const [mapVisible, setMapVisible] = useState(!!location)
  const [properties, setProperties] = useState(rentalProperties.slice(0, 10))
  const [zoomLevel, setZoomLevel] = useState(3)
  const [loading, setLoading] = useState(false)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [map, setMap] = useState<any>(null)
  const mapRef = useRef<HTMLDivElement>(null)

  const { ref: loadMoreRef, inView } = useInView()

  // Get filtered properties based on location
  const filteredProperties = location
    ? properties.filter(
        (p) =>
          p.subtitle.toLowerCase().includes(location.toLowerCase()) ||
          p.title.toLowerCase().includes(location.toLowerCase()),
      )
    : properties

  // 카카오맵 스크립트 로드
  useEffect(() => {
    // 이미 로드된 경우 스킵
    if (window.kakao && window.kakao.maps) {
      setMapLoaded(true)
      return
    }

    // 카카오맵 콜백 함수 정의
    window.kakaoMapCallback = () => {
      console.log("Kakao map script loaded")
      setMapLoaded(true)
    }

    // 스크립트 엘리먼트 생성 및 추가
    const script = document.createElement("script")
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&libraries=services&autoload=false`
    script.onload = () => {
      window.kakao.maps.load(window.kakaoMapCallback)
    }
    document.head.appendChild(script)

    return () => {
      // 클린업
      if (window.kakaoMapCallback) {
        window.kakaoMapCallback = null
      }
    }
  }, [])

  // 지도 초기화
  useEffect(() => {
    if (!mapLoaded || !mapVisible || !mapRef.current || !window.kakao || !window.kakao.maps) {
      return
    }
    
    try {
      // 지도 엘리먼트 크기 확인
      const mapContainer = mapRef.current
      console.log("Map container size:", mapContainer.offsetWidth, mapContainer.offsetHeight)
      
      if (mapContainer.offsetWidth === 0 || mapContainer.offsetHeight === 0) {
        console.warn("Map container has zero size!")
        // 컨테이너에 명시적 크기 설정
        mapContainer.style.width = "500px"
        mapContainer.style.height = "400px"
      }
      
      const options = {
        center: new window.kakao.maps.LatLng(37.5665, 126.9780), // 서울 중심 좌표
        level: zoomLevel
      }

      // 지도 객체 생성
      const kakaoMap = new window.kakao.maps.Map(mapContainer, options)
      console.log("Kakao map created successfully")
      setMap(kakaoMap)

      // 지도 크기 재설정 (화면에 맞게 다시 렌더링)
      window.kakao.maps.event.addListener(kakaoMap, 'tilesloaded', function() {
        kakaoMap.relayout()
      })

      // 주소-좌표 변환 객체 생성
      const geocoder = new window.kakao.maps.services.Geocoder()

      // 지도 중심 위치 설정 (위치 검색어가 있는 경우)
      if (location) {
        // 주소로 좌표 검색
        geocoder.addressSearch(location, function(result: any, status: any) {
          // 정상적으로 검색이 완료됐으면
          if (status === window.kakao.maps.services.Status.OK) {
            const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x)
            
            // 결과값으로 받은 위치를 지도의 중심으로 설정
            kakaoMap.setCenter(coords)
            
            // 마커 표시
            const marker = new window.kakao.maps.Marker({
              map: kakaoMap,
              position: coords
            })
            
            // 인포윈도우로 장소에 대한 설명 표시
            const infowindow = new window.kakao.maps.InfoWindow({
              content: `<div style="width:150px;text-align:center;padding:6px 0;">${location}</div>`
            })
            infowindow.open(kakaoMap, marker)
          } else {
            // 주소 검색 실패 시 기본 위치 설정
            let newCenter
            
            if (location.includes("이태원")) {
              newCenter = new window.kakao.maps.LatLng(37.5340, 126.9940)
            } else if (location.includes("강남")) {
              newCenter = new window.kakao.maps.LatLng(37.4980, 127.0280)
            } else if (location.includes("홍대")) {
              newCenter = new window.kakao.maps.LatLng(37.5570, 126.9240)
            } else {
              newCenter = new window.kakao.maps.LatLng(37.5665, 126.9780)
            }
            
            kakaoMap.setCenter(newCenter)
          }
        })
      }

      // 필터링된 속성 기반으로 마커 추가
      if (filteredProperties.length > 0) {
        filteredProperties.forEach(property => {
          // 속성에 따라 위치 지정 (여기서는 임의 위치를 사용하고 있으며, 실제 구현에서는 위도/경도 데이터가 필요함)
          let position
          
          if (property.subtitle.includes("이태원")) {
            position = new window.kakao.maps.LatLng(37.5340, 126.9940) // 이태원 대략적 위치
          } else if (property.subtitle.includes("강남")) {
            position = new window.kakao.maps.LatLng(37.4980, 127.0280) // 강남 대략적 위치
          } else if (property.subtitle.includes("홍대")) {
            position = new window.kakao.maps.LatLng(37.5570, 126.9240) // 홍대 대략적 위치
          } else {
            // 기본 위치 (서울 중심부에서 약간 랜덤하게)
            const lat = 37.5665 + (Math.random() - 0.5) * 0.02
            const lng = 126.9780 + (Math.random() - 0.5) * 0.02
            position = new window.kakao.maps.LatLng(lat, lng)
          }

          // 커스텀 오버레이 생성
          const content = `<div class="bg-black text-white px-2 py-1 rounded-full text-sm shadow-lg whitespace-nowrap">${property.price.toLocaleString()}원</div>`
          
          const customOverlay = new window.kakao.maps.CustomOverlay({
            position: position,
            content: content,
            yAnchor: 1
          })
          
          customOverlay.setMap(kakaoMap)
        })
      }

      // 지도 컨트롤 추가
      const zoomControl = new window.kakao.maps.ZoomControl()
      kakaoMap.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT)
    } catch (error) {
      console.error("카카오맵 초기화 오류:", error)
    }
  }, [mapLoaded, mapVisible, zoomLevel, location, filteredProperties])

  // Load more properties when scrolling to the bottom
  useEffect(() => {
    if (inView && !loading) {
      loadMoreProperties()
    }
  }, [inView])

  const loadMoreProperties = () => {
    setLoading(true)
    // Simulate loading delay
    setTimeout(() => {
      const currentLength = properties.length
      const nextProperties = rentalProperties.slice(currentLength, currentLength + 6)

      if (nextProperties.length > 0) {
        setProperties([...properties, ...nextProperties])
      }

      setLoading(false)
    }, 800)
  }

  const handleZoomIn = () => {
    if (map) {
      const level = map.getLevel()
      map.setLevel(level - 1)
      setZoomLevel(level - 1)
    }
  }

  const handleZoomOut = () => {
    if (map) {
      const level = map.getLevel()
      map.setLevel(level + 1)
      setZoomLevel(level + 1)
    }
  }

  const toggleMap = () => {
    setMapVisible(!mapVisible)
  }
  
  console.log("process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY: ",process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY)

  return (
    <main className="min-h-screen bg-gray-50">
      <RentalFilters onLocationChange={(loc) => setMapVisible(!!loc)} />

      <div className="container mx-auto px-4 py-6">
        {location && (
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-lg font-medium">
              {location}에 숙소 {filteredProperties.length}개
            </h1>
            <Button variant="outline" onClick={toggleMap} className="flex items-center gap-2">
              {mapVisible ? (
                <>
                  <X className="h-4 w-4" />
                  지도 닫기
                </>
              ) : (
                <>
                  <MapPin className="h-4 w-4" />
                  지도 보기
                </>
              )}
            </Button>
          </div>
        )}

        <div className="flex transition-all duration-500 ease-in-out">
          {/* Property listings section */}
          <div
            className={cn(
              "grid gap-4 transition-all duration-500 ease-in-out",
              mapVisible ? "w-3/5 grid-cols-2" : "w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5",
            )}
          >
            {filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}

            {/* Loading indicator */}
            <div ref={loadMoreRef} className="col-span-full flex justify-center py-8">
              {loading && (
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 border-4 border-gray-300 border-t-primary rounded-full animate-spin"></div>
                  <p className="mt-2 text-sm text-gray-500">더 많은 매물 불러오는 중...</p>
                </div>
              )}
            </div>
          </div>

          {/* 카카오 맵 섹션 */}
          {mapVisible && (
            <div
              className="w-2/5 ml-4 h-[calc(100vh-220px)] sticky top-[180px] rounded-lg overflow-hidden border transition-all duration-500 ease-in-out transform translate-x-0"
              style={{
                opacity: mapVisible ? 1 : 0,
                transform: mapVisible ? "translateX(0)" : "translateX(100%)",
              }}
            >
              <div className="relative w-full h-full">
                <div
                  id="map"
                  className="absolute inset-0 bg-gray-100 w-full h-full"
                  style={{ width: '100%', height: '100%' }}
                  ref={mapRef}
                />

                {/* 커스텀 맵 컨트롤 (카카오맵 기본 컨트롤 외에 추가 기능이 필요한 경우) */}
                <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
                  <Button size="icon" variant="secondary" onClick={handleZoomIn}>
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="secondary" onClick={handleZoomOut}>
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

const rentalProperties = [
  {
    id: 1,
    title: "서울구역 아파트",
    subtitle: "Js#9- 강남 시내까지 3분, 마사지 가기 있음",
    details: "전용 일주 공간",
    price: 1843083,
    originalPrice: 2027399,
    rating: 4.42,
    reviews: 62,
    image: "/gangnam-apt-1.png",
  },
  {
    id: 2,
    title: "서초구의 집",
    subtitle: "강남구, 한미를 생각하게 하는 고급빌라",
    details: "전용 일주 공간",
    price: 2283188,
    rating: 4.65,
    reviews: 26,
    image: "/gangnam-apt-2.png",
  },
  {
    id: 3,
    title: "서울의 아파트",
    subtitle: "[신논현역 1분거리] #Cozy House",
    details: "스튜디오 전체 1개",
    price: 3822163,
    originalPrice: 4683458,
    rating: 4.6,
    reviews: 10,
    image: "/gangnam-apt-3.png",
  },
  {
    id: 4,
    title: "강남구역 아파트",
    subtitle: "아늑하고 강남구 중심지",
    details: "전체 1개",
    price: 2399587,
    rating: 4.8,
    reviews: 40,
    image: "/gangnam-apt-4.png",
  },
  {
    id: 5,
    title: "이태원 럭셔리 아파트",
    subtitle: "이태원역 3분거리, 고급 인테리어",
    details: "전체 일주 완전",
    price: 350000,
    rating: 4.9,
    reviews: 28,
    image: "/korean-house-1.jpg",
  },
  {
    id: 6,
    title: "이태원 모던 스튜디오",
    subtitle: "이태원 경리단길 도보 5분, 깔끔한 원룸",
    details: "스튜디오 전체",
    price: 290000,
    rating: 4.7,
    reviews: 15,
    image: "/korean-house-2.jpg",
  },
  {
    id: 7,
    title: "이태원 프리미엄 숙소",
    subtitle: "이태원 해방촌 인접, 쇼핑 최적",
    details: "전체 일주 완전",
    price: 190000,
    rating: 4.5,
    reviews: 32,
    image: "/korean-house-3.png",
  },
  {
    id: 8,
    title: "이태원 럭셔리 레지던스",
    subtitle: "이태원 녹사평역 5분, 고급 주거단지",
    details: "아파트 전체",
    price: 200000,
    rating: 4.85,
    reviews: 22,
    image: "/korean-house-4.png",
  },
  {
    id: 9,
    title: "홍대 비즈니스 숙소",
    subtitle: "홍대입구역 도보 3분, 비즈니스 출장자 최적",
    details: "원룸 전체",
    price: 180000,
    rating: 4.6,
    reviews: 18,
    image: "/korean-house-5.png",
  },
  {
    id: 10,
    title: "홍대 프리미엄 아파트",
    subtitle: "홍대입구역 5분, 쇼핑 인접",
    details: "아파트 전체",
    price: 320000,
    rating: 4.75,
    reviews: 25,
    image: "/korean-house-6.png",
  },
  {
    id: 11,
    title: "홍대 모던 하우스",
    subtitle: "홍대입구역 도보 7분, 조용한 주택가",
    details: "주택 전체",
    price: 270000,
    rating: 4.7,
    reviews: 14,
    image: "/korean-house-7.png",
  },
  {
    id: 12,
    title: "신사동 럭셔리 빌라",
    subtitle: "신사역 도보 5분, 가로수길 인접",
    details: "빌라 전체",
    price: 380000,
    rating: 4.9,
    reviews: 30,
    image: "/korean-house-8.png",
  },
  {
    id: 13,
    title: "도곡동 고급 아파트",
    subtitle: "도곡역 도보 4분, 조용한 주거단지",
    details: "아파트 전체",
    price: 250000,
    rating: 4.65,
    reviews: 12,
    image: "/korean-house-9.png",
  },
  {
    id: 14,
    title: "대치동 모던 레지던스",
    subtitle: "대치역 도보 6분, 깔끔한 인테리어",
    details: "원룸 전체",
    price: 230000,
    rating: 4.55,
    reviews: 16,
    image: "/korean-house-10.png",
  },
  {
    id: 15,
    title: "개포동 전원주택",
    subtitle: "개포동 한적한 주택가, 정원 있음",
    details: "주택 전체",
    price: 300000,
    rating: 4.8,
    reviews: 20,
    image: "/gangnam-apt-5.png",
  },
  {
    id: 16,
    title: "일원동 모던 아파트",
    subtitle: "일원역 도보 8분, 조용한 주거지역",
    details: "아파트 전체",
    price: 220000,
    rating: 4.5,
    reviews: 10,
    image: "/gangnam-apt-6.png",
  },
  {
    id: 17,
    title: "수서동 비즈니스 숙소",
    subtitle: "수서역 도보 5분, 비즈니스 여행객 추천",
    details: "원룸 전체",
    price: 210000,
    rating: 4.6,
    reviews: 15,
    image: "/gangnam-apt-7.png",
  },
  {
    id: 18,
    title: "잠실동 리버뷰 아파트",
    subtitle: "잠실역 도보 10분, 한강 뷰",
    details: "아파트 전체",
    price: 340000,
    rating: 4.85,
    reviews: 28,
    image: "/gangnam-apt-8.png",
  },
]
