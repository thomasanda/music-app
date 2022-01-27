import React, { useState, useEffect, useRef, useCallback } from "react";
import AudioControls from "./AudioControls";

const AudioPlayer = ({ trackURL, albumTracks, selectedTrack }) => {
  const [trackIndex, setTrackIndex] = useState(0);
  const [trackProgress, setTrackProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const { name, artist } = albumTracks ? albumTracks[trackIndex] : "";

  const audioRef = useRef(new Audio());
  const intervalRef = useRef();
  const isReady = useRef(false);

  const { duration } = audioRef.current;

  const currentPercentage = duration
    ? `${(trackProgress / duration) * 100}%`
    : "0%";
  const trackStyling = `
     -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #fff), color-stop(${currentPercentage}, #777) )
   `;

  useEffect(() => {
    if (albumTracks && selectedTrack) {
      try {
        const index = albumTracks.findIndex(
          (el) => el.id === Number(selectedTrack)
        );
        setTrackIndex(index);
      } catch (err) {
        console.error(err);
      }
    }
  }, [selectedTrack, albumTracks]);

  const toNextTrack = useCallback(() => {
    if (trackIndex < albumTracks.length - 1) {
      setTrackIndex(trackIndex + 1);
    } else {
      setTrackIndex(0);
    }
  }, [albumTracks.length, trackIndex]);

  const startTimer = useCallback(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        toNextTrack();
      } else {
        setTrackProgress(audioRef.current.currentTime);
      }
    }, [1000]);
  }, [toNextTrack]);

  const onScrub = (value) => {
    clearInterval(intervalRef.current);
    audioRef.current.currentTime = value;
    setTrackProgress(audioRef.current.currentTime);
  };

  const onScrubEnd = () => {
    if (!isPlaying) {
      setIsPlaying(true);
    }
    startTimer();
  };

  const toPrevTrack = () => {
    if (trackIndex - 1 < 0) {
      setTrackIndex(albumTracks.length - 1);
    } else {
      setTrackIndex(trackIndex - 1);
    }
  };

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
      startTimer();
    } else {
      clearInterval(intervalRef.current);
      audioRef.current.pause();
    }
  }, [isPlaying, startTimer]);

  useEffect(() => {
    return () => {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    audioRef.current.pause();
    console.log("trackURL", trackURL[trackIndex]);
    audioRef.current = new Audio(trackURL[trackIndex]);
    setTrackProgress(audioRef.current.currentTime);

    if (isReady.current) {
      audioRef.current.play();
      setIsPlaying(true);
      startTimer();
    } else {
      isReady.current = true;
    }
  }, [trackURL, trackIndex, startTimer]);

  return (
    <div className="w-full text-center border-t border-grey bg-blue-200 fixed bottom-0 left-0 w-full">
      <div className="track-info">
        <img className="picture" src={name} alt={`${name} by ${artist}`} />
        <h2 className="title">{name}</h2>
        <h3 className="artist">{artist}</h3>
        <AudioControls
          isPlaying={isPlaying}
          onPrevClick={toPrevTrack}
          onNextClick={toNextTrack}
          onPlayPauseClick={setIsPlaying}
        />
        <input
          type="range"
          value={trackProgress}
          step="1"
          min="0"
          max={duration ? duration : `${duration}`}
          className="progress"
          onChange={(e) => onScrub(e.target.value)}
          onMouseUp={onScrubEnd}
          onKeyUp={onScrubEnd}
          style={{ background: trackStyling }}
        />
      </div>
    </div>
  );
};

export default AudioPlayer;
