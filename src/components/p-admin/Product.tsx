import { useAppDispatch } from "@/Hooks/useRedux";
import { modalDataUpdater } from "@/Redux/Features/globalVarsSlice";
import { productDataTypes } from "@/global.t";
import Image from "next/image";
import { ModalProps } from "../Modal";
import { showToast } from "@/utils";

const Product = ({ _id, price, discount, image, name, productUpdater }: productDataTypes & { productUpdater: () => void }) => {

    const dispatch = useAppDispatch()

    const deleteProduct = () => {

        dispatch(modalDataUpdater({
            isShown: true,
            message: 'آیا از حذف این محصول اطمینان دارید؟',
            status: false,
            title: 'حذف محصول',

            fn: async () => {
                try {
                    const res = await fetch('/api/products/delete', {
                        method: 'DELETE',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ _id })
                    })
                    const data = await res.json()

                    showToast(res.ok, data.message)
                    if (res.ok) productUpdater()

                } catch (error) { console.log(error) }
            }

        } as ModalProps))
    }

    return (
        <div data-aos={`fade-in`} data-aos-duration="550" className={` transition-all duration-300 w-full relative m-auto bg-white shadow-sm rounded-xl p-3 overflow-hidden text-panel-darkTitle text-sm`}>

            {discount && <div className=" flex-center absolute bg-[#EE273A] size-9 text-white pt-1 text-sm discount-border">{discount}٪</div>}

            <div className="size-[90%] m-auto aspect-square">

                <div className="size-full bg-center bg-white m-auto ch:m-auto flex-center">
                    <Image
                        className="object-cover bg-transparent bg-center"
                        src={
                            !image?.length
                                ?
                                image[0]
                                :
                                `https://pc-kala.storage.iran.liara.space/Acer%20Nitro%205%203060%20Gaming%20Laptop%2C%2015.6%20FHD%20IPS%20144Hz%2C%20GeForce%20RTX%203060.webp`
                        }
                        width={500}
                        height={500}
                        priority
                        alt="product-name"
                        blurDataURL="true"
                    />
                </div>
            </div>

            <div className="flex items-center gap-3 justify-center whitespace-pre text-title-text text-sm">
                {discount && <div className="red-line-through text-panel-darkTitle ">{price.toLocaleString('fa-IR')}</div>}
                <div className="text-panel-darkBlue">{Number(price - (price * (discount / 100))).toLocaleString('fa-IR')} <span className="text-[10px] text-panel-darkTitle">تومان</span></div>
            </div>

            <div className="text-center px-3 transition-all min-h-[50px] h-full line-clamp-2 text-panel-darkTitle break-all leading-[25px] my-4 ">{name}</div>

            <div className="flex items-center gap-3 ch:flex-1 ch:w-full mt-4 text-description-text ch:cursor-pointer font-peyda">
                <button className="flex items-center gap-1 justify-center p-3 text-center rounded-md border bg-panel-lightBlue text-panel-darkBlue border-panel-darkBlue">ادیت</button>
                <button onClick={deleteProduct} className="flex items-center gap-1 justify-center p-3 text-center rounded-md border bg-panel-lightRed text-panel-darkRed border-panel-darkRed">حذف</button>
            </div>
        </div>
    )
}

export default Product;