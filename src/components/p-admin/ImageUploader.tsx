import Image from 'next/image'
import { S3 } from 'aws-sdk';
import React, { ChangeEvent, useState } from 'react'
import { FiPlus } from 'react-icons/fi'
import { MdOutlineDelete } from "react-icons/md";
import { showToast } from '@/utils';

const ACCESSKEY = "ih20pifmmvob24dh"
const SECRETKEY = "edd76ff6-505b-43b6-8d8d-51eb83b39b2f"
const ENDPOINT = "storage.iran.liara.space"
const BUCKET = 'pc-kala'


const ImageUploader = ({ imageDataSender }: { imageDataSender: (links: Array<string>) => void }) => {

    const [imagesSrc, setImagesSrc] = useState<Array<string>>([])
    const [selectedFilesData, setSelectedFilesData] = useState<File[]>([])

    const sendImagesData = async () => {

        const imageLinks: Array<string> = []

        for (let i = 0; i < selectedFilesData.length; i++) {

            const link = await handleUpload(selectedFilesData[i])

            if (!link) {
                showToast(false, 'خطا در اپلود')
                break;
            } else {
                imageLinks.push(link)
            }
        }

        imageDataSender(imageLinks)
    }

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

    const handleUpload = async (file: File): Promise<string | null> => {

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

        } catch (error) { return null }
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
                            <Image className={'object-cover size-full'} width={300} height={300} quality={100} src={imagesSrc[0]} alt="idk" />
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
                                <Image className={'object-cover size-full'} width={300} height={300} src={url} alt="idk" />
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

export default ImageUploader





















// const ImageUploader1 = () => {



//     const handleUpload = async () => {
//         try {
//             if (!file) {
//                 setError('Please select a file');
//                 return;
//             }

//             const s3 = new S3({
//                 accessKeyId: ACCESSKEY,
//                 secretAccessKey: SECRETKEY,
//                 endpoint: ENDPOINT,
//             });

//             const params = {
//                 Bucket: BUCKET,
//                 Key: file.name,
//                 Body: file,
//             };

//             const response = await s3.upload(params).promise();
//             console.log(response)

//             const signedUrl = s3.getSignedUrl('getObject', {
//                 Bucket: BUCKET,
//                 Key: file.name,
//                 Expires: 3600,
//             });

//             setUploadLink(signedUrl);

//             // Get permanent link
//             const permanentSignedUrl = s3.getSignedUrl('getObject', {
//                 Bucket: BUCKET,
//                 Key: file.name,
//                 Expires: 31536000, // 1 year
//             });
//             setPermanentLink(permanentSignedUrl);

//             // Update list of uploaded files
//             setUploadedFiles((prevFiles) => [...prevFiles, response]);

//             // Update list of all files
//             fetchAllFiles();

//             console.log('File uploaded successfully');
//         } catch (error) {
//             setError('Error uploading file: ' + error.message);
//         }
//     };

//     const handleDeleteFile = async (file) => {
//         try {
//             const s3 = new S3({
//                 accessKeyId: ACCESSKEY,
//                 secretAccessKey: SECRETKEY,
//                 endpoint: ENDPOINT,
//             });

//             await s3.deleteObject({ Bucket: BUCKET, Key: file.Key }).promise();

//             // Update the list of uploaded files
//             setUploadedFiles((prevFiles) =>
//                 prevFiles.filter((uploadedFile) => uploadedFile.Key !== file.Key)
//             );

//             // Update list of all files
//             fetchAllFiles();

//             console.log('File deleted successfully');
//         } catch (error) {
//             console.error('Error deleting file: ', error);
//         }
//     };

//     return (
//         <div className="upload-container">

//             <input type="file" />

//             <button className="upload-button" onClick={handleUpload} disabled={!file}>Upload</button>

//             {
//                 uploadLink && (
//                     <h3 className="success-message">
//                         File uploaded successfully. Temporary Link:{' '}
//                         <a href={uploadLink} target="_blank" rel="noopener noreferrer">
//                             Temporary Link
//                         </a>
//                     </h3>
//                 )
//             }

//             {
//                 permanentLink && (
//                     <h3 className="success-message">
//                         Permanent Link:{' '}
//                         <a href={permanentLink} target="_blank" rel="noopener noreferrer">
//                             Permanent Link
//                         </a>
//                     </h3>
//                 )
//             }

//             {
//                 uploadedFiles.length >
//                 0 && (
//                     <ul>
//                         {
//                             uploadedFiles.map((uploadedFile) => {

//                                 const s3 = new S3({
//                                     accessKeyId: ACCESSKEY,
//                                     secretAccessKey: SECRETKEY,
//                                     endpoint: ENDPOINT,
//                                 });

//                                 return (
//                                     <li key={uploadedFile.Key}>
//                                         {uploadedFile.Key}{' '}
//                                         <a
//                                             href={s3.getSignedUrl('getObject', {
//                                                 Bucket: BUCKET,
//                                                 Key: uploadedFile.Key,
//                                                 Expires: 3600,
//                                             })}
//                                             download
//                                         >
//                                             Download
//                                         </a>{' '}
//                                         <button onClick={() => handleDeleteFile(uploadedFile)}>Delete</button>
//                                     </li>
//                                 );
//                             })
//                         }
//                     </ul>
//                 )
//             }

//         </div>
//     );
// };