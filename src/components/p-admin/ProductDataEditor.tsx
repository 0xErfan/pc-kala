import { categories, productDataTypes, unknownObjProps } from '@/global.t'
import React, { useEffect, useRef, useState } from 'react'
import Loader from '../Loader'
import { MdDeleteOutline } from 'react-icons/md'
import { FiPlus } from 'react-icons/fi'
import ProductSpec from './ProductSpec'
import { engCategoryToPersian, engSubCategoryToPersian, showToast } from '@/utils'
import { categoriesDate } from '@/data'
import { ModalProps } from '../Modal'
import { modalDataUpdater } from '@/Redux/Features/globalVarsSlice'
import { useAppDispatch } from '@/Hooks/useRedux'
import { ProductSpecs } from './ProductTemplate'
import ProductImageUpdater from './ProductImageUpdater'

interface Props {
    productsUpdater: () => void
    closeUpdateForm: () => void
}

const ProductDataEditor = (
    {
        discount: prdDiscount,
        price: prdPrice,
        name: prdName,
        category: prdCategory,
        "sub-cat": prdSubCat,
        image,
        specs,
        _id,
        productsUpdater,
        closeUpdateForm
    }: productDataTypes & Props) => {


    const [name, setName] = useState(prdName)
    const [price, setPrice] = useState<number | string>(prdPrice)
    const [discount, setDiscount] = useState<number | string>(prdDiscount)
    const [selectedCategory, setSelectedCategory] = useState<string | number>(prdCategory)
    const [availableSubCategories, setAvailableSubCategories] = useState<string[]>([])
    const [subCategory, setSubCategory] = useState<string>(prdSubCat!)

    const [productsSpecs, setProductSpecs] = useState<Omit<ProductSpecs, 'canDelete'>[]>(Object.entries(specs).map((data, index) => (
        {
            specKey: data[1].title,
            value: data[1].value, id: index + 1
        }
    )))

    const [imageLinks, setImageLinks] = useState<Array<string> | 0>(image)

    const [isDeleting, setIsDeleting] = useState(false)
    const [lastAddedSpecID, setLastAddedSpecID] = useState(Object.keys(specs).length)
    const [trigger, setTrigger] = useState(false)
    const [createProductTrigger, setCreateProductTrigger] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const scrollToTopDiv = useRef<HTMLDivElement>(null)

    const dispatch = useAppDispatch()

    useEffect(() => {

        if (createProductTrigger) {

            setTrigger(true);

            if (typeof imageLinks == 'number' && imageLinks === 0) {
                setImageLinks(image)
                setTrigger(false)
                setCreateProductTrigger(false)
                return
            }

            if (imageLinks?.length !== image.length) {
                updateProductData(imageLinks)
            } else {
                const isLinkAndImageLinkArraysAreEqual = imageLinks.every(data => image.some(imageLinks => imageLinks === data))
                if (!isLinkAndImageLinkArraysAreEqual) updateProductData(imageLinks)
            }
        }

    }, [imageLinks, createProductTrigger, image])

    const updateProductData = async (links: string[]) => {

        try {

            const formattedSpecs: unknownObjProps<unknownObjProps<string>> = {}

            Object.entries(productsSpecs)

                .forEach(data => {

                    const key = data[1].specKey

                    formattedSpecs[key] = {
                        title: data[1]['specKey'],
                        value: data[1]['value']
                    }
                })

            const res = await fetch('/api/products/update', {
                method: "PUT",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    _id: _id,
                    name,
                    price,
                    discount,
                    image: links,
                    category: selectedCategory,
                    ['sub-cat']: subCategory,
                    specs: formattedSpecs
                })
            })

            const data = await res.json()

            dispatch(modalDataUpdater({
                isShown: true,
                message: data.message,
                status: res.ok,
                cancelBtnText: false,
                title: 'تغییر اطلاعات محصول',
                fn: () => res.ok && productsUpdater(),
                onCancel: () => res.ok && productsUpdater(),
            } as ModalProps))

        } catch (error) { console.log(error) }
        finally { setIsLoading(false) }
    };

    const checkDataFieldsAndCreate = () => {

        if (!name.trim().length) return showToast(false, 'نام محصول را وارد کنید')
        if (isNaN(+price!) || !price) return showToast(false, 'قیمتو به درستی وارد کن')
        if (isNaN(+discount!) || +discount! > 100 || +discount! < 0) return showToast(false, 'تخفیف عددی بین ۰ و ۱۰۰ است')
        if (selectedCategory == -1) return showToast(false, 'دسته بندی محصول را انتخاب کنید')

        const isProductSpecsValuesEmpty = productsSpecs.some(data => !data.specKey?.trim().length || !String(data.value).trim().length)
        if (isProductSpecsValuesEmpty) return showToast(false, 'مشخصات محصول را کامل وارد کنید')

        dispatch(modalDataUpdater({
            isShown: true,
            message: 'آیا از تغییرات اعمال شده اطمینان دارید؟',
            status: true,
            title: 'بروزرسانی اطلاعات محصول',
            fn: () => setCreateProductTrigger(true)
        } as ModalProps))
    }

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

    useEffect(() => { scrollToTopDiv.current?.scrollIntoView({ behavior: 'smooth', block: 'end' }) }, [])

    useEffect(() => {
        const doesHaveSubCategories = Object.entries(categoriesDate).some(category => {
            if (category[0] == selectedCategory) {
                setAvailableSubCategories(category[1])
                setSubCategory(category[1][0])
                return true
            }
        })

        !doesHaveSubCategories && setAvailableSubCategories([])
    }, [selectedCategory])

    return (
        <div ref={scrollToTopDiv} data-aos="zoom-in" className="mt-12 mb-20">

            <h3 className='md:text-[26px] text-xl font-peyda font-bold text-panel-darkBlue'>بروزرسانی اطلاعات محصول</h3>

            <div className='flex items-center xl:flex-row flex-col ch:w-full gap-4 my-4'>

                <div className={'flex-[2.4] grid grid-cols-1 h-full mb-auto rounded-xl p-4 bg-white shadow-sm'}>
                    <div className="flex items-center flex-col overflow-hidden ch:w-full ch:flex-1 gap-8">

                        <div className="flex flex-col gap-2 shadow-sm text-panel-darkTitle font-peyda text-[20px]">

                            <p>نام محصول</p>

                            <input
                                value={name}
                                onChange={e => setName(e.target.value)}
                                className="bg-panel-white rounded-xl p-3"
                                placeholder="Laptop Acer..."
                                type="text"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-2">

                            <div className="flex flex-col gap-2 shadow-sm text-panel-darkTitle font-peyda text-[20px]">
                                <p>قیمت محصول(تومان)</p>

                                <input
                                    value={price}
                                    onChange={e => setPrice(e.target.value)}
                                    className="bg-panel-white rounded-xl p-3"
                                    placeholder="1,000,000"
                                    type='text'
                                />
                            </div>

                            <div className="flex flex-col gap-2 shadow-sm text-panel-darkTitle font-peyda text-[20px]">
                                <p>تخفیف محصول(درصد)</p>

                                <input
                                    value={discount}
                                    onChange={e => setDiscount(e.target.value)}
                                    className="bg-panel-white rounded-xl p-3"
                                    placeholder="0"
                                    type="text"
                                />
                            </div>

                        </div>

                        <div className="flex items-center gap-2 ch:w-full w-full ch:flex-1 rounded-xl bg-white">

                            <div className={'text-panel-darkTitle py-2 font-peyda'}>

                                <p className={'text-[20px] mb-2'}>دسته بندی اصلی</p>

                                <div className={'w-full ch:w-full'}>

                                    <select onChange={e => setSelectedCategory(e.target.value)} value={selectedCategory} className={'bg-panel-white p-4 rounded-xl'}>

                                        <option value={-1}>دسته بندی محصول را مشخص کنید</option>

                                        {
                                            Object.keys(categoriesDate).map(data => <option key={data} value={data}>{engCategoryToPersian(data as categories)}</option>)
                                        }

                                    </select>
                                </div>

                            </div>

                            {
                                availableSubCategories?.length
                                    ?
                                    <div data-aos={'fade-in'} className={'text-panel-darkTitle py-2 font-peyda'}>
                                        <p className={'text-[20px] mb-2'}>زیرمجموعه</p>
                                        <div className={'w-full ch:w-full'}>
                                            <select value={subCategory} onChange={e => setSubCategory(e.target.value)} className={'bg-panel-white p-4 rounded-xl'}>
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

                        <div className='w-full hidden xl:flex ch:flex-1 ch:w-full gap-3'>
                            <button name='update product data' disabled={isLoading} onClick={checkDataFieldsAndCreate} className='p-3 text-center font-peyda text-[18px] px-5 flex-center text-white bg-panel-darkGreen rounded-xl'>
                                {
                                    isLoading
                                        ?
                                        <Loader />
                                        :
                                        ' بروزرسانی اطلاعات محصول'
                                }
                            </button>

                            <button name='cancel operation' onClick={closeUpdateForm} className='p-3 text-center font-peyda text-[18px] px-5 flex-center bg-panel-darkRed text-white rounded-xl'>لغو</button>
                        </div>
                    </div>
                </div>

                <ProductImageUpdater imagesData={image} trigger={trigger} updateLoading={(status: boolean) => setIsLoading(status)} imageDataSender={imageLink => setImageLinks(imageLink)} />

                <div className='w-full xl:hidden flex ch:flex-1 ch:w-full gap-3'>
                    <button name='update product data' disabled={isLoading} onClick={checkDataFieldsAndCreate} className='p-3 text-center font-peyda text-[18px] px-5 flex-center text-white bg-panel-darkGreen rounded-xl'>
                        {
                            isLoading
                                ?
                                <Loader />
                                :
                                ' بروزرسانی اطلاعات محصول'
                        }
                    </button>

                    <button name='cancel operation' onClick={closeUpdateForm} className='p-3 text-center font-peyda text-[18px] px-5 flex-center bg-panel-darkRed text-white rounded-xl'>لغو</button>
                </div>

            </div>
        </div>
    )
}

export default ProductDataEditor
