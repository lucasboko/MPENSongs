import { FullScreenLyrics } from "../../components/fullScreenLyrics/fullScreenLyrics"
import { DeleteModal } from "../../components/saveModal/deleteModal"
import { SaveModal } from "../../components/saveModal/saveModal"
import { SavingLoadingSpinner } from "../../components/saveModal/savingLoadingSpinner"
import { Header } from "../../components/header/header"
import { SongsTabs } from "../../components/songsTabs/songsTabs"
import { TranslatorLoadingSpinner } from "../../components/translatorLoadingSpinner/translatorLoadingSpinner"
import { useAppContext } from "../../context/appContext"
import type { ContextType } from "../../types/types"


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
        <Header />
        <SongsTabs />
    </div>
}