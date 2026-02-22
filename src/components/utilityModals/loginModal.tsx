import type { ContextType } from '../../types';
import { useAppContext } from '../../context';
import { Modal } from '../../components';
import { Login } from '../../components'

export const LoginModal = () => {

    const { showLoginModal } = useAppContext() as ContextType
    return (
        <Modal
            className="w-[300px]"
            show={showLoginModal}
            body={<Login />}
        />
    )
}