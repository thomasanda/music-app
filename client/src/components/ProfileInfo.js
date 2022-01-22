import React, { useEffect, useState } from 'react';
import tidal from '../api/tidal'

const ProfileInfo = () => {
  const [data, setData] = useState([]);
  const [isBusy, setIsBusy] = useState(true)

  useEffect(() => {
    try {
      tidal.get('/get_user_picture').then(res => setData(res.data)).then(() => setIsBusy(false))
    } catch (err) {
      console.error(err)
    }
  }, [])


  return (
    <div>
      {!isBusy &&
        <div>
          <img src={'https://resources.tidal.com/images/' + data.picture.replace(/-/g, '/') + '/100x100.jpg'} />
          <h1>Welcome, {data.firstName}!</h1>
        </div>
      }
    </div>
  )

}

export default ProfileInfo;
