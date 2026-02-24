import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { HiCheck } from "react-icons/hi2";
import * as Yup from 'yup';

import { Input, ActionsButtons, TipTapEditor } from "../../components"
import type { ContextType, Song } from "../../types";
import { useAppContext } from "../../context";
import { trimer } from "../../utilities";

const songFormSchema = Yup.object().shape({
    name: Yup.string().min(2, 'Nom invalide').required('Nom invalide').trim(),
    artist: Yup.string().min(2, 'Artiste invalide').required('Artiste invalide').trim(),
    lyrics: Yup.string(),
    album: Yup.string()
});

type SongFormValueType = {
    name?: string,
    artist?: string,
    lyrics?: string,
    album?: string,
}

export const Content = ({ song }: { song: Song }) => {

    const { tab, updateTab, songs, saveSong, isLoggedIn } = useAppContext() as ContextType
    const [transltorContent, setTransltorContent] = useState<string>('')

    const validateFunction = async (values: SongFormValueType) => {
        let errors = {};

        const isValid = await songFormSchema.isValid(values);
        const name = values.name
        const artist = values.artist

        if (isValid && name && artist) {

            const find = Object.keys(songs).filter(
                _id => _id !== song._id &&
                    trimer(songs[_id].name) === trimer(name) &&
                    trimer(songs[_id].artist) === trimer(artist)
            ).length > 0

            errors = {
                ...errors,
                ...(find && { name: `Ce duo [titre et artiste] existe déjà` })
            }
        }

        return errors;

    };

    const songFormik = useFormik<Song>({
        initialValues: song,
        validationSchema: songFormSchema,
        validate: validateFunction,
        onSubmit: async (values, actions) => {
            const {touched, ...toSave} = {
                ...values,
                name: values.name?.trimEnd().trimStart(),
                artist: values.artist?.trimEnd().trimStart()
            }
            saveSong(values)
            actions.resetForm({ values: toSave })
        }
        
    });

    const handleChange =
        (value: string, fieldName: string) => {
            songFormik.setFieldValue(fieldName, value, true)
            updateTab({ ...song, [fieldName]: value, touched: true })
        }


    const showError = (field: keyof Song) => songFormik.touched[field]
        ? songFormik.errors[field] as string
        : undefined


    useEffect(() => {
        if(tab && tab._id === song._id)
            songFormik.setValues({ ...songFormik.values, ...tab })
    }, [tab])



    return <form className="align-self-top" onSubmit={songFormik.handleSubmit}>
        <div className="relative">
            <div className="w-full md:flex flex-row gap-[30px] px-[10px]">
                <Input
                    name="name"
                    placeholder="Titre de la chanson"
                    onChange={val => handleChange(val, "name")}
                    value={songFormik.values.name}
                    error={<div style={{ fontSize: '12px' }}>{showError("name")}</div>}
                    className="w-full outline-0 pb-[3px] pt-[10px] border-b-1 border-dashed border-gray-300 text-blue-500"
                    wrapperStyling='md:w-[50%]'
                    readOnly={!isLoggedIn}
                />
                <Input
                    name="artist"
                    placeholder="Nom de l'artiste"
                    onChange={val => handleChange(val, "artist")}
                    value={songFormik.values.artist}
                    error={<div style={{ fontSize: '9px' }}>{showError("artist")}</div>}
                    className="w-full outline-0 pb-[3px] pt-[10px] border-b-1 border-dashed border-gray-300 text-blue-500"
                    wrapperStyling='md:w-[50%]'
                    readOnly={!isLoggedIn}
                />
            </div>

            <div className=" pl-[10px] pt-[10px]">
                <TipTapEditor
                    content={songFormik.values.lyrics}
                    handleChange={handleChange}
                    transltorContent={transltorContent}
                    bottomMargin={160}
                    editable={isLoggedIn}
                />
            </div>

            {
                song
                    ? <div className="flex flex-col lg:absolute md:fixed fixed  bottom-[70px] lg:bottom-[10px] md:bottom-[70px] right-[10px] gap-[10px]">
                        <ActionsButtons song={song} setTransltorContent={setTransltorContent} isLoggedIn={isLoggedIn} />
                        {
                            (songFormik.dirty && isLoggedIn)
                                ? <button
                                    type="submit"
                                    className={`bg-blue-500 text-white hover:text-yellow-400 shadow-md/20 cursor-pointer p-[10px] rounded-full`}
                                    title="Sauvegarder"
                                >
                                    <HiCheck className="size-[18px] " />
                                </button>
                                : null
                        }
                    </div>
                    : null
            }
        </div>
    </form>
}