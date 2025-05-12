"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    phone: "",
    userType: "user", // "user" or "host"
    agreeTerms: false,
    agreePrivacy: false,
    agreeMarketing: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handleRadioChange = (value: string) => {
    setFormData({
      ...formData,
      userType: value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle registration logic here
    console.log("Register with:", formData)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-center mb-6">회원가입</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">이메일</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="이메일 주소를 입력하세요"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">비밀번호</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="비밀번호를 입력하세요 (8자 이상)"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={8}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">비밀번호 확인</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="비밀번호를 다시 입력하세요"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">이름</Label>
            <Input
              id="name"
              name="name"
              placeholder="이름을 입력하세요"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">휴대폰 번호</Label>
            <Input
              id="phone"
              name="phone"
              placeholder="휴대폰 번호를 입력하세요"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>회원 유형</Label>
            <RadioGroup
              defaultValue="user"
              value={formData.userType}
              onValueChange={handleRadioChange}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="user" id="user" />
                <Label htmlFor="user">일반 사용자</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="host" id="host" />
                <Label htmlFor="host">호스트</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="agreeTerms"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onCheckedChange={(checked) => setFormData({ ...formData, agreeTerms: checked as boolean })}
                required
              />
              <Label htmlFor="agreeTerms" className="text-sm">
                <span className="text-red-500 mr-1">*</span>
                <Link href="/terms" className="text-primary hover:underline">
                  이용약관
                </Link>
                에 동의합니다.
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="agreePrivacy"
                name="agreePrivacy"
                checked={formData.agreePrivacy}
                onCheckedChange={(checked) => setFormData({ ...formData, agreePrivacy: checked as boolean })}
                required
              />
              <Label htmlFor="agreePrivacy" className="text-sm">
                <span className="text-red-500 mr-1">*</span>
                <Link href="/privacy" className="text-primary hover:underline">
                  개인정보 처리방침
                </Link>
                에 동의합니다.
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="agreeMarketing"
                name="agreeMarketing"
                checked={formData.agreeMarketing}
                onCheckedChange={(checked) => setFormData({ ...formData, agreeMarketing: checked as boolean })}
              />
              <Label htmlFor="agreeMarketing" className="text-sm">
                마케팅 정보 수신에 동의합니다. (선택)
              </Label>
            </div>
          </div>

          <Button type="submit" className="w-full">
            회원가입
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            이미 계정이 있으신가요?{" "}
            <Link href="/login" className="text-primary hover:underline">
              로그인
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
