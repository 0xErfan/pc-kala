import { userDataTypes } from '@/global.t'
import { showToast } from '@/utils'
import React from 'react'

const AdminData = ({ nameLastName, _id, email, creator }: userDataTypes & { creator: string }) => {

    const sendMessage = async () => {

        const res = await fetch('/api/dashboardNotifications/create', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: 'hi this is a test message for erfan@gmail.com admin', creator, target: _id })
        })
        const data = await res.json()

        showToast(res.ok, data.message)
    }

    return (
        <div onClick={sendMessage}>{nameLastName + ' ' + email}</div>
    )
}

export default AdminData