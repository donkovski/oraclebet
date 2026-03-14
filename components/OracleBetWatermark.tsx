"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

type Props = {
  className?: string
}

let cachedLogoSrc: string | null = null

function buildTransparentLogo(image: HTMLImageElement) {
  const canvas = document.createElement("canvas")
  canvas.width = image.naturalWidth
  canvas.height = image.naturalHeight

  const context = canvas.getContext("2d")

  if (!context) {
    return null
  }

  context.drawImage(image, 0, 0)

  const imageData = context.getImageData(0, 0, canvas.width, canvas.height)
  const pixels = imageData.data

  for (let index = 0; index < pixels.length; index += 4) {
    const red = pixels[index]
    const green = pixels[index + 1]
    const blue = pixels[index + 2]
    const alpha = pixels[index + 3]
    const brightness = (red + green + blue) / 3

    if (red > 245 && green > 245 && blue > 245) {
      pixels[index + 3] = 0
      continue
    }

    if (brightness > 225) {
      const fade = Math.max(0, Math.min(1, (245 - brightness) / 20))
      pixels[index + 3] = Math.round(alpha * fade)
    }
  }

  context.putImageData(imageData, 0, 0)
  return canvas.toDataURL("image/png")
}

export default function OracleBetWatermark({ className = "" }: Props) {
  const [logoSrc, setLogoSrc] = useState<string | null>(cachedLogoSrc)

  useEffect(() => {
    if (cachedLogoSrc) {
      return
    }

    let isCancelled = false
    const image = new window.Image()

    image.src = "/logo.png"

    image.onload = () => {
      const transparentLogo = buildTransparentLogo(image)

      if (!transparentLogo || isCancelled) {
        return
      }

      cachedLogoSrc = transparentLogo
      setLogoSrc(transparentLogo)
    }

    return () => {
      isCancelled = true
    }
  }, [])

  return (
    <div aria-hidden="true" className={`relative ${className}`}>
      {logoSrc && (
        <Image
          alt=""
          fill
          className="absolute inset-0 h-full w-full object-contain"
          draggable={false}
          loading="lazy"
          sizes="280px"
          src={logoSrc}
          unoptimized
        />
      )}
    </div>
  )
}
