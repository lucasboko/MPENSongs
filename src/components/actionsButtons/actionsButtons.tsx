import { HiArrowsPointingOut, HiLanguage, HiMiniArrowUpTray, HiOutlineTrash } from "react-icons/hi2"
import type { ContextType, Song } from "../../types"
import { useAppContext } from "../../context"
import { translator } from "../../utilities"

export const ActionsButtons = ({
    song, setTransltorContent, isLoggedIn }: {
        song: Song
        isLoggedIn: boolean
        setTransltorContent: React.Dispatch<React.SetStateAction<string>>
    }) => {

    const styling = `p-[8px] cursor-pointer p-[10px] bg-white-500 rounded-full text-gray-600 bg-white hover:bg-blue-500 hover:text-white `

    const { setShowFullScreen, setIsTranslating, activateDeleteModal } = useAppContext() as ContextType

    const copyLink = () => {
        navigator.clipboard.writeText(window.location.href).then(() => {
            // console.log("Copied the text: " + window.location.href);
        }).catch(() => {
            // console.error('Could not copy text: ', err);
        });
    }

    const runTranslation = async () => {
        if (song) {
            setIsTranslating(true)
            const param = {
                lyrics: song?.lyrics || '',
                dest_lang: ['french']
            }

            const text = await translator(param)

            if (text) {
                setIsTranslating(false)
                setTransltorContent(text?.toString() || '')
            }
        }
    }
    
    return <>
        <button
            type="button"
            className={styling}
            onClick={copyLink}
        >
            <HiMiniArrowUpTray className="size-[18px]" />
        </button>
        <button
            type="button"
            className={styling}
            onClick={() => setShowFullScreen(song?.lyrics)}
        >
            <HiArrowsPointingOut className="size-[18px]" />
        </button>
        {
            isLoggedIn && <>
                <button
                    type="button"
                    className={styling}
                    onClick={runTranslation}
                >
                    <HiLanguage className="size-[18px]" />
                </button>

                <button
                    type="button"
                    className={styling}
                    onClick={() => activateDeleteModal(song)}
                >
                    <HiOutlineTrash className="size-[18px]" />
                </button>
            </>
        }
    </>
}