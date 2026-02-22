import { Route, Routes } from 'react-router';
import { useEffect, useState } from 'react'
import { AppContext } from './context'
import type { Song, SongId, SongsRecord } from './types'
import { Dashboard } from './components'
import { getLoggedInUser } from './utilities';

const API_URL = import.meta.env.VITE_API_URL;


function App() {

  const [songs, setSongs] = useState<SongsRecord>({})
  const [filteredSongs, setFilteredSongs] = useState<SongId[]>([])
  const [openedSong, addOpenSong] = useState<SongsRecord>({})
  const [fullScreenContent, setShowFullScreen] = useState<string | undefined>('')

  const [tab, setTab] = useState<Song | undefined>(undefined)
  const [saveModalIsActive, activateSaveModal] = useState<Song | undefined>(undefined)
  const [deleteModalIsActive, activateDeleteModal] = useState<Song | undefined>(undefined)

  const [isTranslating, setIsTranslating] = useState<boolean>(false)
  const [isSavingSong, setIsSavingSong] = useState<boolean>(false)
  const [showLoginModal, setLoginModal] = useState<boolean>(false)
  const [isLoggedIn, setLoggedIn] = useState<boolean>(getLoggedInUser())

  const updateUrl = (_id: SongId | undefined) => {

    const url = new URL(window.location.href);

    if (!_id) url.searchParams.delete('songId');
    else url.searchParams.set('songId', _id);

    window.history.replaceState({}, '', url.toString());

  }

  const organizeTabs = (_id?: string) => {

    if (_id === tab?._id) {

      const arrIds = Object.keys(openedSong)
      const index = arrIds.findIndex(i => i === _id)
      const next = arrIds[index + 1]
      const prev = arrIds[index - 1]

      if (next) {
        updateUrl(openedSong[next]._id)
        setTab(openedSong[next])
      }
      else if (prev) {
        updateUrl(openedSong[prev]._id)
        setTab(openedSong[prev])
      }
      else {
        updateUrl(undefined)
        setTab(undefined)
      }
    }
  }

  const trimer = (s: string | undefined) => s ? s.trim().replace(/[^a-zA-Z]/g, '').toLowerCase() : '';
  const filterSongs = (searchText: string) => {

    if (searchText) {
      setFilteredSongs(
        Object.keys(songs).filter(
          _id => trimer(songs[_id].name).includes(trimer(searchText)) ||
            trimer(songs[_id].lyrics).includes(trimer(searchText)) || 
              trimer(songs[_id].artist).includes(trimer(searchText))
        )
      )
    } else {
      setFilteredSongs(Object.keys(songs))
    }

  }

  const createNewSong = () => {

    const new_song = {
      name: "Nouvelle chanson",
      artist: "MPEN Songs",
      lyrics: "",
      album: "album",
    }

    fetch(
      `${API_URL}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(new_song)
      }
    ).then((resp) => resp.json())
      .then(data => {

        setSongs({
          ...songs,
          [data._id]: { ...data }
        })
        addOpenSong({
          ...openedSong,
          [data._id]: { ...data, touched: false }
        })
        setFilteredSongs([...filteredSongs, data._id])

        setTab(data)

      })
      .catch((respErr) => console.log(respErr));

  }

  const openSongTab = (_id?: string) => {

    if (!_id) return false

    if (!openedSong[_id]) {
      addOpenSong({ ...openedSong, [_id]: songs[_id] })
    }

    updateUrl(_id)

    setTab(songs[_id])

  }

  const deleteSong = (song?: Song) => {

    if (!song) return false

    fetch(
      `${API_URL}/${song._id}`,
      {
        method: "DELETE",
      }
    ).then((resp) => resp.json())
      .then(() => {

        organizeTabs(song._id)

        const os = { ...openedSong }
        delete os[song._id]
        addOpenSong({ ...os })

        const sg = { ...songs }
        delete sg[song._id]
        setSongs({ ...sg })

        setFilteredSongs([...filteredSongs.filter(_id => _id !== song._id)])

        activateDeleteModal(undefined)

      })
      .catch((respErr) => console.log(respErr));

  }

  const closeSongTab = (_id?: SongId, force?: boolean) => {

    if (!_id) return false

    const song = openedSong[_id]

    if (song) {
      if (song.touched && !force) {
        activateSaveModal(song)
      } else {

        organizeTabs(song._id)

        const os = { ...openedSong }
        delete os[_id]
        addOpenSong({ ...os })

      }
    }

  }

  const saveSong = (
    tab?: Song,
    callback?: (id?: SongId, force?: boolean) => void
  ) => {

    activateSaveModal(undefined)
    setIsSavingSong(true)
    if (tab) {
      fetch(
        `${API_URL}/${tab._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          body: JSON.stringify({ ...tab })
        }
      ).then((resp) => resp.json())
        .then(data => {

          setSongs({
            ...songs,
            [data._id]: { ...data }
          })
          addOpenSong({
            ...openedSong,
            [data._id]: { ...data, touched: false }
          })

          if (callback) callback()

          setIsSavingSong(false)

        })
        .catch((respErr) => console.log(respErr));
    }

  }

  const updateTab = (song?: Song) => {

    if (song && openedSong[song._id]) {
      addOpenSong({
        ...openedSong,
        [song._id]: { ...song, touched: true }
      })
      setTab({ ...tab, ...song })
    }

  }

  const initialize = (songs: SongsRecord) => {

    const url = new URL(window.location.href);
    const songId = url.searchParams.get('songId')
    if (songId && songs[songId]) {
      addOpenSong({ [songId]: songs[songId] })
      setTab(songs[songId])
    } else {
      updateUrl(undefined)
    }

  }

  const loadSongs = async () => {
    fetch(
      `${API_URL}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
      }
    ).then((resp) => resp.json())
      .then(data => {

        setSongs(data)
        setFilteredSongs(Object.keys(data))
        initialize(data)

      })
      .catch((respErr) => console.log(respErr));
  }

  useEffect(() => {
    loadSongs()
  }, [])


  return (
    <>
      <AppContext.Provider value={{
        songs, setSongs,
        tab, setTab,
        openedSong, addOpenSong,
        filteredSongs, setFilteredSongs,
        fullScreenContent, setShowFullScreen,

        filterSongs,
        openSongTab,
        closeSongTab,
        updateTab,
        saveSong,
        createNewSong,
        deleteSong,

        saveModalIsActive,
        activateSaveModal,

        deleteModalIsActive,
        activateDeleteModal,

        isTranslating,
        setIsTranslating,

        isSavingSong,
        setIsSavingSong,

        updateUrl,
        isLoggedIn,
        setLoggedIn,
        showLoginModal, 
        setLoginModal

      }}>
        <Routes>
          {/* <Route index element={isLoggedIn ? <Dashboard /> : <Login />} /> */}
          <Route index element={<Dashboard />} />
        </Routes>
      </AppContext.Provider>

    </>
  )
}

export default App

