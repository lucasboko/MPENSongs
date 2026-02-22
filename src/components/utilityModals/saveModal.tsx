import type { ContextType } from '../../types';
import { useAppContext } from '../../context';
import { Modal } from '../../components';


type PropsType = {
    closeWithoutSave: () => void
    save: () => void
}

export const SaveModal = (props: PropsType) => {

    const {
        saveModalIsActive, activateSaveModal,
        saveSong, closeSongTab
    } = useAppContext() as ContextType

    const onSave = () => {
        if (saveModalIsActive)
            saveSong(
                { ...saveModalIsActive },
                () => closeSongTab(saveModalIsActive._id, true)
            )

    }

    return (
        <Modal
            className="w-[350px]"
            show={saveModalIsActive ? true : false}
            footer={
                <div className='border-0 flex flex-row gap-[20px] justify-center flex'>
                    <button
                        className='pointer text-blue-500 rounded-full'
                        onClick={() => activateSaveModal(undefined)}
                    >
                        <span className=''>Annuler</span>
                    </button>
                    <button
                        className=' pointer text-blue-500 rounded-full'
                        onClick={() => props.closeWithoutSave()}
                    >
                        <span className=''>Ne pas sauvergarder</span>
                    </button>
                    <button
                        className=' pointer text-blue-500 rounded-full'
                        onClick={onSave}>
                        <span className=''>Sauvegarder</span>
                    </button>
                </div>
            }
            body={<div className='text-sm' >
                Cette chanson a été modifiée mais n'a pas été sauvegardée.
                <p className='text-red-500 pt-[20px]'>{saveModalIsActive?.name}</p>
            </div>}
        />
    )
}