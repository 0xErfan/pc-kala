import 'swiper/css';
import { ReactNode } from 'react';
import { Autoplay } from 'swiper/modules'
import { Swiper } from 'swiper/react';

interface SliderProps {
    children: ReactNode
    gap?: number
    withContainer?: boolean
    slidePerView?: number | null
}

const Slider = ({ children, gap = 12, withContainer = true, slidePerView = null }: SliderProps) => {

    return (

        <div className={` ${withContainer ? 'container' : 'w-full'} mt-6`}>
            <Swiper
                slidesPerView={slidePerView ?? 4}
                spaceBetween={gap}
                loop={true}
                autoplay={{
                    delay: 3300,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true
                }}
                breakpoints={{
                    0: {
                        slidesPerView: slidePerView ?? 1
                    },
                    640: {
                        slidesPerView: slidePerView ?? 2,
                    },
                    1024: {
                        slidesPerView: slidePerView ?? 4,
                    },
                }}
                modules={[Autoplay]}
                className="mySwiper"
            >
                {children}
            </Swiper>
        </div>
    )
}

export default Slider;