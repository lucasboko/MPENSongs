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
                        content={fullScreenContent || ""} hideSettings readOnly
                        bottomMargin={80}
                    />
                    <button
                        className='z-20 top-[50px] right-[50px] absolute shadow-md/20 cursor-pointer p-[10px] bg-white-500 rounded-full hover:bg-blue-500 hover:text-yellow-400 '
                        onClick={() => setShowFullScreen(undefined)}
                    >
                        <HiArrowsPointingIn className="size-4" />
                    </button>
                </div>
            }
            className="w-[500px] h-9/10 border-0"
            bodyStyling='px-[15px]'
            backDropStyling="bg-white/100"
        />
    )
}