import { useAppDispatch, useAppSelector } from "@/Hooks/useRedux"
import { userUpdater } from "@/Redux/Features/globalVarsSlice"
import { userDataUpdater } from "@/Redux/Features/userSlice"
import { showToast } from "@/utils"
import { useRouter } from "next/router"
import { useEffect } from "react"

const FetchOnLoad = () => { // insure that after the hydration, always the userSlice updates(bcs this component wrapped in the main _app)

    const dispatch = useAppDispatch()
    const updater = useAppSelector(state => state.globalVarsSlice.userUpdater)
    const router = useRouter()

    useEffect(() => {
        (
            async () => {
                let res;

                try {
                    res = await fetch('/api/UserRelatedData/get')

                    const { userData, userRelatedData } = await res.json()
                    if (userData?.isBan) router.replace('/bannedUser')
                    
                    dispatch(userDataUpdater({ userData, userRelatedData, isLogin: res.ok }))
                } catch (error) { res?.status == 500 ? dispatch(userUpdater()) : showToast(Boolean(res?.ok), 'از اتصال به اینترنت مطمان شوید') }
            }
        )()
    }, [updater, dispatch])

    return null;
}

export default FetchOnLoad;