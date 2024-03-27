import 'swiper/css';
import { Autoplay } from 'swiper/modules'
import { FC, ReactNode } from 'react';
import { Swiper } from 'swiper/react';

const Slider: FC<{ children: ReactNode }> = ({ children }) => {

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
                    768: {
                        slidesPerView: 3
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