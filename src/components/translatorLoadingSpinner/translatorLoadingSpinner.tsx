import { useAppContext } from "../../context/appContext"
import type { ContextType } from "../../types/types"
import { Modal } from "../modal/modal"

export const TranslatorLoadingSpinner = () => {

    const { isTranslating } = useAppContext() as ContextType
    return (
        <Modal
            show={isTranslating}
            body={<div className="">Traduction en cours...</div>}
            className="w-[300px] "
            backDropStyling="bg-black/30"
        />
    )
}