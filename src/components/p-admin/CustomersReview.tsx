import { useEffect, useState } from 'react'
import { FaAngleLeft } from "react-icons/fa6";
import CustomerReview from '../../components/p-admin/CustomerReview';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { commentProps } from '@/global.t';

const CustomersReview = () => {

    const [customersComment, setCustomersComment] = useState<commentProps[]>()

    useEffect(() => {
        (
            async () => {
                await fetch('/api/comment/byCustomer').then(res => res.json()).then(data => {
                    setCustomersComment(data.customersReview)
                })
            }
        )()
    }, [])

    return (
        <div className='flex flex-col gap-5'>

            <div className='flex items-center justify-between relative'>
                <div>
                    <h4 className='font-bold text-2xl text-panel-darkTitle font-peyda'>نظرات مشتری ها</h4>
                    <p className='font-sans text-[12px] text-panel-caption flex items-center justify-start'>جدید ترین نظرات ثبت شده توسط خریداران</p>
                </div>
            </div>

            <div className='relative grid grid-cols-1'>
                <Swiper
                    className='w-full mySwiper items-start overflow-hidden'
                    loop
                    slidesPerView={2}
                    spaceBetween={35}
                    autoplay={{
                        delay: 3300,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true
                    }}
                    breakpoints={{
                        0: {
                            slidesPerView: 1,
                        },
                        640: {
                            slidesPerView: 1,
                        },
                        1024: {
                            slidesPerView: 2,
                        },
                    }}
                    modules={[Autoplay, Navigation]}
                    navigation={{
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    }}
                >
                    {
                        customersComment?.length
                            ?
                            customersComment.map(data =>
                                <SwiperSlide key={data._id}>
                                    <CustomerReview key={data._id} {...data} />
                                </SwiperSlide>)
                            : null
                    }
                </Swiper>

                {
                    customersComment?.length && customersComment.length < 3
                        ?
                        null
                        :
                        <div className='flex items-center gap-3 absolute -top-[65px] z-20 left-0'>
                            <button className='shadow-sm swiper-button-next bg-white font-bold transition-all duration-300 hover:bg-panel-darkGreen hover:text-white flex items-center gap-2 font-peyda rounded-xl text-panel-darkGreen text-sm text-center p-3'>
                                <FaAngleLeft className=' rotate-180 size-[22px]' />
                            </button>
                            <button className='shadow-sm swiper-button-prev bg-white font-bold transition-all duration-300 hover:bg-panel-darkGreen hover:text-white flex items-center gap-2 font-peyda rounded-xl text-panel-darkGreen text-sm text-center p-3'>
                                <FaAngleLeft className='size-[22px]' />
                            </button>
                        </div>
                }

            </div>

        </div>
    )
}

export default CustomersReview