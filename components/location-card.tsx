"use client"

import Image from "next/image"

interface LocationCardProps {
  location: {
    id: number
    name: string
    image: string
  }
  onClick?: () => void
}

export default function LocationCard({ location, onClick }: LocationCardProps) {
  return (
    <div className="relative overflow-hidden rounded-lg group cursor-pointer" onClick={onClick}>
      <div className="aspect-[16/9] relative">
        <Image
          src={location.image || "/placeholder.svg"}
          alt={location.name}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h3 className="text-white text-xl font-medium">{location.name}</h3>
        </div>
      </div>
    </div>
  )
}
