import { HiEye, HiEyeSlash } from "react-icons/hi2"


export const PassHide = (props: { bool: boolean, setBool: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const { bool, setBool } = props

    return bool
        ? <HiEye className="flex-none size-5 text-emerald-700" onClick={() => setBool(!bool)} />
        : <HiEyeSlash className="flex-none size-5 text-emerald-700" onClick={() => setBool(!bool)} />

}
