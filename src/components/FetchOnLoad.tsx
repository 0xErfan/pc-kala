import { useAppDispatch } from "@/Hooks/useRedux"
import { getMe, userWishesUpdater } from "@/Redux/Features/userSlice"
import { useEffect } from "react"

const FetchOnLoad = () => { // insure that after the hydration, always the userSlice updates(bcs this component wrapped in the main _app)

    const dispatch = useAppDispatch()

    useEffect(() => {

        dispatch(getMe()); // set user data

        ( // set suer wishes
            async () => {
                const res = await fetch('/api/wish/get')
                const { userWishes } = await res.json()
                dispatch(userWishesUpdater([...userWishes]))
            }
        )()
        
    }, [dispatch])

    return (<></>)
}

export default FetchOnLoad;