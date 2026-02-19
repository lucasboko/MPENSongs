import { FullScreenLyrics } from "../../components/fullScreenLyrics/fullScreenLyrics"
import { DeleteModal } from "../../components/saveModal/deleteModal"
import { SaveModal } from "../../components/saveModal/saveModal"
import { SavingLoadingSpinner } from "../../components/saveModal/savingLoadingSpinner"
import { SideBar } from "../../components/sideBar/sideBar"
import { SongsTabs } from "../../components/songsTabs/songsTabs"
import { TranslatorLoadingSpinner } from "../../components/translatorLoadingSpinner/translatorLoadingSpinner"
import { useAppContext } from "../../context/appContext"
import type { ContextType } from "../../types/types"


export const Dashboard = () => {

    const { fullScreenContent, closeSongTab, saveSong, saveModalIsActive, activateSaveModal } = useAppContext() as ContextType

    return <div className="flex flex-row relative overflow-y-hidden" style={{ height: '100vh' }}>
        <SideBar />
        <SongsTabs />

        <SaveModal
            closeWithoutSave={() => { closeSongTab(saveModalIsActive?._id, true); activateSaveModal(undefined) }}
            save={saveSong}
        />

        <SavingLoadingSpinner />

        <DeleteModal  />

        <TranslatorLoadingSpinner />
        {fullScreenContent && <FullScreenLyrics />}
        
    </div>
}