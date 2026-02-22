import { useAppContext } from "../../context"
import type { ContextType } from "../../types"
import { Modal } from "../../components"

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