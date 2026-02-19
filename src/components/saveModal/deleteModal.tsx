import type { ContextType } from '../../types/types';
import { useAppContext } from '../../context/appContext';
import { Modal } from '../modal/modal';

export const DeleteModal = () => {

    const { deleteModalIsActive, activateDeleteModal, deleteSong } = useAppContext() as ContextType

    const onDelete = () => {
        if (deleteModalIsActive)
            deleteSong(deleteModalIsActive)
    }

    return (
        <Modal
            className="w-[350px]"
            show={deleteModalIsActive ? true : false}
            footer={
                <div className='border-0 flex flex-row gap-[20px] justify-center flex'>
                    <button
                        className='pointer text-blue-500 rounded-full'
                        onClick={() => activateDeleteModal(undefined)}
                    >
                        <span className='text-xs'>Annuler</span>
                    </button>
                    
                    <button
                        className='text-xs pointer text-blue-500 rounded-full'
                        onClick={onDelete}>
                        <span className='text-xs'>Supprimer</span>
                    </button>
                </div>
            }
            body={<div className='text-sm' >
                Êtes-vous sûr de vouloir supprimer cette chanson?
                <p className='text-red-500 pt-[20px]'>{deleteModalIsActive?.name}</p>
            </div>}
        />
    )
}