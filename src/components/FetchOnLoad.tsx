import { useAppDispatch, useAppSelector } from "@/Hooks/useRedux"
import { userDataUpdater } from "@/Redux/Features/userSlice"
import { useEffect } from "react"

const FetchOnLoad = () => { // insure that after the hydration, always the userSlice updates(bcs this component wrapped in the main _app)

    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(state => state.userSlice.isLogin)
    const updater = useAppSelector(state => state.globalVarsSlice.userUpdater)

    useEffect(() => {
        (
            async () => {
                try {

                    if (!isLoggedIn) return;

                    const res = await fetch('/api/UserRelatedData/get')
                    const { userData, userRelatedData } = await res.json()

                    dispatch(userDataUpdater({ userData, userRelatedData, isLogin: res.ok }))
                } catch (error) { }
            }
        )()
    }, [updater, dispatch, isLoggedIn])

    return null;
}

export default FetchOnLoad;