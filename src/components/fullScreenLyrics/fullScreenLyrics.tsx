import { HiArrowsPointingIn } from "react-icons/hi2"
import type { ContextType } from "../../types"
import { useAppContext } from "../../context"
import { TipTapEditor, Modal } from "../../components"

export const FullScreenLyrics = () => {

    const { fullScreenContent, setShowFullScreen } = useAppContext() as ContextType

    return (
        <Modal
            show={fullScreenContent ? true : false}
            body={
                <div>
                    <TipTapEditor
                        content={fullScreenContent || ""}
                        hideSettings
                        editable
                        bottomMargin={0}
                    />
                    <button
                        className='z-20 bottom-[5px] right-[5px] absolute cursor-pointer p-[10px] bg-white-500 rounded-full hover:bg-blue-500 hover:text-white'
                        onClick={() => setShowFullScreen(undefined)}
                    >
                        <HiArrowsPointingIn className="size-[18px]" />
                    </button>
                </div>
            }
            className="w-screen h-screen"
            bodyStyling='px-[15px]'
            backDropStyling="bg-white/100"
        />
    )
}