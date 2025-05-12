"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface AccountRegistrationModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AccountRegistrationModal({ isOpen, onClose }: AccountRegistrationModalProps) {
  const [bank, setBank] = useState("")
  const [accountNumber, setAccountNumber] = useState("")
  const [accountHolder, setAccountHolder] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // 계좌 등록 로직 구현
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>정산 계좌 등록</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="bank">은행</Label>
              <Select value={bank} onValueChange={setBank}>
                <SelectTrigger id="bank">
                  <SelectValue placeholder="은행을 선택해주세요" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kb">KB국민은행</SelectItem>
                  <SelectItem value="shinhan">신한은행</SelectItem>
                  <SelectItem value="woori">우리은행</SelectItem>
                  <SelectItem value="hana">하나은행</SelectItem>
                  <SelectItem value="nh">농협은행</SelectItem>
                  <SelectItem value="ibk">기업은행</SelectItem>
                  <SelectItem value="kakao">카카오뱅크</SelectItem>
                  <SelectItem value="toss">토스뱅크</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="accountNumber">계좌번호</Label>
              <Input
                id="accountNumber"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                placeholder="'-' 없이 입력해주세요"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="accountHolder">예금주</Label>
              <Input
                id="accountHolder"
                value={accountHolder}
                onChange={(e) => setAccountHolder(e.target.value)}
                placeholder="예금주명을 입력해주세요"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              취소
            </Button>
            <Button type="submit">등록하기</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
