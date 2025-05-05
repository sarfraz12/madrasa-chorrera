import React from "react";
import Image from "next/image";
import { urlForImage } from "@/lib/sanity/image";

interface ClientImages {
    clientImageTitle?: string;
    clientImageAlt?: string;
    clientImage?: string;
    _key?: string;

}

interface ClientSliderProps {
    lang: string;
    dataImage: ClientImages[];
  }

export default function ClientSlider ({lang, dataImage}:ClientSliderProps ) {

    
    return (
        <section className="px-6 py-4">
            {/* Title aligned to the left */}
            <div className="relative top-0 left-0 mb-4">
                <h2 className="text-lg font-bold text-gray-800 dark:text-white"> {lang=="en"? "Trusted By:" : "Confiado por:" } </h2>
            </div>
            <div className="overflow-hidden">
                <div className="flex space-x-8 animate-marquee">
                    {/* Duplicate the logos for infinite scroll effect */}
                    {dataImage.concat(dataImage).map((logo: ClientImages, index: number) => (
                        <div key={index} className="flex-shrink-0 w-40 h-14">
                            <div className="relative w-full h-full">
                                <Image
                                    src={urlForImage(logo.clientImage) || "/"}
                                    alt={logo.clientImageAlt || "alt"}
                                    fill
                                    style={{ objectFit: "cover" }} 
                                    className="grayscale brightness-0 dark:invert dark:brightness-100"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
