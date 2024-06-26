import { ReactNode } from "react"

interface UserPanelTmpProps {
    children: ReactNode
    title: string
}

const UserPanelTemplate = ({ children, title }: UserPanelTmpProps) => {

    return (
        <div className="flex-[3] relative">

            <div className="border border-dark-gold bg-secondary-black rounded-md">

                <div className="inline-block space-y-2 font-peyda text-[15px] flex-col gap-2 pb-10 p-4">
                    <p>{title}</p>
                    <div className="w-5/6 ml-auto bg-white-red h-px rounded-sm"></div>
                </div>

                {children}
            </div>

        </div>
    )
}

export default UserPanelTemplate;