import { commentProps } from '@/global.t'
import { useMemo } from 'react'
import { IoStar } from 'react-icons/io5'
import { SlUser } from 'react-icons/sl'

const Comment = ({ body, createdAt, star, creator }: commentProps) => {

    const userRate = useMemo(() => {
        let filledStars = [];
        let starsCount = star

        for (let i = 5; i < 5; i--) {
            filledStars.push(<IoStar className={`${starsCount > 0 ? 'text-gold' : null}`} />)
            starsCount > 0 && starsCount--
        }

        return filledStars;
    }, [star])

    return (
        <div data-aos-duration="550" data-aos="zoom-in" className="w-full p-4 md:p-5 bg-primary-black rounded-md">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-b-neutral-200/60">

                <div className="flex items-center gap-x-3.5">

                    <div className="ch:size-6 size-14 border border-white flex-center rounded-full bg-secondary-black"><SlUser /></div>

                    <div className="flex flex-col gap-1">

                        <div className="flex items-center gap-x-1 "><span className="inline-block max-w-40 text-[15px] truncate">{creator?._id}</span></div>

                        <span dir='ltr' className="font-danaLight text-sm opacity-70">
                            {
                                new Date(createdAt).toLocaleDateString('fa-Ir') + ' - ' + new Date(createdAt).toLocaleTimeString('fa-Ir')
                            }
                        </span>
                    </div>

                </div>
                <div className="flex items-center text-black ch:size-[18px] h-full mb-auto gap-1">
                    {userRate}
                </div>
            </div>
            <p className="font-danaLight text-[14px] break-words">{body}</p>
        </div>
    )
}

export default Comment