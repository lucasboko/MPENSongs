import { useState } from "react";
import { useNavigate } from "react-router";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { HiMiniPlus } from "react-icons/hi2";
import { MdLogout } from "react-icons/md";
import mpenlogo from '../../assets/mpensongs128x128.png'
import { useAppContext } from "../../context";
import type { ContextType } from "../../types";
import { useClickOutside, clearAuth } from "../../utilities";
import { Input, SongItem } from ".."


const searchFormSchema = Yup.object().shape({
    search: Yup.string(),
});

type SearchFormValues = {
    search: string;
}

export const SearchBar = () => {

    const navigate = useNavigate()

    const { createNewSong, filteredSongs, filterSongs, updateUrl } = useAppContext() as ContextType

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
        (value: string) => {

            searchFormik.setFieldValue('search', value, true)
            filterSongs(value)
        }

    const showError = (field: keyof SearchFormValues) => searchFormik.touched[field]
        ? searchFormik.errors[field] as string
        : undefined

    const logout = () => {
        clearAuth()
        updateUrl(undefined)
        navigate(0)
    }

    const [showSongs, setShowSongs] = useState<boolean>(false)
    const searchRef = useClickOutside(() => { setShowSongs(false) })

    return <div className="absolute w-full z-30 bottom-[0]" ref={searchRef as React.RefObject<HTMLDivElement>}  >
        <div className="flex gap-[5px] bg-white h-[55px] px-[15px] items-center">
            <img
                src={mpenlogo}
                className="w-[35px] cursor-pointer"
                onClick={() => setShowSongs(!showSongs)}
            />
            <div className="grow">
                <Input
                    name="search"
                    onChange={handleChange}
                    onFocus={() => { setShowSongs(true) }}
                    value={searchFormik.values.search}
                    placeholder={'Rechercher titre ou parole'}
                    error={showError("search")}
                    className="outline-0 px-[5px] w-full"
                />
            </div>
            <button
                type="button"
                className="flex cursor-pointer p-[9px] bg-yellow-500 rounded-full items-center justify-center"
                onClick={() => { setShowSongs(false); handleChange(''); createNewSong() }}
            >
                <HiMiniPlus className="size-[20px] text-white" />
            </button>
            <button
                type="button"
                className="flex cursor-pointer p-[9px] items-center justify-center"
                onClick={logout}
            >
                <MdLogout className="size-[20px]" />
            </button>
        </div>
        {(filteredSongs.length && showSongs)
            ? <div className="absolute w-[325px] border-1 left-[5px] border-gray-200 bottom-[60px] bg-white overflow-hidden rounded-xl"
            >
                <div className="p-[10px] max-h-[70vh] overflow-y-auto"
                    style={{ scrollbarWidth: 'thin', scrollbarColor: '#eee #fff' }}>
                    {
                        filteredSongs.map(song_id =>
                            <SongItem
                                key={song_id}
                                _id={song_id}
                                clearSearch={() => { setShowSongs(false); handleChange('') }}
                            />
                        )
                    }
                </div>
            </div>
            : null
        }
    </div>
}