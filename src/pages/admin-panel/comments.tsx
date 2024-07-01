import Comment from '@/components/p-admin/Comment';
import Layout from '@/components/p-admin/Layout'
import { commentProps } from '@/global.t';
import { showToast } from '@/utils';
import React, { useEffect, useState } from 'react'


const index = () => {

    const [comments, setComments] = useState<commentProps[]>([])
    const [currentPage, setCurrentPage] = useState(0)
    const [updater, setUpdater] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {

        (async () => {

            try {

                const res = await fetch('/api/comment/getAll', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ currentPage })
                })

                const { comments: newComments } = await res.json()

                setComments([...newComments])

            } catch (error) { console.log(error) }
        })()

    }, [currentPage, updater])

    return (
        <div>
            <Layout>
                <div>

                    <h3 className='text-[26px] font-peyda pt-4 font-bold text-panel-darkBlue'>مدریت کامنت ها</h3>

                    <div className='grid grid-cols-1 pt-4'>

                        <table className='w-full text-center overflow-x-auto rounded-md'>

                            <thead>
                                <tr className='font-peyda md:text-[18px] sm:text-[16px] text-[14px] text-center w-full ch:bg-white ch:py-2 ch:text-panel-darkTitle'>
                                    <td>شماره</td>
                                    <td>اسم</td>
                                    <td>ایمیل</td>
                                    <td>امتیاز</td>
                                    <td>محصول</td>
                                    <td>تاریخ ثبت</td>
                                    <td className='w-20 whitespace-nowrap'>مشاهده</td>
                                    <td className='w-20 whitespace-nowrap'>تایید/رد</td>
                                </tr>
                            </thead>

                            <tbody className='overflow-auto border border-white'>
                                {
                                    comments?.length
                                        ?
                                        comments.map((commentData, index) => <Comment commentsUpdater={() => setUpdater(prev => !prev)} rowNumber={index} key={commentData._id} {...commentData} />)
                                        : null
                                }
                            </tbody>

                        </table>
                    </div>

                </div>
            </Layout>

        </div>
    )
}

export default index