import React, { useState, useEffect } from 'react';

import tidal from '../api/tidal';

const Albums = ({ selectedValue }) => {
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


  return (
    <div className=''>
      <div className='p-4 mx-auto content-center '>
        <h1 className='text-3xl text-center font-bold underline'>Albums</h1>
      </div>
      <ul className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {data.albums && (
          data.albums.map((album, idx) =>
            <li className='col-span-1 flex flex-col p-8'>
              <div>
                <h3 key={idx} className='text-center'>{album.name}</h3>
                <img src={album.picture} onClick={() => console.log(album.id)} key={1000 + (idx)} alt={album.name} className='flex-shrink-0 mx-auto bg-black rounded-t-lg' />
              </div>
            </li>
          )
        )}
      </ul>
    </div>
  )
}

export default Albums;
