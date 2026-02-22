import bcrypt from 'bcryptjs'
import { SignJWT } from "jose"

export const getLoggedInUser = () => sessionStorage.getItem('logged_in_user') ? true : false

export const setAuth = (value: string) => sessionStorage.setItem('logged_in_user', value)

export const clearAuth = () => sessionStorage.removeItem("logged_in_user");


export const authenticate = async (pwd: string): Promise<string> => {
    
    const result = bcrypt.compareSync(
        pwd,
        import.meta.env.VITE_BCRYPT_PWD_HASH
    );

    if (result) {

        const secret = new TextEncoder().encode(import.meta.env.VITE_SECRET_KEY)
        
        const value = await new SignJWT({ 'urn:example:claim': true })
            .setProtectedHeader({ alg: import.meta.env.VITE_ALGORITHM }) // Specify the signing algorithm
            .setIssuedAt()
            .setExpirationTime('3d') // Token expires in 3 days
            .sign(secret)

        return value
    }

    return "Mot de passe invalide"

}