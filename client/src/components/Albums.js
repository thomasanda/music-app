import React, { useState, useEffect } from 'react';

import tidal from '../api/tidal';

const Albums = ({ selectedValue, setTrackURL, setAlbumTracks, albumTracks }) => {
  const [data, setData] = useState([])

  useEffect(() => {
    try {
      if (selectedValue !== null) {
        tidal.get(`/search_artist_albums/${selectedValue.id}`).then(res => setData(res.data))
      }
    } catch (err) {
      console.error(err)
    }
  }, [selectedValue])

  useEffect(() => {
    let trackURLS = [];
    try {
      if (albumTracks !== null) {
        albumTracks.forEach(async (id) => {
          await tidal.get(`get_playback_info/${id.id}`).then(url => trackURLS.push(url.data[1].urls[0])).then(() => setTrackURL(trackURLS))
        })
      }
    } catch (err) {
      console.error(err)
    }
  }, [albumTracks, setTrackURL])


  const handleClick = async (albumId) => {
    const result = [];
    try {
      const res = await tidal.get(`get_album_tracks/${albumId}`);
      res.data.forEach(data => result.push({
        'name': data.name,
        'duration': data.duration,
        'popularity': data.popularity,
        'trackNumber': data.track_number,
        'id': data.id,
        'artist': data.artist,
      }))

    } catch (err) {
      console.error(err)
    }
    setAlbumTracks(result)
  }


  return (
    <div className=''>
      {data.albums &&
        <div className='p-4 mx-auto content-center '>
          <h1 className='text-3xl text-center tracking-wide  underline'>Albums</h1>
        </div>
      }
      <ul className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {data.albums && (
          data.albums.map((album, idx) =>
            <li className='col-span-1 flex flex-col p-8'>
              <div>
                <img src={album.picture} onClick={() => handleClick(album.id)} key={idx} alt={album.name} className='flex-shrink-0 mx-auto bg-black rounded-t-lg' />
              </div>
            </li>
          )
        )}
      </ul>
    </div>
  )
}

export default Albums;
