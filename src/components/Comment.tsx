import { commentProps } from '@/global.t'
import { memo, useMemo } from 'react'
import { IoStar } from 'react-icons/io5'
import { SlUser } from 'react-icons/sl'
import { RiAdminFill } from "react-icons/ri";
import Image from 'next/image';

const Comment = ({ body, createdAt, rate, creator, isCreatedByCustomer }: commentProps) => {

    const userRate = useMemo(() => {
        let commentRates = [];
        let starsCount = rate

        for (let i = 5; i != 0; i--) {
            commentRates.push(<IoStar key={i} className={`${starsCount >= 1 ? 'text-gold' : null}`} />)
            starsCount > 0 && starsCount--
        }

        return commentRates;
    }, [rate])

    return (
        <div data-aos-duration="550" data-aos="zoom-in" className="w-full p-4 md:p-5 bg-primary-black rounded-md">

            <div className="flex  sm:flex-row flex-col justify-between pb-4 mb-4 border-b border-b-neutral-200/60">

                <div className="flex items-center gap-x-3.5">

                    <div className={`ch:size-6 size-14 border relative ${creator.role == 'USER' ? 'border-white' : 'border-gold'} flex-center rounded-full bg-secondary-black`}>
                        {
                            creator.profile ?
                                <Image
                                    className='w-full h-full rounded-full object-cover'
                                    src={creator.profile}
                                    alt='profile'
                                    fill
                                />
                                :
                                creator.role == 'USER' ? <SlUser /> : <RiAdminFill />
                        }
                    </div>

                    <div className="flex flex-col gap-1">

                        <div className="flex items-center gap-x-1 ">
                            <span className="inline-block max-w-40 text-[15px] whitespace-nowrap">
                                {creator?.username + `${isCreatedByCustomer ? '(خریدار)' : ''}`} <span className={`${creator.role == 'ADMIN' && 'text-gold'}`}>{creator.role == 'ADMIN' && '- ادمین'}</span>
                            </span>
                        </div>

                        <span dir='ltr' className="font-danaLight text-sm opacity-70">
                            {
                                new Date(createdAt!).toLocaleDateString('fa-IR') + ' - ' + new Date(createdAt!).toLocaleTimeString('fa-IR')
                            }
                        </span>
                    </div>

                </div>

                <div className="flex items-center justify-end text-black ch:size-[18px] h-full mb-auto gap-1">
                    {userRate}
                </div>
            </div>
            <p className="font-danaLight text-[14px] break-words leading-7">{body}</p>
        </div>
    )
}

export default memo(Comment)