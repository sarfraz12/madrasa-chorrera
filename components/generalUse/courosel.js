'use client'
import Image from 'next/image'
import { useState } from 'react'
import { urlForImage } from "@/lib/sanity/image"

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    )
  }

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    )
  }

  const currentImage = images?.[currentIndex]

  // Dynamic overlay class based on image overlay property
  const getOverlayClass = (overlay) => {
    switch (overlay) {
      case 'white':
        return 'bg-gradient-to-br from-white/50 via-white/70 to-white/30'
      case 'black':
        return 'bg-gradient-to-br from-black/50 via-black/70 to-black/30'
      case 'none':
        return '' // No overlay
      default:
        return 'bg-gradient-to-br from-black/50 via-black/70 to-black/30' // Fallback to dark
    }
  }

  return (
    <div className="relative rounded-md overflow-hidden w-full h-[calc(100vh-30vh)]">
      {/* Overlay */}
      <div className={`absolute z-10 inset-0 ${getOverlayClass(currentImage?.overlay)}`} />

      {/* Images */}
      <div className="overflow-hidden relative h-full">
        <div
          className="flex transition-transform duration-500 ease-in-out h-full"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images?.map((image, index) => {
            const imageProps = image?.sliderImage ? urlForImage(image.sliderImage) : null
            return (
              <div className="relative w-full flex-shrink-0 h-full" key={index}>
                {imageProps && (
                  <Image
                    src={imageProps.src}
                    alt={`Slide ${index}`}
                    fill
                    priority={index === 0}
                    style={{ objectFit: 'cover' }}
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Content */}
      {currentImage && (
        <div
          role="region"
          aria-label="Carousel Slide Content"
          className="absolute top-1/3 left-1/2 z-20 transform -translate-x-1/2 -translate-y-1/2 px-4 sm:px-8 text-center w-full max-w-[90%] sm:max-w-4xl animate-fade-in"
        >

          {/* Title */}
          {currentImage?.sliderTitle && (
            <div
              className={`inline-block w-full sm:w-auto px-4 sm:px-6 py-3 sm:py-4 rounded-lg mb-4 transition-all duration-700 ease-in-out animate-slide-up
        ${currentImage?.titleOverlayColor === 'white'
                  ? 'bg-white/80 text-black'
                  : currentImage?.titleOverlayColor === 'black'
                    ? 'bg-black/70 text-white'
                    : `${currentImage?.titleTextColor === 'black' ? 'text-black' : 'text-white'}`
                }`}
            >
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold tracking-tight leading-tight">
                {currentImage.sliderTitle}
              </h2>
            </div>
          )}

          {/* Description */}
          {currentImage?.sliderDescription && (
            <div
              className={`inline-block mt-4 px-4 sm:px-6 py-3 sm:py-4 rounded-lg w-full sm:w-auto max-w-[90%] sm:max-w-2xl mx-auto transition-all duration-700 ease-in-out animate-slide-up delay-150
        ${currentImage?.descriptionOverlayColor === 'white'
                  ? 'bg-white/70 text-black'
                  : currentImage?.descriptionOverlayColor === 'black'
                    ? 'bg-black/60 text-white'
                    : `${currentImage?.overlay === 'white' ? 'text-black' : 'text-white'}`
                }`}
            >
              <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed">
                {currentImage.sliderDescription}
              </p>
            </div>
          )}

        </div>
      )}


      {/* Arrows */}
      <button
        onClick={prevSlide}
        className="absolute z-20 top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-4 rounded-full hover:bg-opacity-75"
      >
        &#10094;
      </button>
      <button
        onClick={nextSlide}
        className="absolute z-20 top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-4 rounded-full hover:bg-opacity-75"
      >
        &#10095;
      </button>

      {/* Dots */}
      <div className="absolute z-20 bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images?.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full cursor-pointer ${index === currentIndex ? 'bg-blue-500' : 'bg-gray-300'
              }`}
          />
        ))}
      </div>
    </div>
  )
}

export default Carousel
