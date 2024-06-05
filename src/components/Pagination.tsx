import { useEffect, useMemo, useState } from "react"
import Button from "./Button"
import { productDataTypes, unknownObjProps } from "@/global.t"
import Product from "./Product"
import { itemsSorter } from "@/utils"
import { productSortOptions } from "@/data"
import { BsSortDown } from "react-icons/bs"

interface paginationProps {
    currentPage?: number
    itemsPerPage?: number
    itemsArray: []
    paginationType?: 'withPage' | 'seeMore'
}

const Pagination = ({ itemsArray, itemsPerPage = 12, paginationType = 'seeMore' }: paginationProps) => {

    // static codes
    const [currentPage, setCurrentPage] = useState(1)
    const [paginatedItems, setPaginatedItems] = useState([...itemsArray])
    const [sortBy, setSortBy] = useState('')

    const { startIndex, endIndex } = useMemo(() => {
        return {
            startIndex: paginationType == 'seeMore' ? 0 : currentPage * itemsPerPage - itemsPerPage,
            endIndex: currentPage * itemsPerPage
        }
    }, [currentPage, itemsPerPage, paginationType])

    const availablePages = Math.ceil(itemsArray.length / itemsPerPage)

    const nextPageHandler = () => { currentPage < availablePages && setCurrentPage(prev => prev + 1) }
    const previousPageHandler = () => { currentPage > 1 && setCurrentPage(prev => prev - 1) }
    // static codes


    const sortOptions = [...productSortOptions].map(opt => (
        <li
            className={`cursor-pointer transition-all ${sortBy === opt.sort && "text-white-red"}`}
            key={opt.sort}
            onClick={() => { opt.sort == sortBy ? setSortBy('') : setSortBy(opt.sort) }}
        >
            {opt.text}
        </li>
    ))

    useEffect(() => { setSortBy('') }, [itemsArray])

    useEffect(() => {
        setPaginatedItems(itemsSorter(sortBy, [...itemsArray].slice(startIndex, endIndex)))
    }, [currentPage, itemsArray, sortBy, startIndex, endIndex]) // this effect first of all sort the pure items and then slice them to prevent losing sorted items between current page changing

    return (
        <>
            {/* dynamic elements */}
            <div className="flex flex-col">

                <div className="text-[11px] flex justify-between overflow-auto gap-6 items-center rounded-md p-3 bg-secondary-black">

                    <div className="flex items-center gap-5">

                        <div className="flex items-center flex-nowrap gap-2 text-white">
                            <BsSortDown className="size-6" />
                            <p>مرتب سازی : </p>
                        </div>

                        <ul className="flex items-center text-description-text gap-6 select-none">{sortOptions}</ul>

                    </div>

                    <div className="text-white hidden sm:block text-[13px]">{itemsArray.length} کالا</div>

                </div>

                <div className={"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6"}>
                    {paginatedItems?.map((data: productDataTypes) => <Product {...data} key={data._id} />)}
                </div >

            </div>
            {/* dynamic elements */}



            {/* static html */}
            <>
                {(availablePages > 1 && currentPage < availablePages) &&
                    <div className={`flex ${paginationType == 'withPage' && 'border'} max-w-[250px] m-auto w-full ch:flex ch:items-center ch:justify-center border-black/20 -space-x-px ch:overflow-hidden font-peyda cursor-pointer text-title-text text-[13px] ch:border-l overflow-hidden ch:border-white/10 bg-secondary-black ch:transition-all h-10 ch:w-full ch:h-full rounded-md mt-7`}>
                        {
                            paginationType == 'seeMore'
                                ?
                                <Button filled fn={nextPageHandler} text="مشاهده بیشتر" size="md" />
                                :
                                <>

                                    <div onClick={nextPageHandler} className={`hover:bg-black/40 ${currentPage >= availablePages && 'cursor-wait'} px-5`}>بعدی</div>

                                    {currentPage < availablePages && <div onClick={nextPageHandler} className="hover:bg-black/40 px-[6px]">{currentPage + 1}</div>}

                                    <div className="flex-center px-2 text-[15px] flex-center bg-green/80 hover:bg-green/90">{currentPage}</div>

                                    {currentPage > 1 && <div onClick={previousPageHandler} className="hover:bg-black/40 px-[6px]">{currentPage - 1}</div>}

                                    <div onClick={previousPageHandler} className={`hover:bg-black/40 ${currentPage < 2 && 'cursor-wait'} py-2 px-5`}>قبلی</div>
                                </>
                        }
                    </div>
                }
            </>
            {/* static html */}

        </>
    )
}

export default Pagination;