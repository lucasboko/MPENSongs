import { useNavigate } from "react-router";
import { useFormik } from "formik";
import * as Yup from 'yup';
import mpenlogo from '../../assets/MPENINTERNATIONAL.png'
import { Input } from "../../components";
import { authenticate, setAuth } from "../../utilities";

const loginFormSchema = Yup.object().shape({
    password: Yup.string().required('Required'),
});

type LoginFormValues = {
    password: string;
}

export const Login = () => {

    const navigate = useNavigate()
    
    const loginFormik = useFormik<LoginFormValues>({
        initialValues: {
            password: '',
        },
        validationSchema: loginFormSchema,
        onSubmit: async (values, actions) => {
            
            actions.setSubmitting(true)

            const res = await authenticate(values.password)
            console.log(res)
            if (res !== "Mot de passe invalide") {
                setAuth(res)
                navigate(0)
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
        <div className="w-screen h-screen grid">
            <form className="flex flex-col gap-[30px] w-[300px] items-center justify-self-center border-0 m-auto" 
            onSubmit={loginFormik.handleSubmit}>
                
                <div className="flex ">
                    <img src={mpenlogo} alt="App Logo" width="90" />
                    <div className="border-l-1 border-gray-400 h-[30px] pt-[3px] align-middle pl-[10px]">Songs</div>
                </div>
                <Input
                    className="w-[300px] outline-0 border-0 text-center"
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
                    className="outline-0 bg-white text-blue-500 font-bold w-full cursor-pointer"
                >
                    Connecter
                </button>
            </form>
        </div>
    )
}