import Layout from '@/components/p-admin/Layout'
import Pagination from '@/components/p-admin/Pagination';
import User from '@/components/p-admin/User';
import { userDataTypes } from '@/global.t';
import { useEffect, useState } from 'react'

const Users = () => {

    const [users, updateUsers] = useState<userDataTypes[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [allPages, setAllPages] = useState(0)
    const [updater, setUpdater] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isEmpty, setIsEmpty] = useState(false)

    useEffect(() => {

        (async () => {

            if (isLoading) return

            try {
                setIsLoading(true)

                const res = await fetch('/api/users/getAll', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ currentPage })
                })

                const { users: newUsers, availablePages } = await res.json()
                if (!newUsers?.length) return setIsEmpty(true)

                setAllPages(availablePages)
                updateUsers([...newUsers])

            } catch (error) { console.log(error) }
            finally { setIsLoading(false) }
        })()

    }, [currentPage, updater])

    return (
        <Layout>
            <div>

                <h3 className='md:text-[26px] text-xl font-peyda font-bold text-panel-darkBlue'>مدریت کاربران</h3>

                <div className='grid grid-cols-1 pt-4 overflow-auto'>

                    <table className='w-full text-center overflow-x-auto rounded-md min-w-[730px]'>

                        <thead>
                            <tr className='font-peyda md:text-[18px] sm:text-[16px] text-[14px] text-center w-full ch:bg-white ch:py-2 ch:text-panel-darkTitle'>
                                <td>شناسه</td>
                                <td>نام/نام کاربری</td>
                                <td>ایمیل</td>
                                <td>نقش</td>
                                <td>بن</td>
                                <td>حذف</td>
                            </tr>
                        </thead>

                        <tbody className='overflow-auto border border-white'>

                            {
                                users?.length
                                    ?
                                    users.map((userData, index) => <User
                                        rowNumber={index * (currentPage)}
                                        usersUpdater={() => setUpdater(prev => !prev)}
                                        key={userData._id}
                                        {...userData}
                                    />)
                                    : null
                            }

                        </tbody>

                    </table>

                    {
                        users?.length
                            ?
                            <Pagination
                                currentPage={currentPage}
                                latestPage={allPages}
                                currentPageUpdater={page => setCurrentPage(page)}
                            />
                            : null
                    }

                    {isEmpty ? <div data-aos='zoom-in' className='w-full flex-center text-[22px] text-panel-darkRed py-2 border border-white font-peyda font-bold text-center'>کاربری  وجود ندارد</div> : null}

                </div>


            </div>
        </Layout>
    )
}

export default Users