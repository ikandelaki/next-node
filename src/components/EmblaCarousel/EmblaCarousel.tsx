"use client";

import useEmblaCarousel from "embla-carousel-react";
import "./EmblaCarousel.style.css";

type EmblaCarouselTypes = {
  children: React.ReactNode[];
  isArrow?: boolean;
};

export default function EmblaCarousel({ children, isArrow = true }: EmblaCarouselTypes) {
  const [emblaRef, emblaApi] = useEmblaCarousel();

  const goToPrev = () => emblaApi?.scrollPrev();
  const goToNext = () => emblaApi?.scrollNext();

  const renderSlideItem = (slide: React.ReactNode, key: number) => {
    return (
      <div className="embla__slide" key={key}>
        {slide}
      </div>
    );
  };

  const renderSlideItems = () => {
    return children.map((slide, key) => renderSlideItem(slide, key));
  };

  const renderArrows = () => {
    if (!isArrow) {
      return null;
    }

    return (
      <>
        <button
          className="w-10 aspect-square text-5xl absolute top-1/2 left-0 -translate-y-full bg-dark-gray opacity-50 hover:opacity-90 transition-all duration-300 cursor-pointer"
          onClick={goToPrev}
        >
          {"<"}
        </button>
        <button
          className="w-10 aspect-square text-5xl absolute top-1/2 right-0 -translate-y-full bg-dark-gray opacity-50 hover:opacity-90 transition-all duration-300 cursor-pointer"
          onClick={goToNext}
        >
          {">"}
        </button>
      </>
    );
  };

  return (
    <div className="embla relative">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">{renderSlideItems()}</div>
      </div>
      {renderArrows()}
    </div>
  );
}
