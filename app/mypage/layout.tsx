"use client"

import type React from "react"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { User, Settings, CreditCard, Building, Ticket, Home, Heart, MessageSquare, LogOut } from "lucide-react"

export default function MypageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  const menuItems = [
    {
      title: "개인 정보",
      href: "/mypage/profile",
      icon: User,
    },
    {
      title: "내 프로필",
      href: "/mypage/profile-edit",
      icon: Settings,
    },
    {
      title: "결제 세부 사항",
      href: "/mypage/payment",
      icon: CreditCard,
    },
    {
      title: "내 스테이",
      href: "/mypage/stays",
      icon: Building,
    },
    {
      title: "쿠폰",
      href: "/mypage/coupons",
      icon: Ticket,
    },
    {
      title: "내 예약",
      href: "/mypage/reservations",
      icon: Home,
    },
    {
      title: "위시리스트",
      href: "/wishlist",
      icon: Heart,
    },
    {
      title: "메시지",
      href: "/messages",
      icon: MessageSquare,
    },
  ]

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-[220px] border-r flex-shrink-0">
        <div className="py-6 px-4">
          <div className="flex items-center mb-6">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
              <User className="w-4 h-4 text-gray-600" />
            </div>
            <span className="ml-3 font-medium">개인 정보</span>
          </div>

          <nav className="space-y-1">
            {menuItems.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center py-2 px-3 rounded-md text-sm ${
                    isActive ? "bg-gray-100 text-black font-medium" : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.title}
                </Link>
              )
            })}

            <button className="flex items-center py-2 px-3 rounded-md text-sm text-gray-600 hover:bg-gray-50 w-full text-left">
              <LogOut className="w-5 h-5 mr-3" />
              로그아웃
            </button>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-8">{children}</div>
    </div>
  )
}
