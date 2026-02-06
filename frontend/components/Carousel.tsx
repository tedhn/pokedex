import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

interface CarouselProps {
  images: string[];
}

const Carousel: React.FC<CarouselProps> = (props) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const handleIncrement = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? props.images.length - 1 : prevIndex - 1,
    );
  };

  const handleDecrement = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === props.images.length - 1 ? 0 : prevIndex + 1,
    );
  };

  return (
    <div className="relative h-full w-full bg-white overflow-hidden rounded">
      <img
        src={props.images[currentIndex]}
        alt="Carousel Image"
        className="w-full h-full object-contain rounded"
      />
      <div className="absolute bottom-2 right-2">
        <button
          className="bg-white p-1 rounded-full shadow-md mr-2 hover:bg-slate-100 cursor-pointer"
          onClick={handleIncrement}
        >
          <ChevronLeft className="text-slate-900" />
        </button>
        <button
          className="bg-white p-1 rounded-full shadow-md mr-2 hover:bg-slate-100 cursor-pointer"
          onClick={handleDecrement}
        >
          <ChevronRight className="text-slate-900" />
        </button>
      </div>
    </div>
  );
};

export default Carousel;
