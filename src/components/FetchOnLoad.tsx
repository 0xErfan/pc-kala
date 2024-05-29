import { useAppDispatch, useAppSelector } from "@/Hooks/useRedux"
import { userDataUpdater } from "@/Redux/Features/userSlice"
import { useEffect } from "react"

const FetchOnLoad = () => { // insure that after the hydration, always the userSlice updates(bcs this component wrapped in the main _app)

    const dispatch = useAppDispatch()

    const updater = useAppSelector(state => state.globalVarsSlice.userUpdater)

    useEffect(() => {
        (
            async () => {
                try {
                    const res = await fetch('/api/UserRelatedData/get')
                    const { userData, userRelatedData } = await res.json()
                    console.log(res)
                    dispatch(userDataUpdater({ userData, userRelatedData, isLogin: res.ok }))
                } catch (error) { }
            }
        )()
    }, [updater, dispatch])

    return (<></>)
}

export default FetchOnLoad;