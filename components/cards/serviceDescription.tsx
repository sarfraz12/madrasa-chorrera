"use client";
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

// Define the props for the Section component
interface Point {
  ServiceCardItemDescription: string;
}

interface SectionProps {
  title: string;
  description: string;
  description2: string;
  imageSrc: string;
  reverse?: boolean; // Optional prop to reverse the image and text layout
  animation?: string;
  points?: Point[],
}



// Functional Component with TypeScript types
export default function ServiceDescription({
  title,
  description,
  description2,
  imageSrc,
  reverse = false,
  animation = 'animate-slideInLeft',
  points,
}: SectionProps) {

  // animation handler
  const section1Ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.3, // Adjust threshold as needed
    };

    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !isVisible) {
          // Only set visible if it's currently not visible
          setIsVisible(true);
        }
      });
    };

    const observer = new IntersectionObserver(handleObserver, observerOptions);
    const section1 = section1Ref.current;

    if (section1) {
      observer.observe(section1);
    }

    return () => {
      if (section1) observer.unobserve(section1);
    };
  }, [isVisible]); // Added isVisible as a dependency

  return (
    <section
      ref={section1Ref}
      className={`py-16 transition-opacity duration-2000 ${isVisible ? `opacity-100 ${animation}` : 'opacity-0'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-8 ${reverse ? 'lg:flex-row-reverse' : ''
            }`}
        >
          {/* Text */}
          <div className={`space-y-4 ${reverse ? 'lg:order-2' : 'lg:order-1'}`}>
            <h1 className="text-5xl font-bold dark:text-white text-black ">{title}</h1>
            <p className="text-gray-500 text-xl mb-2">{description}</p>
            <hr />
            <ul className="list-disc pl-5 space-y-2">

              {points?.map((item: Point, index: number) => (
                <li key={index} className="flex items-center text-black dark:text-white">
                  <CheckCircleIcon className="h-5 w-5 text-blue-600 mr-2" />
                  {item?.ServiceCardItemDescription}
                </li>
              ))}

            </ul>
            <p className="text-gray-500 text-xl mb-2">
              {description2}
            </p>
          </div>
          {/* Image */}

          <div className={`relative ${reverse ? 'lg:order-1' : 'lg:order-2'}`}>
            {imageSrc?.length > 0 && (
              <Image
                src={imageSrc}
                alt={title}
                width={600}
                height={400}
                className="rounded-lg shadow-lg hover-grow"
                style={{ width: '100%', height: 'auto' }} // Ensures the image maintains responsive behavior
              />
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
