import { ReactNode } from 'react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules'
import { Swiper } from 'swiper/react';

interface SliderProps {
    children: ReactNode,
}

const Slider = ({ children }: SliderProps) => {

    return (

        <div className="container mt-6">
            <Swiper
                slidesPerView={4}
                spaceBetween={12}
                loop={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true
                }}
                breakpoints={{
                    0: {
                        slidesPerView: 1
                    },
                    640: {
                        slidesPerView: 2,
                    },
                    1024: {
                        slidesPerView: 4,
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