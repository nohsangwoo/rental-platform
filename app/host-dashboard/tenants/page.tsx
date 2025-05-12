"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Search, Filter, MessageSquare } from "lucide-react"

export default function TenantsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const tenants = [
    {
      id: 1,
      name: "홍길동",
      email: "hong@example.com",
      phone: "+82 10-1234-5678",
      image: "/korean-man-portrait.png",
      status: "active",
      property: "[5 mins to Gerong Station] gerong stay",
      checkIn: "2025.12.09",
      checkOut: "2025.12.23",
    },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">세입자 관리</h1>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="세입자 이름, 이메일로 검색"
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            필터
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="mb-4">
          <TabsTrigger value="all">전체 ({tenants.length})</TabsTrigger>
          <TabsTrigger value="active">현재 세입자 ({tenants.filter((t) => t.status === "active").length})</TabsTrigger>
          <TabsTrigger value="past">이전 세입자 (0)</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tenants.map((tenant) => (
              <TenantCard key={tenant.id} tenant={tenant} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="active">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tenants
              .filter((tenant) => tenant.status === "active")
              .map((tenant) => (
                <TenantCard key={tenant.id} tenant={tenant} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="past">
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-gray-500">이전 세입자가 없습니다.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface TenantCardProps {
  tenant: {
    id: number
    name: string
    email: string
    phone: string
    image: string
    status: string
    property: string
    checkIn: string
    checkOut: string
  }
}

function TenantCard({ tenant }: TenantCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-full overflow-hidden relative bg-gray-100">
            <Image src={tenant.image || "/placeholder.svg"} alt={tenant.name} fill className="object-cover" />
          </div>
          <div>
            <h3 className="font-medium">{tenant.name}</h3>
            <p className="text-xs text-gray-500">{tenant.email}</p>
          </div>
        </div>

        <div className="space-y-2 mb-3">
          <p className="text-sm">
            <span className="text-gray-500">연락처:</span> {tenant.phone}
          </p>
          <p className="text-sm">
            <span className="text-gray-500">매물:</span> {tenant.property}
          </p>
          <p className="text-sm">
            <span className="text-gray-500">기간:</span> {tenant.checkIn} ~ {tenant.checkOut}
          </p>
        </div>

        <Button variant="outline" size="sm" className="w-full">
          <MessageSquare className="h-4 w-4 mr-1" />
          메시지 보내기
        </Button>
      </CardContent>
    </Card>
  )
}
