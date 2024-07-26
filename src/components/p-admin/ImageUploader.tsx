import Image from 'next/image'
import { S3 } from 'aws-sdk';
import React, { ChangeEvent, useEffect, useState } from 'react'
import { FiPlus } from 'react-icons/fi'
import { MdOutlineDelete } from "react-icons/md";
import { showToast } from '@/utils';

const ACCESSKEY = "ih20pifmmvob24dh"
const SECRETKEY = "edd76ff6-505b-43b6-8d8d-51eb83b39b2f"
const ENDPOINT = "storage.iran.liara.space"
const BUCKET = 'pc-kala'

interface Props {
    imageDataSender: (links: Array<string> | 0) => void
    trigger: boolean
    updateLoading: (status: boolean) => void
}

const ImageUploader = ({ imageDataSender, trigger, updateLoading }: Props) => {

    const [imagesSrc, setImagesSrc] = useState<Array<string>>([])
    const [selectedFilesData, setSelectedFilesData] = useState<File[]>([])

    useEffect(() => {
        (
            async () => { trigger && imageDataSender(await sendImagesData()) }
        )()
    }, [trigger])

    const sendImagesData = async () => {

        if (!selectedFilesData?.length) {
            showToast(false, 'حداقل یک عکس برای محصول وارد کنید');
            return 0;
        }

        updateLoading(true)

        const imageLinks: Array<string> = [];

        for (let i = 0; i < selectedFilesData.length; i++) {

            const link = await handleUpload(selectedFilesData[i]);

            if (!link) {
                showToast(false, 'خطا در اپلود');
                return 0;
            }

            imageLinks.push(link);
        }

        if (imageLinks?.length) {
            setSelectedFilesData([])
            setImagesSrc([])
        }

        return imageLinks;
    };

    const newImageUploader = (e: ChangeEvent<HTMLInputElement>) => {

        let file = e.target.files?.length ? e.target.files[0] : null

        if (file) {
            const reader = new FileReader()

            const isAlreadyExist = selectedFilesData.find(data => data.name == file?.name)
            if (isAlreadyExist) return showToast(false, 'تصویر وجود داره مشتی')

            reader.onloadend = () => {
                setImagesSrc(prev => [...prev, reader.result as string])
                setSelectedFilesData(prev => [...prev, file!])
            };

            reader.readAsDataURL(file);
        }

        e.target.value = '' // reset the input value after every change
    }

    const handleUpload = async (file: File): Promise<string | 0> => {

        try {

            const s3 = new S3({
                accessKeyId: ACCESSKEY,
                secretAccessKey: SECRETKEY,
                endpoint: ENDPOINT,
            });

            const params = {
                Bucket: BUCKET,
                Key: file.name,
                Body: file,
            };

            await s3.upload(params).promise();

            const permanentSignedUrl = s3.getSignedUrl('getObject', {
                Bucket: BUCKET,
                Key: file.name,
                Expires: 3153600000
            });

            return permanentSignedUrl;

        } catch (error) { return 0 }
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
                        <div className={'aspect-square xl:block ch:rounded-xl relative hidden w-full size-[370px] bg-panel-white rounded-xl'}>
                            <Image className={'object-cover size-full'} width={300} height={300} quality={100} src={imagesSrc[0]} alt="idk" />
                            <span onClick={() => deleteImage(imagesSrc[0], 0)} className='cursor-pointer transition-all absolute size-9 rounded-full text-white ch:rounded-full bg-panel-darkRed ch:size-[70%] flex-center right-3 top-3'>< MdOutlineDelete /></span>
                        </div>
                        :
                        <label className='border-dotted xl:flex items-center justify-center hidden border-[3px] cursor-pointer aspect-square rounded-xl' htmlFor="main-image">
                            <input onChange={newImageUploader} id='main-image' accept="image/*" type="file" className='hidden' />
                            <FiPlus className={'size-12 text-panel-darkGreen bg-panel-lightGreen p-1 rounded-full'} />
                        </label>
                }

                <div dir='ltr' className='grid xl:grid-cols-4 grid-cols-5 gap-2'>

                    <div className='block xl:hidden'>
                        {
                            imagesSrc.length
                                ?
                                <div key={0} className={' aspect-square relative bg-panel-white ch:rounded-xl rounded-xl'}>
                                    <Image className={'object-cover size-full'} width={300} height={300} src={imagesSrc[0]} alt="idk" />
                                    <span onClick={() => deleteImage(imagesSrc[0], 0)} className='cursor-pointer transition-all absolute size-6 text-white bg-panel-darkRed ch:size-[70%] flex-center right-1 top-1'>< MdOutlineDelete /></span>
                                </div>
                                :
                                <label className='border-dotted flex items-center justify-center border-[3px] cursor-pointer aspect-square rounded-xl' htmlFor="main-image">
                                    <input onChange={newImageUploader} id='main-image' accept="image/*" type="file" className='hidden' />
                                    <FiPlus className={'size-12 text-panel-darkGreen bg-panel-lightGreen p-1 rounded-full'} />
                                </label>
                        }
                    </div>

                    {
                        imagesSrc.slice(1).map((url, index) =>
                            <div key={index} className={' aspect-square relative bg-panel-white ch:rounded-xl rounded-xl'}>
                                <Image className={'object-cover size-full'} width={300} height={300} src={url} alt="idk" />
                                <span onClick={() => deleteImage(imagesSrc[index + 1], index + 1)} className='cursor-pointer transition-all absolute size-6 text-white bg-panel-darkRed ch:size-[70%] flex-center right-1 top-1'>< MdOutlineDelete /></span>
                            </div>
                        )}

                    {
                        imagesSrc.length > 0 && imagesSrc.length < 5
                            ?
                            <label className='border-dotted border-[3px] cursor-pointer aspect-square flex-center rounded-xl' htmlFor="main-image">
                                <input onChange={newImageUploader} id='main-image' accept="image/*" type="file" className='hidden' />
                                <FiPlus className={'size-7 text-panel-darkGreen bg-panel-lightGreen p-1 rounded-full'} />
                            </label>
                            : null
                    }
                </div>
            </div>
        </div>
    )
}

export default ImageUploader