import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { HiMiniPlus } from "react-icons/hi2";
import { MdLogin } from "react-icons/md";
import mpenlogo from '../../assets/mpensongs128x128.png'
import { useAppContext } from "../../context";
import type { ContextType } from "../../types";
import { useClickOutside, clearAuth } from "../../utilities";
import { Notifications, FilteredSongs, Input } from '../../components'
import { IoMdLogOut } from "react-icons/io";


const searchFormSchema = Yup.object().shape({
    search: Yup.string(),
});

type SearchFormValues = {
    search: string;
}

export const SearchBar = () => {

    // const navigate = useNavigate()

    const { createNewSong, songs, filteredSongs, filterSongs, setLoggedIn, isLoggedIn, setLoginModal, notifications, setNotifications } = useAppContext() as ContextType

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
        setLoggedIn(false)
        setLoginModal(false)
        // updateUrl(undefined)
        // navigate(0)
    }

    const [showSongs, setShowSongs] = useState<boolean>(false)
    const searchRef = useClickOutside(() => { setShowSongs(false) })

    const oauth = {
        func: isLoggedIn ? logout : () => setLoginModal(true),
        Icon: isLoggedIn ? IoMdLogOut : MdLogin,
        buttonTitle: isLoggedIn ? "Quitter" : "Se connecter",
        color: isLoggedIn ? "text-red-500" : "text-blue-500"
    }

    useEffect(() => {
        filterSongs(searchFormik.values.search)
    }, [songs])

    return <div className="absolute w-full z-30 bottom-[0]" ref={searchRef as React.RefObject<HTMLDivElement>}  >
        <div className="flex gap-[5px] bg-white h-[55px] px-[15px] items-center">
            <img
                src={mpenlogo}
                className="w-[35px] cursor-pointer"
                onClick={() => setShowSongs(!showSongs)}
                title="Liste des chansons"
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
            {isLoggedIn && <button
                type="button"
                className="flex cursor-pointer p-[6px] bg-yellow-500 rounded-full items-center justify-center"
                onClick={() => { setShowSongs(false); handleChange(''); createNewSong() }}
                title="Nouvelle chanson"
            >
                <HiMiniPlus className="size-[20px] text-white" />
            </button>}
            <button
                type="button"
                className="flex cursor-pointer p-[9px] items-center justify-center text-gray-500"
                onClick={oauth.func}
                title={oauth.buttonTitle}
            >
                {
                    isLoggedIn
                        ? <oauth.Icon className={`size-[20px] ${oauth.color}`} />
                        : <span className="text-blue-500">Connexion</span>
                }
            </button>
        </div>
        <Notifications
            notifications={notifications}
            setNotifications={setNotifications}
        />
        <FilteredSongs
            showSongs={showSongs}
            setShowSongs={setShowSongs}
            filteredSongs={filteredSongs}
            handleChange={handleChange}
        />

    </div>
}
