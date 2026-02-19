import type { ContextType } from '../../types/types';
import { useAppContext } from '../../context/appContext';
import { Modal } from '../modal/modal';

export const SavingLoadingSpinner = () => {

    const { isSavingSong } = useAppContext() as ContextType

    return (
        <Modal
            show={isSavingSong}
            body={<div className="text-xs">Sauvegarde en cours...</div>}
            className="w-[300px] "
            backDropStyling="bg-black/30"
        />
    )
}