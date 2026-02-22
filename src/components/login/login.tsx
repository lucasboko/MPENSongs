import { useFormik } from "formik";
import * as Yup from 'yup';
import mpenlogo from '../../assets/MPENINTERNATIONAL.png'
import { Input } from "../../components";
import { authenticate, setAuth, getLoggedInUser } from "../../utilities";
import { useAppContext } from "../../context";
import type { ContextType } from "../../types";

const loginFormSchema = Yup.object().shape({
    password: Yup.string().required('Required'),
});

type LoginFormValues = {
    password: string;
}

export const Login = () => {

    const { setLoginModal, setLoggedIn } = useAppContext() as ContextType
    
    const loginFormik = useFormik<LoginFormValues>({
        initialValues: {
            password: '',
        },
        validationSchema: loginFormSchema,
        onSubmit: async (values, actions) => {
            
            actions.setSubmitting(true)

            const res = await authenticate(values.password)
            if (res !== "Mot de passe invalide") {
                setAuth(res)
                setLoggedIn(getLoggedInUser())
                setLoginModal(false)
            } else {
                actions.setErrors({ password: res })

            }
        },
    });

    const handleChange =
        (value: string, fieldName: string) =>
            loginFormik.setFieldValue(fieldName, value, true)

    const showError = (field: keyof LoginFormValues) =>
        loginFormik.touched[field]
            ? loginFormik.errors[field] as string
            : undefined


    return (
        <div className="grid">
            <form className="flex flex-col gap-[10px] py-[20px]  items-center justify-self-center border-0 m-auto" 
            onSubmit={loginFormik.handleSubmit}>
                
                <div className="flex mb-[20px]">
                    <img src={mpenlogo} alt="App Logo" width="70" />
                    <div className="border-l-1 border-gray-400 h-[30px] pt-[3px] align-middle pl-[10px]">Songs</div>
                </div>
                <Input
                    className="w-full outline-0 border-0 text-center"
                    name="password"
                    type={"password"}
                    placeholder="Entrer mot de passe"
                    value={loginFormik.values.password}
                    onChange={val => handleChange(val, "password")}
                    error={<div className="text-center">{showError("password")}</div>}
                    readOnly={loginFormik.isSubmitting}
                />

                <button
                    type="submit"
                    className="outline-0 bg-white text-blue-500 font-bold cursor-pointer"
                >
                    Connecter
                </button>
                <button
                    type="button"
                    className="outline-0 bg-white text-gray-500 cursor-pointer "
                    onClick={() => { loginFormik.resetForm(); setLoginModal(false) }}
                >
                    Annuler
                </button>
            </form>
        </div>
    )
}