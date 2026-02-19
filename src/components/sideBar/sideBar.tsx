import { Input } from "../input/input"
import { useFormik } from "formik";
import * as Yup from 'yup';
import { HiMiniMusicalNote, HiMiniPlus, HiOutlineTrash } from "react-icons/hi2";


import { useAppContext } from "../../context/appContext";
import type { ContextType } from "../../types/types";



const searchFormSchema = Yup.object().shape({
    search: Yup.string(),
});

type SearchFormValues = {
    search: string;
}


export const SideBar = () => {


    const { createNewSong, filteredSongs, filterSongs } = useAppContext() as ContextType

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

    return <div className="w-[300px] h-full absolute p-[10px]">
        <div className="h-full rounded-3xl bg-white border-0 border-blue-100 relative">
            <div className="flex p-[10px] gap-[10px]">
                <div className="grow">
                    <Input
                        name="search"
                        onChange={val => handleChange(val, "search")}
                        value={searchFormik.values.search}
                        placeholder={'Rechercher titre ou parole'}
                        error={showError("search")}
                        className="text-xs pl-[15px] w-full shadow-sm rounded-full px-[5px] py-[8px]"
                    />
                </div>
                <button
                    className="flex cursor-pointer w-[30px] rounded-full bg-white items-center justify-center "
                    onClick={() => createNewSong()}
                >
                    <HiMiniPlus className="size-6" />
                </button>
            </div>
            <div className="rounded-3xl px-[10px] h-[calc(100%-70px)] relative overflow-y-auto pb-[10px]" 
            style={{ scrollbarWidth: 'thin', scrollbarColor: '#eee white' }}>
                {
                    filteredSongs.map(song_id =>
                        <SongItem key={song_id} _id={song_id} />
                    )
                }
            </div>
        </div>
    </div>
}


const SongItem = ({ _id }: { _id: string }) => {

    const { songs, openSongTab, activateDeleteModal } = useAppContext() as ContextType

    return <div className="flex py-[5px]">
        <div className="w-[10px] mr-[10px]" onClick={() => activateDeleteModal(songs[_id])}>
            <HiOutlineTrash
                className="w-[12px] cursor-pointer text-gray-300 hover:text-red-500"
                onClick={() => activateDeleteModal(songs[_id])}
            />
        </div>
        <div className="w-[20px] text-blue-500"><HiMiniMusicalNote className="w-[14px]" /></div>
        <div className="text-xs grow">
            <span className={`text-xs cursor-pointer font-[500] text-gray-700`} onClick={() => openSongTab(_id)}>{songs[_id].name}</span>
            <div className="text-gray-400">{songs[_id].artist}</div>
        </div>
    </div>
}