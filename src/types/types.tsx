export type ContextType = {
    songs: SongsRecord
    setSongs: React.Dispatch<React.SetStateAction<SongsRecord>>

    filteredSongs: SongId[]
    setFilteredSongs: React.Dispatch<React.SetStateAction<SongId[]>>

    filterSongs: (searchText: string) => void

    tab?: Song
    setTab: React.Dispatch<React.SetStateAction<Song | undefined>>
    
    openedSong: SongsRecord
    addOpenSong: React.Dispatch<React.SetStateAction<SongsRecord>>
    openSongTab: (id: SongId) => void
    closeSongTab: (id?: SongId, force?: boolean) => void
    createNewSong: () => void

    saveModalIsActive?: Song
    activateSaveModal: React.Dispatch<React.SetStateAction<Song | undefined>>

    fullScreenContent?: string
    setShowFullScreen: React.Dispatch<React.SetStateAction<string | undefined>>

    updateTab: (tab?: Song) => void
    saveSong: (tab?: Song, callback?: (id?: SongId, force?: boolean) => void) => void

    deleteModalIsActive?: Song
    activateDeleteModal: React.Dispatch<React.SetStateAction<Song | undefined>>
    deleteSong: (song?: Song) => void

    isTranslating: boolean
    setIsTranslating: React.Dispatch<React.SetStateAction<boolean>>

    isSavingSong: boolean
    setIsSavingSong: React.Dispatch<React.SetStateAction<boolean>>

    updateUrl: (_id: SongId | undefined) => void

}

export type SongId = string

export type Song = {
    _id: string
    name?: string
    artist?: string
    lyrics?: string
    album?: string
    touched?: boolean
}

export type SongsRecord = Record<string, Song>

export type UserProps = {
    firstname: string
    lastname: string
    email: string
}


export type LoginInputProps = {
    password: string
}

export type LoggedInUser = {
    token: string
} | null