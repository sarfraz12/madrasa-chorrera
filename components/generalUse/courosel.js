'use client'
import Image from 'next/image'
import { useState } from 'react'
import { urlForImage } from "@/lib/sanity/image";



const Carousel = ({ images }) => {

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images?.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images?.length - 1 ? 0 : prevIndex + 1
    );
  };



  return (
    <div className="relative rounded-md bg-black bg-opacity-20 overflow-hidden  w-full h-[calc(100vh-30vh)]">
      {/* Overlay */}
      <div className="absolute z-10 inset-0 bg-gradient-to-br from-white/50 via-white/70 to-white/30 " />
      {/* Image */}

      <div className="overflow-hidden relative h-full">
        <div
          className="flex transition-transform duration-500 ease-in-out h-full"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images && images?.length > 0 ? (

            images?.map((image, index) => {

              const imageProps = image?.sliderImage
                ?
                urlForImage(image.sliderImage)
                : "null";

              return (
                <div className="relative w-full flex-shrink-0 h-full" key={index}  >
                  <Image
                    src={imageProps?.src}
                    alt={`Slide ${index}`}
                    fill
                    priority={index === 0} // Prioritize loading the first image
                    style={{ objectFit: "cover" }}
                  />
                </div>
              )
            })) :
            (
              <p>No hay imágenes disponibles</p>
            )
          }
        </div>
      </div>
      {/* content container */}
      <div className="self-center px-5 pb-10">

        {images && images?.length > 0 ? (

          images.map((image, index) => (
            < div className="absolute top-5  z-10 p-20 text-balck md:max-w-10xl " key={index} >
              {/* <div className="text-lg font-medium z-10">{index === currentIndex ? image.sliderTitle : ''}</div> */}
              <div className="max-w-2xl" key={index + "content"}>
                <h3 className=" text-3xl font-semibold tracking-tight text-black lg:leading-tight text-brand-primary lg:text-5xl dark:text-black ">
                  {index === currentIndex ? image.sliderTitle : ''}
                </h3>
              </div>
              <p className="overflow-hidden max-h-fit mb-2 mt-2 sm:w-7/12 text-md lg:text-xl bg-slate-300 bg-opacity-20 dark:text-black" key={index}>
                {index === currentIndex ? image.sliderDescription : ''}
              </p>
            </div>
          ))) :
          (
            <p>No hay imágenes disponibles</p>
          )
        }
      </div>
      <div>
        <button
          onClick={prevSlide}
          className="absolute z-10 top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-4 rounded-full hover:bg-opacity-75 transition duration-300"
        >
          &#10094;
        </button>
        <button
          onClick={nextSlide}
          className="absolute z-10 top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-4 rounded-full hover:bg-opacity-75 transition duration-300"
        >
          &#10095;
        </button>
      </div>
      <div className="absolute z-10 bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images && images?.length > 0 ? (        
        images.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full transition duration-300 ${index === currentIndex ? 'bg-blue-500' : 'bg-gray-300'
              }`}
          />
        ))):
        (
          <p>No hay imágenes disponibles</p>
        )
      }
      </div>
    </div>


  );
};

export default Carousel;


