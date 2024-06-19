import { useEffect, useRef, useState } from "react"
import Button from "./Button"
import { productDataTypes } from "@/global.t"
import Product from "./Product"
import { itemsSorter } from "@/utils"
import { productSortOptions } from "@/data"
import { BsSortDown } from "react-icons/bs"
import Loader from "./Loader"
import { useAppDispatch } from "@/Hooks/useRedux"
import { loadMoreUpdater } from "@/Redux/Features/globalVarsSlice"
import { useRouter } from "next/router"


interface InfiniteScrollProps {
    itemsArray: productDataTypes[]
    showLoader: boolean
}

const InfiniteScroll = ({ itemsArray, showLoader }: InfiniteScrollProps) => {

    const [paginatedItems, setPaginatedItems] = useState([...itemsArray])
    const [sortBy, setSortBy] = useState('')
    const loadingRef = useRef<HTMLDivElement>(null)
    const dispatch = useAppDispatch()
    const router = useRouter()

    const sortOptions = [...productSortOptions].map(opt => (
        <li
            className={`cursor-pointer transition-all ${sortBy === opt.sort && "text-white-red"}`}
            key={opt.sort}
            onClick={() => { opt.sort == sortBy ? setSortBy('') : setSortBy(opt.sort) }}
        >
            {opt.text}
        </li>
    ))

    useEffect(() => {

        const handleScroll = () => {

            if (loadingRef.current) {
                const rect = loadingRef.current.getBoundingClientRect();

                const isInView = (
                    rect.top >= 0 &&
                    rect.left >= 0 &&
                    rect.bottom - 10 <= (window.innerHeight || document.documentElement.clientHeight) &&
                    rect.right - 10 <= (window.innerWidth || document.documentElement.clientWidth)
                );

                dispatch(loadMoreUpdater(isInView))
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll)

    }, [dispatch, router.query]);

    useEffect(() => {
        setPaginatedItems(itemsSorter(sortBy, [...itemsArray as []]))
    }, [itemsArray, sortBy]) // keep the existing products and add the updated products to them and then filter again

    return (
        <>
            <div className="flex flex-col">

                <div className="text-[11px] flex justify-between overflow-auto gap-6 items-center rounded-md p-3 bg-secondary-black">

                    <div className="flex items-center gap-5">

                        <div className="flex items-center flex-nowrap gap-2 text-white">
                            <BsSortDown className="size-6" />
                            <p>مرتب سازی : </p>
                        </div>

                        <ul className="flex items-center text-description-text gap-6 select-none">{sortOptions}</ul>

                    </div>

                </div>

                <div className={"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6"}>
                    {
                        paginatedItems?.map((data: productDataTypes) => <Product {...data} key={data._id} />)
                    }
                </div >

            </div>

            <>
                <div className={`flex max-w-[250px] m-auto w-full ch:flex ch:items-center ch:justify-center border-black/20 -space-x-px ch:overflow-hidden font-peyda cursor-pointer text-title-text text-[13px] ch:border-l overflow-hidden ch:border-white/10 bg-secondary-black ch:transition-all h-10 ch:w-full ch:h-full rounded-md mt-7`}>
                    {
                        <div
                            ref={loadingRef}
                            className={`w-full ch:w-full`}
                        >
                            <Button
                                filled
                                text={!showLoader ? '' : 'تمام محصولات نمایش داده شده'}
                                Icon={!showLoader ? <Loader /> : <></>} size="md"
                            />
                        </div>
                    }
                </div>

            </>
        </>
    )
}

export default InfiniteScroll;