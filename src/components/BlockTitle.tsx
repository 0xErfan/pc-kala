import { ReactNode, memo } from 'react'
import { FaAngleLeft } from 'react-icons/fa'
import Link from 'next/link'
type BlockTitleProps = { title: string, Icon: ReactNode, url?: string }

const BlockTitle = ({ title, url, Icon }: BlockTitleProps) => {

    return (
        <div className="container relative flex items-center ch:z-20 justify-between">

            <span className="dotted-border"></span>

            <div className="flex items-center gap-3 relative ml-auto px-3 bg-primary-black z-20">
                <div className="ch:size-10 text-blue-dark">{Icon}</div>
                <p className="text-white-red text-[12px]">{title}</p>
            </div>

            {
                url &&
                <div
                    className="bg-description-text text-[10px] p-[6px] relative px-3 flex items-center gap-1 rounded-full cursor-pointer">
                    <Link href={url} className="">مشاهده همه</Link>
                    <FaAngleLeft className="size-4 text-blue-dark z-20" />
                </div>
            }

        </div>
    )
}

export default memo(BlockTitle);