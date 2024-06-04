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
            status: false,
            title: '',
            isShown: false,
            message: '',
            fn: () => { },
            okBtnText: 'تایید',
            cancelBtnText: 'لغو',
        } satisfies ModalProps
    },
    reducers: {
        isScrolledDownUpdater: (state, action) => { return { ...state, isScrolledDown: action.payload } },
        changeProfileActiveMenu: (state, action: { payload: 'account-details' | 'orders' | 'likes' | 'messages' | 'comments' }) => { return { ...state, activeProfileMenu: action.payload } },
        userUpdater: state => { return { ...state, userUpdater: !state.userUpdater } },
        changeCanScroll: (state, action) => { return { ...state, canScroll: action.payload } },
        modalDataUpdater: (state, action: { payload: ModalProps }) => { return { ...state, modalData: { ...state.modalData, ...action.payload } } },
        modalDataReset: state => {
            return {
                ...state, modalData: {
                    status: false,
                    title: '',
                    isShown: false,
                    message: '',
                    fn: () => { },
                    okBtnText: 'تایید',
                    cancelBtnText: 'لغو',
                }
            }
        }
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
} = globalVarsSlice.actions