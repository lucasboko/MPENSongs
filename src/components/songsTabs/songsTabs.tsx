import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../context/appContext';
import type { ContextType } from '../../types/types';
import { Content } from '../content/content';

import { HiXMark } from "react-icons/hi2";

const tabClass = 'text-xs flex gap-[10px] py-[4px] px-[10px] items-center'

export const SongsTabs = () => {

    const { tab, openedSong, setTab, closeSongTab } = useAppContext() as ContextType
    const tabs = Object.keys(openedSong)

    const [tabWidth, setTabWidth] = useState(100);

    useEffect(() => {
        const osl = Object.keys(openedSong).length
        const handleResize = (osl: number) => setTabWidth((window.innerWidth - 350) / osl > 180 ? 180 : (window.innerWidth - 350) / osl)

        window.addEventListener('resize', () => handleResize(osl));

    }, [openedSong]);


    useEffect(() => {
        const osl = Object.keys(openedSong).length
        const set = (size: number) => setTabWidth(size)
        set((window.innerWidth - 350) / osl > 180 ? 180 : (window.innerWidth - 350) / osl)
    }, [openedSong]);

    return (
        <div className=" ml-[300px] grow h-full py-[10px] " >
            <div className='flex gap-[0px]'>
                {
                    tabs.map(_id =>
                        <div
                            key={_id}
                            className={`${tabClass} ${(tab && _id === tab._id) ? 'font-bold text-blue-500' : 'text-gray-500'}`}
                            style={{ width: `${tabWidth}px` }}
                        >
                            <button
                                style={{
                                    overflow: "hidden",
                                    whiteSpace: "nowrap",
                                    textOverflow: "ellipsis",
                                    textAlign: "left"
                                }}
                                className='grow cursor-pointer'
                                onClick={() => setTab(openedSong[_id])}>
                                {openedSong[_id].name || 'Titre inconnu'}
                            </button>
                            <div className='flex w-[30px] justify-end cursor-pointer'><HiXMark onClick={() => closeSongTab(_id)} /></div>
                        </div>
                    )
                }
            </div>
            <div className='h-full p-[10px] lg:w-[60%] md:w-[90%]'>
                {
                    tabs.map(_id =>
                        <React.Fragment key={_id} >
                            {
                                tab
                                    ? <div className={`${(tab && _id === tab._id) ? 'block' : 'hidden'}`}>
                                        <Content song={openedSong[_id]} />
                                    </div>
                                    : null
                            }
                        </React.Fragment>

                    )
                }
            </div>
        </div>
    )
}
