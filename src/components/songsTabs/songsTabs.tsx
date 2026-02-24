import { useAppContext } from '../../context';
import type { ContextType } from '../../types';
import { Content } from '../../components';

import { HiXMark } from "react-icons/hi2";

const tabClass = 'flex gap-[10px] px-[10px] items-center'

export const SongsTabs = () => {

    const { tab, openedSong, setTab, closeSongTab } = useAppContext() as ContextType
    const tabs = Object.keys(openedSong)
    return (
        <div className="grid w-full h-[calc(100%-56px)] place-content-start">
            <div className='w-screen flex gap-[0px] overflow-x-scroll bg-gray-100 h-[50px]'
                style={{ scrollbarWidth: 'thin', scrollbarColor: '#ddd white' }}>
                {
                    tabs.map(_id =>
                        <div
                            key={_id}
                            className={`${tabClass} ${(tab && _id === tab._id) ? 'bg-white' : ''}`}
                            style={{ width: `190px` }}
                        >
                            <button
                                style={{
                                    overflow: "hidden",
                                    whiteSpace: "nowrap",
                                    textOverflow: "ellipsis",
                                    textAlign: "left"
                                }}
                                className='grow cursor-pointer text-xs'
                                onClick={() => setTab(openedSong[_id])}>
                                {openedSong[_id].name || 'Titre inconnu'}
                            </button>
                            <div 
                            className='flex w-[20px] justify-end cursor-pointer'
                            title="Fermer la chanson">
                                <HiXMark onClick={() => closeSongTab(_id)} />
                            </div>
                        </div>
                    )
                }
            </div>
            <div className='lg:w-[50%] md:w-[70%] w-[100%] self-start justify-self-center md:justify-self-left '>
                {
                    tabs.map(_id =>
                        <div key={_id} >
                            {
                                tab
                                    ? <div className={`${(tab && _id === tab._id) ? 'block' : 'hidden'}`}>
                                        <Content song={openedSong[_id]} />
                                    </div>
                                    : null
                            }
                        </div>

                    )
                }
            </div>
        </div>
    )
}
