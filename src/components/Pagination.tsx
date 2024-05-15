import { useEffect, useState } from "react"
import Button from "./Button"
import { unknownObjProps } from "@/global.t"
import Product from "./Product"
import { itemsSorter } from "@/utils"

interface paginationProps {
    currentPage?: number
    itemsPerPage?: number
    itemsArray: []
    paginationType?: 'withPage' | 'seeMore'
    sortType: string
}

const Pagination = ({ itemsArray, itemsPerPage = 12, paginationType = 'seeMore', sortType }: paginationProps) => {

    const [currentPage, setCurrentPage] = useState(1)
    const [paginatedItems, setPaginatedItems] = useState([...itemsArray])

    const startIndex = paginationType == 'seeMore' ? 0 : currentPage * itemsPerPage - itemsPerPage
    const endIndex = currentPage * itemsPerPage
    const availablePages = Math.ceil(itemsArray.length / itemsPerPage)

    const nextPageHandler = () => { currentPage < availablePages && setCurrentPage(preve => preve + 1) }
    const previousPageHandler = () => { currentPage > 1 && setCurrentPage(preve => preve - 1) }

    useEffect(() => { // this effect first of all sort the pure items and then slice them to prevent losing sorted items between currentpage changing
        setPaginatedItems(itemsSorter(sortType, [...itemsArray].slice(startIndex, endIndex)))
    }, [currentPage, itemsArray, sortType])

    return (
        <>

            <div className={"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6"}>
                {paginatedItems?.map((data: unknownObjProps<{}>) => <Product {...data} key={data._id as string} />)}
            </div >

            <>
                {(availablePages > 1 && currentPage < availablePages) &&
                    <div className={`flex ${paginationType == 'withPage' && 'border'} max-w-[250px] m-auto w-full ch:flex ch:items-center ch:justify-center border-black/20 -space-x-px ch:overflow-hidden font-peyda cursor-pointer text-title-text text-[13px] ch:border-l overflow-hidden ch:border-white/10 bg-secondary-black ch:transition-all h-10 ch:w-full ch:h-full rounded-md mt-7`}>
                        {
                            paginationType == 'seeMore'
                                ?
                                <Button filled fn={nextPageHandler} text="مشاهده بیشتر" size="md" />
                                :
                                <>

                                    <div onClick={nextPageHandler} className={`hover:bg-black/40 ${currentPage >= availablePages && 'cursor-not-allowed'} px-5`}>بعدی</div>

                                    {currentPage < availablePages && <div onClick={nextPageHandler} className="hover:bg-black/40 px-[6px]">{currentPage + 1}</div>}

                                    <div className="flex-center px-2 text-[15px] flex-center bg-green/80 hover:bg-green/90">{currentPage}</div>

                                    {currentPage > 1 && <div onClick={previousPageHandler} className="hover:bg-black/40 px-[6px]">{currentPage - 1}</div>}

                                    <div onClick={previousPageHandler} className={`hover:bg-black/40 ${currentPage < 2 && 'cursor-not-allowed'} py-2 px-5`}>قبلی</div>
                                </>
                        }
                    </div>
                }
            </>
        </>
    )
}

export default Pagination;