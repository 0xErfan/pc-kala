import { useAppSelector } from '@/Hooks/useRedux'
import AdminData from '@/components/p-admin/AdminData'
import Layout from '@/components/p-admin/Layout'
import { userDataTypes } from '@/global.t'
import React, { useEffect, useState } from 'react'

const notifications = () => {

    const [adminLists, updateAdminLists] = useState<userDataTypes[]>()
    const userData = useAppSelector(state => state.userSlice.data)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {

        (async () => {

            try {

                if (!userData?._id || isLoading) return;
                setIsLoading(true)

                const res = await fetch('/api/users/adminList')
                const { adminLists: allAdmins } = await res.json()
                const allAdminsWithoutCreatorAdmin = allAdmins?.filter((data: userDataTypes) => data._id !== userData._id)

                updateAdminLists(allAdminsWithoutCreatorAdmin)

            } catch (error) { console.log(error) }
            finally { setIsLoading(false) }
        })()

    }, [userData?._id])

    return (
        <Layout>

            <h3 className='text-[26px] font-peyda font-bold text-panel-darkBlue'>لیست ادمین ها</h3>

            <div className='grid grid-cols-2 gap-4'>
                {
                    adminLists?.length
                        ?
                        adminLists.map(data => <AdminData creator={userData?._id} key={data._id} {...data} />)
                        : null
                }
            </div>

        </Layout>
    )
}

export default notifications