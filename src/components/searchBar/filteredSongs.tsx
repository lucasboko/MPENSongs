
import type { SongId } from "../../types"; 
import { SongItem  } from '../../components'

export const FilteredSongs = (props: {
        showSongs: boolean,
        setShowSongs: React.Dispatch<React.SetStateAction<boolean>>,
        filteredSongs: SongId[],
        handleChange: (value: string) => void
    }) =>
        <>
            {(props.filteredSongs.length && props.showSongs)
                ? <div className="absolute w-[325px] border-1 left-[5px] border-gray-200 bottom-[60px] bg-white overflow-hidden rounded-xl"
                >
                    <div className="p-[10px] max-h-[70vh] overflow-y-auto"
                        style={{ scrollbarWidth: 'thin', scrollbarColor: '#eee #fff' }}>
                        {
                            props.filteredSongs.map(song_id =>
                                <SongItem
                                    key={song_id}
                                    _id={song_id}
                                    clearSearch={() => { props.setShowSongs(false); props.handleChange('') }}
                                />
                            )
                        }
                    </div>
                </div>
                : null
            }
        </>