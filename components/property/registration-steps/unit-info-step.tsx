"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, X, Upload, Wifi, Lock, ImageIcon } from "lucide-react"
import type { UnitInfo } from "../property-registration-modal"
import { Label } from "@/components/ui/label"

interface UnitInfoStepProps {
  formData: {
    units: UnitInfo[]
  }
  updateFormData: (data: { units: UnitInfo[] }) => void
}

export default function UnitInfoStep({ formData, updateFormData }: UnitInfoStepProps) {
  const [activeUnitIndex, setActiveUnitIndex] = useState<number | null>(formData.units.length > 0 ? 0 : null)
  const [showUnitForm, setShowUnitForm] = useState(formData.units.length === 0)

  const handleAddUnit = () => {
    const newUnit: UnitInfo = {
      id: Date.now().toString(),
      name: "",
      price: 0,
      maintenanceFee: 0,
      deposit: 0,
      photos: [],
    }

    const updatedUnits = [...formData.units, newUnit]
    updateFormData({ units: updatedUnits })
    setActiveUnitIndex(updatedUnits.length - 1)
    setShowUnitForm(true)
  }

  const handleUpdateUnit = (index: number, data: Partial<UnitInfo>) => {
    const updatedUnits = [...formData.units]
    updatedUnits[index] = { ...updatedUnits[index], ...data }
    updateFormData({ units: updatedUnits })
  }

  const handleRemoveUnit = (index: number) => {
    const updatedUnits = formData.units.filter((_, i) => i !== index)
    updateFormData({ units: updatedUnits })

    if (activeUnitIndex === index) {
      setActiveUnitIndex(updatedUnits.length > 0 ? 0 : null)
      setShowUnitForm(updatedUnits.length > 0)
    } else if (activeUnitIndex !== null && activeUnitIndex > index) {
      setActiveUnitIndex(activeUnitIndex - 1)
    }
  }

  const handleAddPhoto = (index: number, photoUrl: string) => {
    const unit = formData.units[index]
    if (unit.photos.length >= 4) return // 최대 4장까지만 허용

    const updatedPhotos = [...unit.photos, photoUrl]
    handleUpdateUnit(index, { photos: updatedPhotos })
  }

  const handleRemovePhoto = (unitIndex: number, photoIndex: number) => {
    const unit = formData.units[unitIndex]
    const updatedPhotos = unit.photos.filter((_, i) => i !== photoIndex)
    handleUpdateUnit(unitIndex, { photos: updatedPhotos })
  }

  return (
    <div className="space-y-6">
      <div className="text-sm text-gray-500">
        이 건물에 여러개의 호실을 가진 호스트라면 호실을 추가하여 관리하세요.
        <br />
        또한 동일한 건물에서 여러개의 세대를 운영할 경우 각각의 세대를 추가하여 관리할 수 있습니다.
        <br />
        한개만 등록하실거라면 호실명을 추가하고 정보를 입력하세요.
      </div>

      {/* 호실 목록 */}
      <div className="space-y-3">
        {formData.units.map((unit, index) => (
          <Card
            key={unit.id}
            className={`cursor-pointer hover:border-blue-200 transition-colors ${
              activeUnitIndex === index ? "border-blue-500" : ""
            }`}
            onClick={() => {
              setActiveUnitIndex(index)
              setShowUnitForm(true)
            }}
          >
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center">
                  {unit.photos.length > 0 ? (
                    <img
                      src={unit.photos[0] || "/placeholder.svg"}
                      alt={unit.name}
                      className="w-full h-full object-cover rounded"
                    />
                  ) : (
                    <ImageIcon className="w-6 h-6 text-gray-400" />
                  )}
                </div>
                <div>
                  <div className="font-medium">{unit.name || "이름 없음"}</div>
                  <div className="text-sm text-gray-500">
                    {unit.price > 0 ? `₩${unit.price.toLocaleString()}/월` : "가격 미설정"}
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation()
                  handleRemoveUnit(index)
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ))}

        <Button
          variant="outline"
          className="w-full py-6 border-dashed flex items-center justify-center gap-2"
          onClick={handleAddUnit}
        >
          <Plus className="h-4 w-4" />
          추가하기
        </Button>
      </div>

      {/* 호실 정보 입력 폼 */}
      {showUnitForm && activeUnitIndex !== null && (
        <div className="mt-8 space-y-6 border-t pt-6">
          <div>
            <h3 className="text-lg font-medium mb-4">호실(세대) 이름이 무엇인가요?</h3>
            <Input
              placeholder="호실 이름을 입력해주세요"
              value={formData.units[activeUnitIndex]?.name || ""}
              onChange={(e) => handleUpdateUnit(activeUnitIndex, { name: e.target.value })}
              className="mb-1"
            />
            <p className="text-sm text-gray-500">영어 혹은 숫자로 입력해주세요</p>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">방의 가격을 설정해주세요</h3>

            <div className="space-y-4">
              <div>
                <Label>월세</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₩</span>
                  <Input
                    type="number"
                    placeholder="월세"
                    className="pl-8"
                    value={formData.units[activeUnitIndex]?.price || ""}
                    onChange={(e) => handleUpdateUnit(activeUnitIndex, { price: Number(e.target.value) })}
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">/월</span>
                </div>
              </div>

              <div>
                <Label>고정 관리비</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₩</span>
                  <Input
                    type="number"
                    placeholder="고정 관리비"
                    className="pl-8"
                    value={formData.units[activeUnitIndex]?.maintenanceFee || ""}
                    onChange={(e) => handleUpdateUnit(activeUnitIndex, { maintenanceFee: Number(e.target.value) })}
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">/월</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">관리비를 미리 입력하여 월세와 함께 일괄적으로 받습니다.</p>
              </div>

              <div>
                <Label>보증금/보증금</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₩</span>
                  <Input
                    type="number"
                    placeholder="보증금/보증금"
                    className="pl-8"
                    value={formData.units[activeUnitIndex]?.deposit || ""}
                    onChange={(e) => handleUpdateUnit(activeUnitIndex, { deposit: Number(e.target.value) })}
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">회</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">입주자가 퇴거했을 때 반환 정도하는 보증금입니다</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">호실(세대)의 사진을 추가해주세요</h3>
            <p className="text-sm text-red-500 mb-2">
              이 호실의 가장 잘나온 사진을 업로드해주세요. 최대 4장까지 사진을 업로드할 수 있어요.
              <br />
              이미지를 드래그해 업로드하거나 버튼을 눌러 사진을 선택해주세요.
            </p>

            <div className="border-2 border-dashed border-red-100 rounded-md p-8 bg-red-50 mb-4">
              <div className="flex flex-col items-center justify-center text-gray-500">
                <Upload className="h-8 w-8 mb-2 text-gray-400" />
                <p className="text-center mb-1">
                  파일을 선택하여
                  <br />
                  사진을 업로드 주세요.
                </p>
                <p className="text-sm">가장 잘나오는 사진이면 좋습니다.</p>

                <Button variant="outline" className="mt-4">
                  사진 선택하기
                </Button>
              </div>
            </div>

            {formData.units[activeUnitIndex]?.photos.length > 0 && (
              <div className="grid grid-cols-2 gap-2 mt-4">
                {formData.units[activeUnitIndex].photos.map((photo, photoIndex) => (
                  <div key={photoIndex} className="relative">
                    <img src={photo || "/placeholder.svg"} alt="Room" className="w-full h-32 object-cover rounded-md" />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-1 right-1 h-6 w-6"
                      onClick={() => handleRemovePhoto(activeUnitIndex, photoIndex)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">호실(세대)의 추가정보를 입력해주세요</h3>
            <p className="text-sm text-gray-500 mb-4">이 정보는 세입자의 입실(7일 전일)에만 문자메세지로 전달됩니다.</p>

            <div className="space-y-4">
              <div>
                <Label>와이파이 ID</Label>
                <div className="relative">
                  <Wifi className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                  <Input
                    placeholder="ID"
                    className="pl-10"
                    value={formData.units[activeUnitIndex]?.wifiId || ""}
                    onChange={(e) => handleUpdateUnit(activeUnitIndex, { wifiId: e.target.value })}
                  />
                </div>
                <p className="text-sm text-gray-500 mt-1">Wi-Fi 아이디를 입력해주세요.</p>
              </div>

              <div>
                <Label>와이파이 비밀번호</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                  <Input
                    type="password"
                    placeholder="와이파이 비밀번호"
                    className="pl-10"
                    value={formData.units[activeUnitIndex]?.wifiPassword || ""}
                    onChange={(e) => handleUpdateUnit(activeUnitIndex, { wifiPassword: e.target.value })}
                  />
                </div>
                <p className="text-sm text-gray-500 mt-1">Wi-Fi 비밀번호를 입력해주세요.</p>
              </div>

              <div>
                <Label>본 비밀번호</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                  <Input
                    type="password"
                    placeholder="본 비밀번호"
                    className="pl-10"
                    value={formData.units[activeUnitIndex]?.wifiBackupPassword || ""}
                    onChange={(e) => handleUpdateUnit(activeUnitIndex, { wifiBackupPassword: e.target.value })}
                  />
                </div>
                <p className="text-sm text-gray-500 mt-1">앱 비밀번호를 입력해주세요.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
