import { HiMiniMusicalNote, HiOutlineTrash } from "react-icons/hi2";
import { useAppContext } from "../../context";
import type { ContextType } from "../../types";

export const SongItem = ({ _id, clearSearch }: { _id: string, clearSearch: () => void }) => {

    const { songs, openSongTab, activateDeleteModal, isLoggedIn } = useAppContext() as ContextType

    return <div className="flex py-[5px] items-start ">
        <div className="w-[20px] text-blue-500 pt-[5px]"><HiMiniMusicalNote className="w-[14px]" /></div>
        <div className="grow">
            <button
                style={{
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    textAlign: "left",
                    width: '250px'
                }}
                className={` cursor-pointer font-[500] text-gray-700`} onClick={() => { clearSearch(); openSongTab(_id) }}>
                {songs[_id].name}
            </button>
            <div className="text-gray-400"
                style={{
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    textAlign: "left",
                    width: '250px'
                }} >{songs[_id].artist}</div>
        </div>
        {isLoggedIn  && <div className="w-[20px]" onClick={() => activateDeleteModal(songs[_id])}>
            <HiOutlineTrash
                className="w-[12px] cursor-pointer text-gray-300 hover:text-red-500"
                onClick={() => activateDeleteModal(songs[_id])}
            />
        </div>}
    </div>
}