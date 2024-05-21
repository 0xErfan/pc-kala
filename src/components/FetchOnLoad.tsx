import { useAppDispatch } from "@/Hooks/useRedux"
import { getMe, userWishesUpdater } from "@/Redux/Features/userSlice"
import { useEffect } from "react"

const FetchOnLoad = () => { // insure that after the hydration, always the userSlice updates(bcs this component wrapped in the main _app)

    const dispatch = useAppDispatch()

    useEffect(() => { dispatch(getMe()) }, [dispatch])

    return (<></>)
}

export default FetchOnLoad;