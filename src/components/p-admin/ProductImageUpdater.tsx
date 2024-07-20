import Image from 'next/image'
import { S3 } from 'aws-sdk';
import React, { ChangeEvent, useEffect, useState } from 'react'
import { FiPlus } from 'react-icons/fi'
import { MdOutlineDelete } from "react-icons/md";
import { showToast } from '@/utils';
import { PutObjectRequest } from 'aws-sdk/clients/s3';

const ACCESSKEY = "ih20pifmmvob24dh"
const SECRETKEY = "edd76ff6-505b-43b6-8d8d-51eb83b39b2f"
const ENDPOINT = "storage.iran.liara.space"
const BUCKET = 'pc-kala'

interface Props {
    imageDataSender: (links: Array<string> | 0) => void
    trigger: boolean
    updateLoading: (status: boolean) => void
    imagesData: string[]
}

const ProductImageUpdater = ({ imageDataSender, imagesData, trigger, updateLoading }: Props) => {

    const [imagesSrc, setImagesSrc] = useState<Array<string>>(imagesData)
    const [selectedFilesData, setSelectedFilesData] = useState<File[]>([])

    useEffect(() => { console.log('triggered', trigger) }, [trigger])

    useEffect(() => {
        (
            async () => { trigger && imageDataSender(await sendImagesData()) }
        )()
    }, [trigger])

    useEffect(() => {
        for (const image of imagesSrc) newImageUploaderFromUrl(image)
    }, [imagesSrc])

    const sendImagesData = async () => {

        if (!selectedFilesData?.length) {
            showToast(false, 'حداقل یک عکس برای محصول وارد کنید');
            return 0;
        }

        updateLoading(true)

        const imageLinks: Array<string> = [];

        for (let image of selectedFilesData) {

            const link = await handleUpload(image);

            if (!link) {
                showToast(false, 'خطا در اپلود');
                return 0;
            }

            imageLinks.push(link);
        }

        return imageLinks;
    };

    const newImageUploader = (e: ChangeEvent<HTMLInputElement>) => {

        const file = e.target.files?.length ? e.target.files[0] : null

        if (file) {

            const reader = new FileReader()
            const isAlreadyExist = selectedFilesData.find(data => data.name == file?.name)

            if (isAlreadyExist) return showToast(false, 'تصویر وجود داره مشتی')

            reader.onloadend = () => setImagesSrc(prev => [...prev, reader.result as string]);
            reader.readAsDataURL(file);
        }

        e.target.value = '' // reset the input value after every change
    }

    const newImageUploaderFromUrl = async (imageUrl: string) => {

        try {
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            const file = new File([blob], imageUrl, { type: blob.type });
            const reader = new FileReader();

            reader.onloadend = () => {
                setSelectedFilesData(prev => prev.some(data => data.name == file.name) ? [...prev] : [...prev, file]); // if the image exist, don't add it again hah
            };

            reader.readAsDataURL(file);

        } catch (error) { showToast(false, error as string) }

    };

    const handleUpload = async (file: File): Promise<string | 0> => {

        let encodedFileName = file.name?.replace(/[\?\=\%\&\+\-\.\_\s]/g, '_')
        encodedFileName = encodedFileName?.slice(encodedFileName.length - 30)

        try {

            const s3 = new S3({
                accessKeyId: ACCESSKEY,
                secretAccessKey: SECRETKEY,
                endpoint: ENDPOINT,
            });

            const params = {
                Bucket: BUCKET,
                Key: encodeURIComponent(encodedFileName),
                Body: file,
            };

            await s3.upload(params as PutObjectRequest).promise();

            const permanentSignedUrl = s3.getSignedUrl('getObject', {
                Bucket: BUCKET,
                Key: encodeURIComponent(encodedFileName),
                Expires: 3153600000
            });

            return permanentSignedUrl;

        } catch (error) { updateLoading(false); return 0 }
    };

    const deleteImage = (link: string, id: number) => {
        setImagesSrc(prev => prev.filter(url => url !== link))
        setSelectedFilesData(prev => prev.splice(id, 1))
    }

    return (
        <div className={'flex-1 rounded-xl p-4 h-full mb-auto bg-white shadow-sm'}>

            <div className={'font-peyda text-[25px] pb-3'}>اپلود عکس</div>

            <div className={'xl:flex block gap-3 flex-col'}>

                {
                    imagesSrc.length
                        ?
                        <div className={' aspect-square xl:block ch:rounded-xl relative hidden w-full size-[370px] bg-panel-white rounded-xl'}>
                            <Image className={'object-contain size-full'} width={300} height={300} quality={100} src={imagesSrc[0]} alt="idk" />
                            <span onClick={() => deleteImage(imagesSrc[0], 0)} className='cursor-pointer transition-all absolute size-9 rounded-full text-white ch:rounded-full bg-panel-darkRed ch:size-[70%] flex-center right-3 top-3'>< MdOutlineDelete /></span>
                        </div>
                        :
                        <label className='border-dotted border-[3px] cursor-pointer aspect-square flex-center rounded-xl' htmlFor="main-image">
                            <input onChange={newImageUploader} id='main-image' type="file" className='hidden' />
                            <FiPlus className={'size-12 text-panel-darkGreen bg-panel-lightGreen p-1 rounded-full'} />
                        </label>
                }

                <div className='grid grid-cols-4 gap-2'>

                    {
                        imagesSrc.slice(1).map((url, index) =>
                            <div className={' aspect-square relative bg-panel-white ch:rounded-xl rounded-xl'}>
                                <Image className={'object-contain size-full'} width={300} height={300} src={url} alt="idk" />
                                <span onClick={() => deleteImage(imagesSrc[index + 1], index + 1)} className='cursor-pointer transition-all absolute size-6 text-white bg-panel-darkRed ch:size-[70%] flex-center right-1 top-1'>< MdOutlineDelete /></span>
                            </div>)
                    }

                    {
                        imagesSrc.length > 0 && imagesSrc.length < 5
                            ?
                            <label className='border-dotted border-[3px] cursor-pointer aspect-square flex-center rounded-xl' htmlFor="main-image">
                                <input onChange={newImageUploader} id='main-image' type="file" className='hidden' />
                                <FiPlus className={'size-7 text-panel-darkGreen bg-panel-lightGreen p-1 rounded-full'} />
                            </label>
                            : null
                    }
                </div>
            </div>
        </div>
    )
}

export default ProductImageUpdater