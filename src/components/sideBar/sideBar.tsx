import { Input } from "../input/input"
import { useFormik } from "formik";
import * as Yup from 'yup';
import { HiMiniMusicalNote, HiMiniPlus, HiOutlineTrash } from "react-icons/hi2";
import mpenlogo from '../../assets/mpensongs128x128.png'
import { useAppContext } from "../../context/appContext";
import type { ContextType } from "../../types/types";
import { useState } from "react";



const searchFormSchema = Yup.object().shape({
    search: Yup.string(),
});

type SearchFormValues = {
    search: string;
}


export const SideBar = () => {

    const { createNewSong, filteredSongs, filterSongs } = useAppContext() as ContextType
    const [showSongs, setShowSongs] = useState<boolean>(false)
    const searchFormik = useFormik<SearchFormValues>({
        initialValues: {
            search: '',
        },
        validationSchema: searchFormSchema,
        onSubmit: async (values, actions) => {

            console.log(values)
            actions.setSubmitting(true)
            actions.setErrors({ search: "res" })
        },
    });

    const handleChange =
        (value: string, fieldName: string) => {

            searchFormik.setFieldValue(fieldName, value, true)
            filterSongs(value)
        }

    const showError = (field: keyof SearchFormValues) => searchFormik.touched[field]
        ? searchFormik.errors[field] as string
        : undefined


    return <div className="absolute w-full z-30 bottom-[0]">
        <div className="flex gap-[5px] bg-white h-[55px] px-[15px] items-center">
            <img
                src={mpenlogo}
                className="w-[35px] cursor-pointer"
                onClick={() => setShowSongs(!showSongs)}
            />
            <div className="grow">
                <Input
                    name="search"
                    onChange={val => handleChange(val, "search")}
                    value={searchFormik.values.search}
                    placeholder={'Rechercher titre ou parole'}
                    error={showError("search")}
                    className="outline-0 px-[5px] w-full"
                />
            </div>
            <button
                type="button"
                className="flex cursor-pointer p-[9px] bg-yellow-500 rounded-full items-center justify-center"
                onClick={() => createNewSong()}
            >
                <HiMiniPlus className="size-[20px] text-white" />
            </button>
        </div>
        {((searchFormik.values.search && filteredSongs.length) || showSongs)
            && <div className="p-[10px] absolute w-[350px] border-t-1 border-r-1 border-gray-200 bottom-[55px] bg-white h-[70vh] overflow-y-auto rounded-t-xl"
                style={{ scrollbarWidth: 'thin', scrollbarColor: '#ddd white' }}>
                {
                    filteredSongs.map(song_id =>
                        <SongItem
                            key={song_id}
                            _id={song_id}
                            clearSearch={() => handleChange('', "search")}
                        />
                    )
                }
            </div>
        }
    </div>
}


const SongItem = ({ _id, clearSearch }: { _id: string, clearSearch: () => void }) => {

    const { songs, openSongTab, activateDeleteModal } = useAppContext() as ContextType

    return <div className="flex py-[5px] items-start">
        <div className="w-[20px] text-blue-500 pt-[5px]"><HiMiniMusicalNote className="w-[14px]" /></div>
        <div className="grow">
            <span className={` cursor-pointer font-[500] text-gray-700`} onClick={() => { clearSearch(); openSongTab(_id) }}>{songs[_id].name}</span>
            <div className="text-gray-400">{songs[_id].artist}</div>
        </div>
        <div className="w-[20px]" onClick={() => activateDeleteModal(songs[_id])}>
            <HiOutlineTrash
                className="w-[12px] cursor-pointer text-gray-300 hover:text-red-500"
                onClick={() => activateDeleteModal(songs[_id])}
            />
        </div>
    </div>
}