import type { ContextType } from '../../types';
import { useAppContext } from '../../context';
import { Modal } from '../../components';

export const SavingLoadingSpinner = () => {

    const { isSavingSong } = useAppContext() as ContextType

    return (
        <Modal
            show={isSavingSong}
            body={<div className="">Sauvegarde en cours...</div>}
            className="w-[300px] "
            backDropStyling="bg-black/30"
        />
    )
}