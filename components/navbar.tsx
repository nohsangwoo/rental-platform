"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Bell, Heart, Menu, MessageSquare, User, Building } from "lucide-react"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Left side - Logo and mobile menu */}
          <div className="flex items-center space-x-4">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="outline" size="icon" className="rounded-full">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <nav className="flex flex-col space-y-4 mt-8">
                  <Link href="/about" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
                    ABOUT
                  </Link>
                  <Link href="/rentals" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
                    RENTALS
                  </Link>
                  <Link href="/host-dashboard" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
                    호스트 관리자
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>

            {/* Logo */}
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold tracking-tight">EnkorStay</span>
            </Link>

            {/* Desktop navigation links */}
            <div className="hidden lg:flex items-center space-x-6">
              <Link href="/about" className="text-sm font-medium">
                ABOUT
              </Link>
              <Link href="/rentals" className="text-sm font-medium">
                RENTALS
              </Link>
              <Link
                href="/host-dashboard"
                className="text-sm font-medium bg-rose-100 text-rose-600 px-3 py-2 rounded-md hover:bg-rose-200 transition-colors"
              >
                <Building className="h-4 w-4 inline-block mr-1" />
                호스트 관리자 (테스트용)
              </Link>
            </div>
          </div>

          {/* Right side - User links */}
          <div className="flex items-center space-x-4">
            <Link href="/notifications" className="text-gray-700 hover:text-black">
              <Bell className="h-5 w-5" />
              <span className="sr-only">알림</span>
            </Link>
            <Link href="/messages" className="text-gray-700 hover:text-black">
              <MessageSquare className="h-5 w-5" />
              <span className="sr-only">채팅</span>
            </Link>
            <Link href="/wishlist" className="text-gray-700 hover:text-black">
              <Heart className="h-5 w-5" />
              <span className="sr-only">위시리스트</span>
            </Link>
            <Link href="/mypage" className="text-gray-700 hover:text-black">
              <User className="h-5 w-5" />
              <span className="sr-only">마이페이지</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
