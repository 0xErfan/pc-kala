import { FaArrowLeft } from "react-icons/fa6";

interface Props {
    currentPage: number
    latestPage: number
    currentPageUpdater: (page: number) => void
}

const Pagination = ({ currentPage, latestPage, currentPageUpdater }: Props) => {

    if (latestPage == 1) return null;

    const nextPageHandler = () => {
        if (currentPage == latestPage) return;
        currentPageUpdater(currentPage + 1)
    }

    const previousPageHandler = () => {
        if (currentPage == 1) return;
        currentPageUpdater(currentPage - 1)
    }

    return (
        <div className="flex items-center gap-4 justify-center text-center m-auto my-5 font-peyda bg-white rounded-full">

            <button onClick={nextPageHandler} className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-full select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                <FaArrowLeft className='rotate-180' />
                بعد
            </button>

            <div className="flex items-center gap-2">

                {
                    currentPage !== latestPage
                        ?
                        <button onClick={nextPageHandler} className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-full  text-center align-middle font-sans text-xs font-medium uppercase transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                            <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 ">{currentPage + 1}</span>
                        </button>
                        : null
                }

                <button className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-full  text-panel-darkGreen text-center align-middle font-sans text-xs font-medium uppercase transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                    <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 text-[17px]">{currentPage}</span>
                </button>

                {
                    currentPage - 1 !== 0
                        ?
                        <button onClick={previousPageHandler} className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-full text-center align-middle font-sans text-xs font-medium uppercase transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                            <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">{currentPage - 1}</span>
                        </button>
                        : null
                }

            </div>

            <button onClick={previousPageHandler} className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-full select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                قبل
                <FaArrowLeft />
            </button>

        </div>
    )
}

export default Pagination;