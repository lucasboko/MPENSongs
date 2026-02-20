import { HiArrowsPointingOut, HiLanguage, HiMiniArrowUpTray, HiOutlineTrash } from "react-icons/hi2"
import type { ContextType, Song } from "../../types/types"
import { useAppContext } from "../../context/appContext"
import { translator } from "../../utilities/geminiTranslator"

export const ActionsButtons = ({
    song, setTransltorContent }: {
        song: Song
        setTransltorContent: React.Dispatch<React.SetStateAction<string>>
    }) => {

    const activeEffect = `p-[8px] shadow-md/20 cursor-pointer p-[10px] bg-white-500 rounded-full bg-white hover:bg-blue-500 hover:text-white`

    const { setShowFullScreen, setIsTranslating, activateDeleteModal } = useAppContext() as ContextType

    const copyLink = () => {
        navigator.clipboard.writeText(window.location.href).then(() => {
            console.log("Copied the text: " + window.location.href);
        }).catch(err => {
            console.error('Could not copy text: ', err);
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
            className={activeEffect}
            onClick={runTranslation}
        >
            <HiLanguage className="size-[18px]" />
        </button>
        <button
            type="button"
            className={activeEffect}
            onClick={copyLink}
        >
            <HiMiniArrowUpTray className="size-[18px]" />
        </button>
        <button
            type="button"
            className={activeEffect}
            onClick={() => setShowFullScreen(song?.lyrics)}
        >
            <HiArrowsPointingOut className="size-[18px]" />
        </button>

        <button
            type="button"
            className={activeEffect}
            onClick={() => activateDeleteModal(song)}
        >
            <HiOutlineTrash className="size-[18px]" />
        </button>
    </>
}