import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import sliderbg1 from '../images/slider-img1.jpg';
import sliderbg2 from '../images/dfume.jpg';
import banner1 from '../images/banner1.jpg';
import banner2 from '../images/banner2.jpg';
import banner3 from '../images/banner3.jpg';
import banner4 from '../images/banner4.jpg';
import banner5 from '../images/banner5.jpg';
import banner6 from '../images/banner6.jpg';
import banner7 from '../images/banner7.jpg';
import "./product-slider.css";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function ProductSlider() {
  return (
    <Carousel className="w-full">
      <CarouselContent>
        {/* First Slide - Essentia Of Life */}
        <CarouselItem>
          <div className="relative pb-24 pt-2 px-14 my-padding">
            <div className="absolute inset-0 bg-[url('/assets/pattern.svg')] opacity-10"></div>
            <img src={banner1}  alt="banner1"/>
          </div>
        </CarouselItem>

        {/* Second Slide - Relax Rubb */}
        <CarouselItem>
          <div className="relative pb-24 pt-2 px-14 my-padding">
            <div className="absolute inset-0 bg-[url('/assets/pattern.svg')] opacity-10"></div>
            <img src={banner2}  alt="banner2"/>
          </div>
        </CarouselItem>

        {/* Third Slide - Sleep Button */}
        <CarouselItem>
          <div className="relative pb-24 pt-2 px-14 my-padding">
            <div className="absolute inset-0 bg-[url('/assets/pattern.svg')] opacity-10"></div>
            <img src={banner3}  alt="banner3"/>
          </div>
        </CarouselItem>
        {/* >>>>>>>>>>>>>><<<<<<<<<<<<< */}
        <CarouselItem>
          <div className="relative pb-24 pt-2 px-14 my-padding">
            <div className="absolute inset-0 bg-[url('/assets/pattern.svg')] opacity-10"></div>
            <img src={banner4}  alt="banner1"/>
          </div>
        </CarouselItem>
        {/* >>>>>>>>>>>>>><<<<<<<<<<<<< */}
        <CarouselItem>
          <div className="relative pb-24 pt-2 px-14 my-padding">
            <div className="absolute inset-0 bg-[url('/assets/pattern.svg')] opacity-10"></div>
            <img src={banner5}  alt="banner1"/>
          </div>
        </CarouselItem>
        {/* >>>>>>>>>>>>>><<<<<<<<<<<<< */}
        <CarouselItem>
          <div className="relative pb-24 pt-2 px-14 my-padding">
            <div className="absolute inset-0 bg-[url('/assets/pattern.svg')] opacity-10"></div>
            <img src={banner6}  alt="banner1"/>
          </div>
        </CarouselItem>
        {/* >>>>>>>>>>>>>><<<<<<<<<<<<< */}
        <CarouselItem>
          <div className="relative pb-24 pt-2 px-14 my-padding">
            <div className="absolute inset-0 bg-[url('/assets/pattern.svg')] opacity-10"></div>
            <img src={banner7}  alt="banner1"/>
          </div>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious className="my-margin md:flex left-4 bg-white/70 hover:bg-white border-emerald-200" />
      <CarouselNext className="my-margin md:flex right-4 bg-white/70 hover:bg-white border-emerald-200" />
    </Carousel>
  );
}