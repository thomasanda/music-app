// import React, { useState, useEffect } from "react";
import ReactAudioPlayer from "react-audio-player";

const AudioPlayer2 = ({ trackURL, selectedTrack, albumTracks }) => {
  // const [trackIndex, setTrackIndex] = useState(0);
  const { name, artist } = albumTracks;

  // useEffect(() => {
  //   if (albumTracks && selectedTrack) {
  //     try {
  //       const index = albumTracks.findIndex(
  //         (el) => el.id === Number(selectedTrack)
  //       );
  //       setTrackIndex(index);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   }
  // }, [selectedTrack]);

  return (
    <div className="flex w-full justify-center border-t border-grey bg-blue-200 fixed bottom-0 left-0 w-full">
      <div>
        <h2 className="title">{name}</h2>
        <h3 className="artist">{artist}</h3>
        <ReactAudioPlayer
          controls
          src={trackURL}
          autoPlay={true}
          className=""
        />
      </div>
    </div>
  );
};

export default AudioPlayer2;
