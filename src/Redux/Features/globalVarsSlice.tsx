import { ModalProps } from "@/components/Modal";
import { createSlice } from "@reduxjs/toolkit";

const globalVarsSlice = createSlice({
    name: 'globalVars',
    initialState: {
        isScrolledDown: true,
        userUpdater: true,
        canScroll: true,
        activeProfileMenu: 'account-details',
        modalData: {
            title: '',
            status: false,
            isShown: false,
            loader: false,
            message: '',
            fn: () => { },
            okBtnText: 'تایید',
            cancelBtnText: 'لغو',
        } satisfies ModalProps,
        loadMore: false,
        activeStatusBox: 0,
    },
    reducers: {
        isScrolledDownUpdater: (state, action) => { return { ...state, isScrolledDown: action.payload } },
        changeProfileActiveMenu: (state, action: { payload: 'account-details' | 'orders' | 'likes' | 'messages' | 'comments' }) => { return { ...state, activeProfileMenu: action.payload } },
        userUpdater: state => { return { ...state, userUpdater: !state.userUpdater } },
        changeCanScroll: (state, action) => { return { ...state, canScroll: action.payload } },
        modalDataUpdater: (state, action) => { return { ...state, modalData: { ...state.modalData, ...action.payload } } },
        modalDataReset: state => {
            return {
                ...state,
                modalData: {
                    status: false,
                    isShown: false,
                    loader: false,
                    title: '',
                    message: '',
                    fn: () => { },
                    onCancel: () => { },
                    okBtnText: 'تایید',
                    cancelBtnText: 'لغو',
                }
            }
        },
        loadMoreUpdater: (state, action) => { return { ...state, loadMore: action.payload } },
        setActiveStatusBox: (state, action) => ({ ...state, activeStatusBox: action.payload == state.activeStatusBox ? 0 : action.payload })
    },
})

export default globalVarsSlice.reducer

export const {
    isScrolledDownUpdater,
    changeProfileActiveMenu,
    userUpdater,
    changeCanScroll,
    modalDataUpdater,
    modalDataReset,
    loadMoreUpdater,
    setActiveStatusBox
} = globalVarsSlice.actions