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
                <p className="text-title-text tracking-wide font-peyda text-[14px]">{title}</p>
            </div>

            {
                url &&
                <Link href={url}
                    className="bg-description-text text-[10px] p-[6px] relative px-3 flex items-center gap-1 rounded-full cursor-pointer">
                    <div className="">مشاهده همه</div>
                    <FaAngleLeft className="size-4 text-blue-dark z-20" />
                </Link>
            }

        </div>
    )
}

export default memo(BlockTitle);