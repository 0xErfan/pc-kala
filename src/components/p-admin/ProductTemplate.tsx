import { categoriesDate } from '@/data'
import { categories } from '@/global.t'
import { engCategoryToPersian, engSubCategoryToPersian } from '@/utils'
import { MdDeleteOutline } from "react-icons/md";
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { FiPlus } from 'react-icons/fi'
import ProductSpec from './ProductSpec';

export interface ProductSpecs {
    specKey: string
    value: string
    id: number
    canDelete: boolean
}

const ProductTemplate = () => {

    const [selectedCategory, setSelectedCategory] = useState<string | number>(-1)
    const [availableSubCategories, setAvailableSubCategories] = useState<string[]>([])
    const [productsSpecs, setProductSpecs] = useState<Omit<ProductSpecs, 'canDelete'>[]>([{ id: 1, specKey: '', value: '' }])
    const [isDeleting, setIsDeleting] = useState(false)
    const [lastAddedSpecID, setLastAddedSpecID] = useState(1)

    const updateProductSpec = (key: string, value: string, id: number) => {
        let currentProductSpecs = [...productsSpecs]
        const doesSpecExist = currentProductSpecs.findIndex(data => data.id == id)
        if (doesSpecExist == -1) {
            currentProductSpecs = [...currentProductSpecs, { id, specKey: key, value }]
        } else {
            currentProductSpecs[doesSpecExist] = { ...currentProductSpecs[doesSpecExist], [key]: value }
        }
        setProductSpecs(currentProductSpecs)
    }

    const deleteProductSpec = (id: number) => {
        setProductSpecs(prevSpecs => prevSpecs.filter(spec => spec.id !== id));
        setLastAddedSpecID(prev => prev - 1)
    };

    useEffect(() => {
        const doesHaveSubCategories = Object.entries(categoriesDate).some(category => {
            if (category[0] == selectedCategory) {
                setAvailableSubCategories(category[1])
                return true
            }
        })
        !doesHaveSubCategories && setAvailableSubCategories([])
    }, [selectedCategory])

    return (
        <div data-aos="zoom-out" className="mt-12 mb-20">

            <h3 className='text-[26px] font-peyda font-bold text-panel-darkBlue'>ایجاد محصول جدید</h3>

            <div className='flex items-center xl:flex-row flex-col ch:w-full gap-4 my-4'>

                <div className={'flex-[2.4] grid grid-cols-1 h-full mb-auto rounded-xl p-4 bg-white shadow-sm'}>
                    <div className="flex items-center flex-col ch:w-full ch:flex-1 gap-8">

                        <div className="flex flex-col gap-2 shadow-sm text-panel-darkTitle font-peyda text-[20px]">
                            <p>نام محصول</p>
                            <input className="bg-panel-white rounded-xl p-3" placeholder="Laptop Acer..." type="text" />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            <div className="flex flex-col gap-2 shadow-sm text-panel-darkTitle font-peyda text-[20px]">
                                <p>قیمت محصول(تومان)</p>
                                <input className="bg-panel-white rounded-xl p-3" placeholder="1,000,000" type="text" />
                            </div>
                            <div className="flex flex-col gap-2 shadow-sm text-panel-darkTitle font-peyda text-[20px]">
                                <p>تخفیف محصول(درصد)</p>
                                <input className="bg-panel-white rounded-xl p-3" placeholder="0" type="text" />
                            </div>
                        </div>

                        <div className="flex items-center gap-2 ch:w-full w-full ch:flex-1 rounded-xl bg-white">

                            <div className={'text-panel-darkTitle py-2 font-peyda'}>
                                <p className={'text-[20px] mb-2'}>دسته بندی اصلی</p>
                                <div className={'w-full ch:w-full'}>
                                    <select onChange={e => setSelectedCategory(e.target.value)} value={selectedCategory} className={'bg-panel-white p-4 rounded-xl'}>
                                        <option value={-1}>دسته بندی محصول را مشخص کنید</option>
                                        {Object.keys(categoriesDate).map(data => <option key={data} value={data}>{engCategoryToPersian(data as categories)}</option>)}
                                    </select>
                                </div>
                            </div>

                            {
                                availableSubCategories?.length
                                    ?
                                    <div data-aos={'fade-in'} className={'text-panel-darkTitle py-2 font-peyda'}>
                                        <p className={'text-[20px] mb-2'}>زیرمجموعه</p>
                                        <div className={'w-full ch:w-full'}>
                                            <select className={'bg-panel-white p-4 rounded-xl'}>
                                                {
                                                    availableSubCategories.map(data => <option key={data} value={data}>{engSubCategoryToPersian(data)}</option>)
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    :
                                    null
                            }

                        </div>

                        <div className="flex flex-col gap-2 text-panel-darkTitle font-peyda text-[20px]">

                            <p>مشخصات محصول</p>

                            <ProductSpec
                                id={1}
                                specKey={productsSpecs[0].specKey}
                                value={productsSpecs[0].value}
                                canDelete={false}
                                updateProductSpec={updateProductSpec}
                                deleteProductSpec={deleteProductSpec}
                            />

                            <div className={`${lastAddedSpecID < 2 && 'hidden'} flex flex-col gap-2`}>
                                {
                                    [...productsSpecs]
                                        .filter(data => data.id !== 1)
                                        .map(specD =>
                                            <ProductSpec
                                                id={specD.id}
                                                key={specD.id}
                                                canDelete={isDeleting}
                                                specKey={specD.specKey}
                                                value={specD.value}
                                                updateProductSpec={updateProductSpec}
                                                deleteProductSpec={deleteProductSpec}
                                            />
                                        )
                                }
                            </div>

                            <div className='flex items-center gap-2'>

                                <div onClick={() => {
                                    setLastAddedSpecID(prev => prev + 1)
                                    setProductSpecs(prev => [...prev, { id: lastAddedSpecID + 1, specKey: '', value: '' }])
                                }}
                                    className="flex items-center w-20 cursor-pointer whitespace-nowrap text-[15px] justify-evenly gap-1 rounded-md text-panel-darkGreen bg-panel-lightGreen p-1"
                                >
                                    <p className="text-md">افزودن</p>
                                    <FiPlus className="size-6" />
                                </div>

                                {
                                    productsSpecs?.length > 1
                                        ?
                                        <div onClick={() => setIsDeleting(prev => !prev)} className="flex ml-2 items-center w-20 cursor-pointer whitespace-nowrap text-[15px] justify-evenly gap-1 rounded-md text-panel-darkRed bg-panel-lightRed p-1">
                                            <p className="text-md">حذف</p>
                                            <MdDeleteOutline className="size-6" />
                                        </div>
                                        : null
                                }

                            </div>
                        </div>

                        <button className='p-3 text-center font-peyda text-[18px] px-5 flex-center text-white bg-panel-darkGreen rounded-xl'>ایجاد محصول جدید</button>

                    </div>
                </div>

                <div className={'flex-1 rounded-xl p-4 h-full mb-auto bg-white shadow-sm'}>

                    <div className={'font-peyda text-[25px] pb-3'}>اپلود عکس</div>

                    <div className={'xl:flex block gap-3 flex-col'}>

                        <div className={' aspect-square xl:block hidden w-full size-[370px] bg-panel-white rounded-xl'}><Image className={'object-cover size-full'} width={300} height={300} src="/images/imageNotFound.webp" alt="idk" /></div>

                        <div className={'grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3'}>
                            <div className={' aspect-square bg-panel-white rounded-xl'}><Image className={'object-cover size-full'} width={300} height={300} src="/images/imageNotFound.webp" alt="idk" /></div>
                            <div className={' aspect-square bg-panel-white rounded-xl'}><Image className={'object-cover size-full'} width={300} height={300} src="/images/imageNotFound.webp" alt="idk" /></div>
                            <div className={' aspect-square bg-panel-white rounded-xl'}><Image className={'object-cover size-full'} width={300} height={300} src="/images/imageNotFound.webp" alt="idk" /></div>
                            <div className={' border-dotted border-[3px] cursor-pointer aspect-square flex-center rounded-xl'}><FiPlus className={'size-7 text-panel-darkGreen bg-panel-lightGreen p-1 rounded-full'} /></div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ProductTemplate;