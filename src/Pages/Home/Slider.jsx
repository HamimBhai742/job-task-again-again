import React, { useRef, useState } from "react";
import { Virtual, Navigation, Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Slider = () => {
  return (
    <>
      <h3 className="my-8 text-center font-semibold text-3xl">
        Top Brands Of The Word
      </h3>
      <Swiper
        modules={[Virtual, Navigation, Pagination, Autoplay]} // Include the Autoplay module
        slidesPerView={5}
        centeredSlides={true}
        spaceBetween={20}
        speed={3000}
        pagination={{
          type: "fraction",
        }}
        autoplay={{
          delay:0
        }}
      >
        <SwiperSlide>
          <img src="/apple.jpg" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/public/LG.jpg" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/public/addis.webp" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/public/zara.jpg" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/public/bose.jpg" alt="" />
        </SwiperSlide>{" "}
        <SwiperSlide>
          <img src="/public/canon.jpg" alt="" />
        </SwiperSlide>{" "}
        <SwiperSlide>
          <img src="/public/1-gucci-green-red.webp" alt="" />
        </SwiperSlide>{" "}
        <SwiperSlide>
          <img src="/public/nike.jpg" alt="" />
        </SwiperSlide>{" "}
        <SwiperSlide>
          <img src="/public/samsung.jpg" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/public/hp.jpg" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/public/sony.jpg" alt="" />
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Slider;
