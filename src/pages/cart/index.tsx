import Footer from "@/components/Footer"
import Header from "@/components/Header"
import ProductCart from "@/components/ProductCart";
import { IoTrashOutline } from "react-icons/io5";
import Button from "@/components/Button";
import Progress from "@/components/Progress";
import { useAppDispatch, useAppSelector } from "@/Hooks/useRedux";
import { useEffect, useMemo, useState } from "react";
import { showToast, totalPriceCalculator } from "@/utils";
import { useRouter } from "next/router";
import Loader from "@/components/Loader";
import { userUpdater } from "@/Redux/Features/globalVarsSlice";
import prefix from "@/config/prefix";

const Card = () => {

    const navigate = useRouter()
    const dispatch = useAppDispatch()

    const { BasketItem } = useAppSelector(state => state.userSlice.relatedData) || []
    const userID = useAppSelector(state => state.userSlice.data._id)

    const [discountInput, setDiscountInput] = useState('')
    const [isDiscountValid, setIsDiscountValid] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {

        if (BasketItem?.length) {

            const doesBasketHaveDiscount = BasketItem.some(data => Object.keys(data.services)
                .some(data => {
                    if (data.includes('کد تخفیف')) return true
                }))

            setIsDiscountValid(doesBasketHaveDiscount)
        }
    }, [BasketItem]) // we check all userBasket product services to see if user already have the discount

    const checkAndActiveDiscount = async () => {

        if (isDiscountValid || isLoading) return;

        if (!discountInput.trim().length) return showToast(false, 'کد تخفیف نامعتبر است 😒')

        setIsLoading(true)

        const res = await fetch('/api/discount/use', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code: discountInput, basketID: BasketItem[0]._id, userID })
        })

        const data = await res.json()

        setTimeout(() => {
            setIsDiscountValid(res.ok)
            showToast(res.ok, data.message, res.ok ? 4500 : 2500)
            setIsLoading(false)
            if (res.ok) dispatch(userUpdater())
        }, 900);
    }

    const removeDiscount = async () => {

        const productWithDiscount = BasketItem.find(item =>
            Object.keys(item.services).some(service => service.includes('کد تخفیف'))
        ); // we just find the product that have the discount object in its services

        const updatedProductServices = { ...productWithDiscount?.services }

        for (let key in updatedProductServices) {
            if (key.includes('کد تخفیف')) {
                delete updatedProductServices[key]
            }
        }

        const res = await fetch('/api/discount/delete', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ productID: productWithDiscount?.productID, services: updatedProductServices, userID })
        })

        const data = await res.json()

        showToast(res.ok, data.message)
        if (res.ok) {
            setDiscountInput('')
            dispatch(userUpdater())
        }
    }

    const { sumOfProductsWithoutDiscount, sumOfProductsWithDiscount } = useMemo(() => {

        const sumOfPrices = { sumOfProductsWithoutDiscount: 0, sumOfProductsWithDiscount: 0 }

        BasketItem?.map(({ productID, count, services }) => {

            sumOfPrices.sumOfProductsWithoutDiscount += (totalPriceCalculator(productID?.price, productID?.discount, count, services, false))
            sumOfPrices.sumOfProductsWithDiscount += (totalPriceCalculator(productID?.price, productID?.discount, count, services))
        })

        return sumOfPrices
    }, [BasketItem])

    return (
        <>
            <Header />

            <section className=" bg-primary-black text-[11px]">

                <span className='md:pt-[160px] pt-[130px] block'></span>

                <div className="container mb-8">

                    <Progress />

                    <div className="flex items-center gap-5 flex-col lg:flex-row text-white ch:rounded-md ch:p-3 mt-12 ch:bg-secondary-black">

                        <div className="lg:flex-[3.2] flex-1 mb-auto h-full">

                            <div className="sm:hidden block  flex-col items-center">
                                {
                                    BasketItem?.length
                                        ?
                                        BasketItem.map(({ productID, count, services }) => {
                                            return <ProductCart
                                                key={productID?._id}
                                                title={productID?.name}
                                                count={count}
                                                price={totalPriceCalculator(productID?.price, productID?.discount, 1, services, false)}
                                                finalPrice={totalPriceCalculator(productID?.price, productID?.discount, count, services, false)}
                                                id={productID?._id}
                                                src={productID?.image?.length ? productID?.image[0] : '/images/imageNotFound.webp'}
                                            />
                                        })
                                        : <div className="text-center w-full text-white-red font-peyda text-[16px]">سبد خرید خالی است</div>
                                }
                            </div>

                            <table className="w-full sm:block hidden text-center">


                                {
                                    BasketItem?.length
                                        ?
                                        <thead>
                                            <tr className="bg-primary-black w-full ch:p-5">
                                                <th className="max-w-full w-full">محصول</th>
                                                <th className="min-w-[140px] whitespace-nowrap">قیمت(بدون تخفیف)</th>
                                                <th className="min-w-[60px]">تعداد</th>
                                                <th className="min-w-[120px]">جمع کل</th>
                                            </tr>
                                        </thead>
                                        : <div className="text-center w-full text-white-red font-peyda text-[16px]">سبد خرید خالی است</div>
                                }

                                <tbody>

                                    {
                                        BasketItem?.length
                                            ?
                                            BasketItem.map(({ productID, count, services }) => {
                                                return <ProductCart
                                                    key={productID?._id}
                                                    title={productID?.name}
                                                    count={count}
                                                    price={totalPriceCalculator(productID?.price, productID?.discount, 1, services, false)}
                                                    finalPrice={totalPriceCalculator(productID?.price, productID?.discount, count, services, false)}
                                                    id={productID?._id}
                                                    src={productID?.image?.length ? productID?.image[0] : '/images/imageNotFound.webp'}
                                                />
                                            })
                                            : null
                                    }

                                </tbody>
                            </table>

                            {
                                BasketItem?.length
                                    ?
                                    <div className="mt-20 border relative border-title-text rounded-md p-3">

                                        <span className="absolute w-20 h-4 p-3 bg-primary-black top-0 right-[30px] rounded-sm flex-center -translate-y-[50%]">کد تخفیف:</span>

                                        <div className="mt-5 flex items-center justify-between rounded-sm bg-primary-black border border-white/10">

                                            <input
                                                className="w-full text-[16px] placeholder:text-[12px] flex-[5] outline-none bg-transparent p-2"
                                                value={discountInput}
                                                onChange={e => isDiscountValid ? null : setDiscountInput(e.target.value)}
                                                onKeyDown={e => e.key == 'Enter' && checkAndActiveDiscount()}
                                                placeholder="کد تخفیف:"
                                                spellCheck={false}
                                                type="text"
                                            />

                                            <div className="p-2 flex flex-row-reverse gap-2">
                                                <Button
                                                    filled
                                                    bgColor={isDiscountValid ? "bg-green" : undefined}
                                                    active={isDiscountValid}
                                                    Icon={isLoading ? <Loader /> : <></>}
                                                    text={isLoading ? '' : isDiscountValid ? 'کد تخفیف اعمال شده' : 'اعمال کد تخفیف'}
                                                    fn={checkAndActiveDiscount}
                                                />
                                                {
                                                    isDiscountValid
                                                        ?
                                                        <Button
                                                            Icon={<IoTrashOutline />}
                                                            fn={removeDiscount}
                                                        />
                                                        : null
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    : null
                            }

                        </div>

                        <div className="flex-1 w-full mb-auto border border-gold/30">
                            <div className="flex items-center gap-2 text-[14px] font-peyda text-gold">
                                <div className="size-3 p-1 rounded-full bg-gold"></div>
                                <div>جمع کل سبد خرید</div>
                            </div>

                            <div className="flex gap-3 text-[12px] flex-col my-6">
                                <div className="flex items-center justify-between text-title-text">
                                    <p>جمع جزء</p>
                                    <p><span className="text-white-red text-[15px]">{sumOfProductsWithoutDiscount.toLocaleString('fa-IR')}</span> تومان</p>
                                </div>

                                <div className="flex items-center justify-between text-title-text">
                                    <p>مجموع</p>
                                    <p><span className="text-white-red text-[15px]">{sumOfProductsWithDiscount.toLocaleString('fa-IR')}</span> تومان</p>
                                </div>

                                <div className="flex items-center justify-between text-title-text">
                                    <p>جمع تخفیف ها</p>
                                    <p className="bg-blue-white p-1 rounded-xl text-[14px] text-white rounded-tl-none"><span>{(sumOfProductsWithoutDiscount - sumOfProductsWithDiscount).toLocaleString('fa-IR')}</span> تومان</p>
                                </div>
                            </div>


                            <Button filled text="ادامه جهت تسویه حساب" fn={() => BasketItem?.length ? navigate.push('/checkout') : showToast(false, 'محصولی برای پرداخت وجود نداره ها')} />
                        </div>
                    </div>

                </div>

                <Footer />
            </section>

        </>

    )
}

export default Card