import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";

import tidal from "../api/tidal";

const Albums = ({
  selectedValue,
  setTrackURL,
  setAlbumTracks,
  albumTracks,
  setSelectedTrack,
  selectedTrack,
}) => {
  const [data, setData] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    try {
      if (selectedValue !== null) {
        tidal
          .get(`/search_artist_albums/${selectedValue.id}`)
          .then((res) => setData(res.data));
      }
    } catch (err) {
      console.error(err);
    }
  }, [selectedValue]);

  // useEffect(() => {
  //   let trackURLS = [];
  //   try {
  //     if (albumTracks !== null) {
  //       albumTracks.forEach(async (id) => {
  //         await tidal
  //           .get(`get_playback_info/${id.id}`)
  //           .then((url) => trackURLS.push(url.data[1].urls[0]))
  //           .then(() => setTrackURL(trackURLS));
  //       });
  //     }
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }, [albumTracks, setTrackURL]);

  useEffect(() => {
    try {
      if (albumTracks !== null) {
        tidal
          .get(`get_playback_info/${selectedTrack}`)
          .then((url) => setTrackURL(url.data[1].urls[0]));
      }
    } catch (err) {
      console.error(err);
    }
  }, [albumTracks, selectedTrack, setTrackURL]);

  const handleClick = async (albumId) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const result = [];
    try {
      const res = await tidal.get(`get_album_tracks/${albumId}`);
      res.data.forEach((data) =>
        result.push({
          name: data.name,
          duration: data.duration,
          popularity: data.popularity,
          trackNumber: data.track_number,
          id: data.id,
          artist: data.artist,
        })
      );
    } catch (err) {
      console.error(err);
    }
    setAlbumTracks(result);
  };

  return (
    <div className="">
      {data.albums && (
        <div className="p-4 mx-auto content-center ">
          <h1 className="text-3xl text-center tracking-wide underline">
            Albums
          </h1>
        </div>
      )}
      <motion.ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <AnimatePresence>
          {selectedId && (
            <motion.div
              layoutId={selectedId}
              className="w-screen h-80 order-first z-50 grid grid-cols-2 backdrop-blur-sm bg-white/30"
            >
              <motion.img
                src={data.albums[selectedId - 1].picture}
                key={selectedId}
                alt={data.albums[selectedId - 1].name}
                className="mx-auto bg-black rounded-t-lg"
              />
              <motion.ul className="overflow-y-auto scrollbar-hide">
                {albumTracks.map((album, idx) => (
                  <motion.li
                    id={album.id}
                    onClick={(e) => setSelectedTrack(e.target.id)}
                    className="ml-10 w-4/5 font-mono border-solid border-2 border-blue-200 mt-1 backdrop-blur-sm bg-black/30 text-white cursor-pointer hover:scale-105"
                  >
                    {album.trackNumber}. {album.name}
                  </motion.li>
                ))}
              </motion.ul>
              <motion.button onClick={(e) => setSelectedId(null)}>
                <FaChevronDown className="mx-auto mt-1 h-9" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
        {data.albums &&
          data.albums.map((album, idx) => (
            <motion.li
              className="col-span-1 flex flex-col p-8 sticky"
              layoutId={idx + 1}
              onClick={() => setSelectedId(idx + 1)}
            >
              <motion.div>
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                  whileTap={{ scale: 0.9 }}
                  src={album.picture}
                  onClick={() => handleClick(album.id)}
                  key={idx}
                  alt={album.name}
                  className="flex-shrink-0 mx-auto bg-black rounded-t-lg"
                />
              </motion.div>
            </motion.li>
          ))}
      </motion.ul>
    </div>
  );
};

export default Albums;
