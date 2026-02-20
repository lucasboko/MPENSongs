import { useFormik } from "formik";
import { Input } from "../input/input"
import * as Yup from 'yup';
import { TipTapEditor } from "../tiptapEditor/tiptapEditor";
import type { ContextType, Song } from "../../types/types";
import { useAppContext } from "../../context/appContext";
import { ActionsButtons } from "../actionsButtons/actionsButtons";
import { useState } from "react";
import { HiCheck } from "react-icons/hi2";

const songFormSchema = Yup.object().shape({
    name: Yup.string().min(2, 'entrez un titre plus long').required('Champ obligatoire'),
    artist: Yup.string().min(2, 'entrez un nom plus long').required('Required'),
    lyrics: Yup.string(),
    album: Yup.string(),
});


export const Content = ({ song }: { song: Song }) => {

    const { updateTab, saveSong } = useAppContext() as ContextType
    const [transltorContent, setTransltorContent] = useState<string>('')

    const songFormik = useFormik<Song>({
        initialValues: song,
        validationSchema: songFormSchema,
        onSubmit: async (values) => {
            // console.log(values)
            saveSong({ ...values })
        },
    });

    const handleChange =
        (value: string, fieldName: string) => {
            songFormik.setFieldValue(fieldName, value, true)
            updateTab({ ...song, [fieldName]: value, touched: true })
        }


    const showError = (field: keyof Song) => songFormik.touched[field]
        ? songFormik.errors[field] as string
        : undefined

    return <form onSubmit={songFormik.handleSubmit}>
        <div className="relative">
            <div className="w-full md:flex flex-row gap-[30px] px-[10px]">
                <Input
                    name="name"
                    placeholder="Titre de la chanson"
                    onChange={val => handleChange(val, "name")}
                    value={songFormik.values.name}
                    error={showError("name")}
                    className="w-full outline-0 pb-[3px] pt-[10px] border-b-1 border-dashed border-gray-300"
                    wrapperStyling='md:w-[50%]'
                />
                <Input
                    name="artist"
                    placeholder="Nom de l'artiste"
                    onChange={val => handleChange(val, "artist")}
                    value={songFormik.values.artist}
                    error={showError("artist")}
                    className="w-full outline-0 pb-[3px] pt-[10px] border-b-1 border-dashed border-gray-300"
                    wrapperStyling='md:w-[50%]'
                />
            </div>

            <div className=" pl-[10px] pt-[10px]">
                <TipTapEditor content={songFormik.values.lyrics} handleChange={handleChange} transltorContent={transltorContent} />
            </div>

            {
                song
                    ? <div className="flex flex-col lg:absolute md:fixed fixed bottom-[65px] right-[15px] gap-[10px]">
                        <ActionsButtons song={song} setTransltorContent={setTransltorContent} />
                        {
                            song.touched
                                ? <button
                                    type="submit"
                                    className={`bg-blue-500 text-white hover:text-yellow-400 shadow-md/20 cursor-pointer p-[10px] rounded-full`}
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