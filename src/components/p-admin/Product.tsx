import Image from "next/image";

const Product = () => {

    return (
        <div data-aos={`fade-in`} data-aos-duration="550" className={` transition-all duration-300 w-full relative m-auto bg-white shadow-sm rounded-xl p-3 overflow-hidden text-panel-darkTitle text-sm`}>

            {"discount" && <div className=" flex-center absolute bg-[#EE273A] size-9 text-white pt-1 text-sm discount-border">{12}٪</div>}

            <div className="size-[90%] m-auto aspect-square">

                <div className="size-full bg-center bg-white m-auto ch:m-auto flex-center">
                    <Image
                        className="object-cover bg-transparent bg-center"
                        src={
                            !"image?.length"
                                ?
                                `image[0]`
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
                {"discount" && <div className="red-line-through text-panel-darkTitle ">{12345345}</div>}
                <div className="text-panel-darkBlue">{3214234} <span className="text-[10px] text-panel-darkTitle">تومان</span></div>
            </div>

            <div className="text-center px-3 transition-all min-h-[50px] h-full line-clamp-2 text-panel-darkTitle break-all leading-[25px] my-4 ">{"name of product bla bla bla and more bla bla and then again bla bal and finally hahahahahhaahhahahaahhahahahaaaaaaaaaaaaaaa"}</div>

            <div className="flex items-center gap-3 ch:flex-1 ch:w-full mt-4 text-description-text ch:cursor-pointer font-peyda">
                <button className="flex items-center gap-1 justify-center p-3 text-center rounded-md border bg-panel-lightBlue text-panel-darkBlue border-panel-darkBlue">ادیت</button>
                <button className="flex items-center gap-1 justify-center p-3 text-center rounded-md border bg-panel-lightRed text-panel-darkRed border-panel-darkRed">حذف</button>
            </div>
        </div>
    )
}

export default Product;