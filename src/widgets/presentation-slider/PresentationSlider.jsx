import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Keyboard, Autoplay } from "swiper/modules";

const PresentationSlider = () => {
  const slides = [
    { src: "./img/bg.png", alt: "Shop Item 1" },
    { src: "./img/bg2.jpg", alt: "Shop Item 2" },
    { src: "./img/bg3.jpg", alt: "Shop Item 3" },
    { src: "./img/bg4.png", alt: "Shop Item 4" },
  ];

  return (
    <div className="presentation">
      <Swiper
        modules={[Navigation, Keyboard, Autoplay]}
        navigation={true}
        loop={false}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        mousewheel={true}
        keyboard={{ enabled: true }}
        spaceBetween={0}
        slidesPerView={1}
        slidesPerGroup={1}
        className="presentation-slider"
        loopAdditionalSlides={0}
        rewind={true}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <img src={slide.src} alt={slide.alt} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PresentationSlider;
