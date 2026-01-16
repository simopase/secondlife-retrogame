'use client'
import { Swiper, SwiperSlide } from 'swiper/react';
import Button from './Button';
import 'swiper/css';

type Slide = {
  title: {
    text: string;
    primaryWord?: string;
    secondaryWord?: string;
  };
  image: string;
  bottomText: string;
}

type SwiperProps = {
  slides: Slide[];
}

const SwiperComponent = ({ slides }: SwiperProps) => {
  return (
    <Swiper
      spaceBetween={0}
      slidesPerView={1}

    >
      {slides.map((slide: Slide, index: any) => (
        <SwiperSlide key={index}>
          <div className='py-20 h-[80vh] position-relative flex items-center'>
            <img src={slide.image} className='absolute inset-0 w-full h-full object-cover -z-10 opacity-10' alt={slide.title.text} />
            <div className='container mx-auto'>
              <h1 className='max-w-[50%]'>
                {
                  slide.title.text?.split(' ').map((word, idx) => (
                    <span key={idx} className={word === slide.title.primaryWord ? 'text-primary-red' : word === slide.title.secondaryWord ? 'text-primary-yellow text-shadow-(--glow-gold)' : ''}>{word} </span>
                  ))
                }
              </h1>
              <Button className="mt-6" size="l" type="primary-glow" onClick={()=> console.log("clicked")}>{slide.bottomText}</Button>
            </div>

          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SwiperComponent;