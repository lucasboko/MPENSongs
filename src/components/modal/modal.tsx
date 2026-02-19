import type { ReactElement } from "react"


type ModalType = {
    header?: ReactElement
    footer?: ReactElement
    body: ReactElement
    show?: boolean
    className? : string
    bodyStyling? : string
    backDropStyling?: string
}
export const Modal = (props: ModalType) => {

    const {
        header, footer, body, show, className, backDropStyling, bodyStyling
    } = props 

    return <div className={`flex z-10 fixed bg-black/20 justify-center items-center w-full h-full ${backDropStyling} ${show ? '' : 'hidden'}`}>
        <div className={`w-[300px] bg-white rounded-[10px] border-0 border-gray-100 ${className}`}>
            {
                header && <div className="px-[20px] py-[15px]">
                    {header}
                </div>
            }
            {
                body && <div className={bodyStyling ||"p-[20px]"}>
                    {body}
                </div>
            }
            {
                footer && <div className="px-[20px] py-[15px]">
                    {footer}
                </div>
            }
        </div>
    </div>
}

