"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { Heart, Star } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface PropertyCardProps {
  property: {
    id: number
    title: string
    subtitle: string
    details: string
    price: number
    originalPrice?: number
    rating: number
    reviews: number
    image: string
  }
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsFavorite(!isFavorite)
  }

  return (
    <Link href={`/property/${property.id}`} className="group">
      <div className="relative overflow-hidden rounded-lg bg-white transition-all hover:shadow-md border">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={property.image || "/placeholder.svg?height=300&width=400&query=korean traditional house"}
            alt={property.title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />

          <button
            className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 hover:bg-white"
            onClick={toggleFavorite}
          >
            <Heart className={cn("h-5 w-5", isFavorite ? "fill-red-500 text-red-500" : "text-gray-600")} />
            <span className="sr-only">Add to favorites</span>
          </button>
        </div>

        <div className="p-3">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-sm">{property.title}</h3>
            <div className="flex items-center">
              <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
              <span className="text-xs ml-1">{property.rating}</span>
              <span className="text-xs text-gray-500 ml-1">({property.reviews})</span>
            </div>
          </div>

          <p className="text-xs text-gray-500 mt-1">{property.subtitle}</p>
          <p className="text-xs text-gray-500 mt-0.5">{property.details}</p>

          <div className="mt-2">
            {property.originalPrice ? (
              <div>
                <span className="line-through text-xs text-gray-500">₩{property.originalPrice.toLocaleString()}</span>
                <span className="font-bold ml-1">₩{property.price.toLocaleString()}</span>
                <span className="text-gray-500 text-xs">/박</span>
              </div>
            ) : (
              <div className="font-bold">
                ₩{property.price.toLocaleString()}
                <span className="text-gray-500 font-normal text-xs">/박</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
