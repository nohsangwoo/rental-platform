"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function HostMyPage() {
  const [profileImage, setProfileImage] = useState("/host-profile.png")

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">마이페이지</h1>

      <Tabs defaultValue="profile">
        <TabsList className="mb-4">
          <TabsTrigger value="profile">프로필 정보</TabsTrigger>
          <TabsTrigger value="account">계정 설정</TabsTrigger>
          <TabsTrigger value="payment">결제 정보</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>프로필 사진</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center">
                  <div className="w-32 h-32 rounded-full overflow-hidden relative mb-4">
                    <Image src={profileImage || "/placeholder.svg"} alt="Profile" fill className="object-cover" />
                  </div>
                  <Button variant="outline" size="sm">
                    사진 변경
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>기본 정보</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">이름</Label>
                      <Input id="firstName" defaultValue="Choi" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">성</Label>
                      <Input id="lastName" defaultValue="Jin" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">이메일</Label>
                    <Input id="email" type="email" defaultValue="choi.jin@example.com" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">전화번호</Label>
                    <Input id="phone" defaultValue="+82 10-1234-5678" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">자기소개</Label>
                    <Textarea
                      id="bio"
                      rows={4}
                      defaultValue="안녕하세요! 저는 서울에서 호스팅을 하고 있는 Choi Jin입니다. 게스트들에게 편안하고 즐거운 경험을 제공하기 위해 노력하고 있습니다."
                    />
                  </div>

                  <Button>저장하기</Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>계정 설정</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">현재 비밀번호</Label>
                  <Input id="currentPassword" type="password" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newPassword">새 비밀번호</Label>
                  <Input id="newPassword" type="password" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">새 비밀번호 확인</Label>
                  <Input id="confirmPassword" type="password" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="language">언어 설정</Label>
                  <Select defaultValue="ko">
                    <SelectTrigger>
                      <SelectValue placeholder="언어 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ko">한국어</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="ja">日本語</SelectItem>
                      <SelectItem value="zh">中文</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button>저장하기</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payment">
          <Card>
            <CardHeader>
              <CardTitle>결제 정보</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="bankName">은행명</Label>
                  <Input id="bankName" defaultValue="신한은행" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="accountNumber">계좌번호</Label>
                  <Input id="accountNumber" defaultValue="110-123-456789" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="accountHolder">예금주</Label>
                  <Input id="accountHolder" defaultValue="최진" />
                </div>

                <Button>저장하기</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
