import { commentProps } from '@/global.t';
import Image from 'next/image';
import React from 'react'
import { FaStar } from "react-icons/fa";

const CustomerReview = ({ body, creator, createdAt, rate, productID }: commentProps) => {
    return (
        <div className='flex items-center max-w-[525px] m-auto w-full relative shadow-sm'>
            <div className='p-6 flex items-center gap-8 bg-white rounded-xl shadow-sm w-[458px] relative overflow-visible'>
                <div className='flex flex-col gap-5 flex-[2]'>
                    <div className='flex items-center gap-2'>
                        <div className='size-[54px] flex-center rounded-full'>
                            {
                                !!creator.profile
                                    ?
                                    <img src={creator.profile} alt="" />
                                    :
                                    <Image width={100} height={100} src={'/images/imageNotFound.webp'} alt='user profile' />
                            }
                        </div>
                        <div className='flex font-peyda items-start flex-col gap-1'>
                            <p className='text-panel-darkTitle font-bold'>{creator.nameLastName || creator.username}</p>
                            <p className='text-[12px] text-panel-caption font-sans'>{new Date(createdAt!).toLocaleDateString('fa-IR')}</p>
                        </div>
                    </div>
                    <p className='font-sans text-[13px] text-panel-darkTitle min-h-12'>{body}</p>
                    <div className='flex items-center gap-2'>
                        {Array(rate).fill(0).map(() => <FaStar className='text-gold' />)}
                        {Array(5 - rate).fill(0).map(() => <FaStar className='text-panel-caption' />)}
                        <p className='font-peyda text-panel-darkTitle pt-1'>{rate}</p>
                    </div>
                </div>
                <div className='flex-1'></div>
            </div>

            <div className='absolute border border-panel-lightBlue xl:left-6 -left-2 size-[200px] rounded-full bg-panel-caption shadow-sm z-20 flex-center overflow-hidden'>
                <Image
                    alt='productImage'
                    width={300}
                    height={300}
                    quality={100}
                    className='size-full object-contain bg-center'
                    src={productID.image?.length ? productID.image[0] : '/images/imageNotFound.webp'}
                />
            </div>
        </div>

    )
}

export default CustomerReview