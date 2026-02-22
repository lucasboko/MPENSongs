import { 
    SearchBar,
    SongsTabs,
    FullScreenLyrics,
    SaveModal, 
    DeleteModal, 
    SavingLoadingSpinner, 
    TranslatorLoadingSpinner 
} from "../../components/"
import { useAppContext } from "../../context"
import type { ContextType } from "../../types"


export const Dashboard = () => {

    const { fullScreenContent, closeSongTab, saveSong, saveModalIsActive, activateSaveModal } = useAppContext() as ContextType

    return <div className="relative overflow-y-hidden" style={{ height: '100vh' }}>
        <SaveModal
            closeWithoutSave={() => { closeSongTab(saveModalIsActive?._id, true); activateSaveModal(undefined) }}
            save={saveSong}
        />
        <SavingLoadingSpinner />
        <DeleteModal  />
        <TranslatorLoadingSpinner />
        {fullScreenContent && <FullScreenLyrics />}
        
        <SearchBar />
        <SongsTabs />
    </div>
}