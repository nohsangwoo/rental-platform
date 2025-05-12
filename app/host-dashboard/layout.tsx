"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Home,
  Building,
  FileText,
  Calendar,
  DollarSign,
  FileCheck,
  MessageSquare,
  Star,
  Users,
  Bell,
  User,
} from "lucide-react"

interface HostDashboardLayoutProps {
  children: React.ReactNode
}

export default function HostDashboardLayout({ children }: HostDashboardLayoutProps) {
  const pathname = usePathname()

  const menuItems = [
    { name: "HOME", href: "/host-dashboard", icon: Home },
    { name: "매물 관리", href: "/host-dashboard/properties", icon: Building },
    { name: "계약관리", href: "/host-dashboard/contracts", icon: FileText },
    { name: "달력", href: "/host-dashboard/calendar", icon: Calendar },
    { name: "정산", href: "/host-dashboard/settlements", icon: DollarSign },
    { name: "문서관리", href: "/host-dashboard/documents", icon: FileCheck },
    { name: "리뷰관리", href: "/host-dashboard/reviews", icon: Star },
    { name: "세입자 관리", href: "/host-dashboard/tenants", icon: Users },
    { name: "메세지", href: "/host-dashboard/messages", icon: MessageSquare },
    { name: "알림", href: "/host-dashboard/notifications", icon: Bell },
    { name: "마이페이지", href: "/host-dashboard/mypage", icon: User },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top navigation */}
      <div className="sticky top-0 z-30 w-full bg-white border-b shadow-sm">
        <div className="container mx-auto px-4">
          <div className="overflow-x-auto">
            <nav className="flex h-14 items-center space-x-1">
              {menuItems.map((item) => {
                const isActive =
                  pathname === item.href || (item.href !== "/host-dashboard" && pathname?.startsWith(item.href))

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex h-full items-center px-4 text-sm font-medium transition-colors hover:text-rose-600",
                      isActive ? "border-b-2 border-rose-600 text-rose-600" : "text-gray-600",
                    )}
                  >
                    <item.icon className="h-4 w-4 mr-2" />
                    {item.name}
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">{children}</main>

      {/* Footer */}
      <footer className="border-t py-6 bg-white">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          <p>© 2025 EnkorStay. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
