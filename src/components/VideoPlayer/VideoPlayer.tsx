import React, { FC, useEffect, useRef, useState } from 'react';
import './VideoPlayer.scss';
import YouTube, { Options } from 'react-youtube';

interface VideoPlayerProps {
  id: string | null;
}

const VideoPlayer: FC<VideoPlayerProps> = ({ id }) => {
  const [options, setOptions] = useState<Options>();
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (container.current) {
      const { width, height } = container.current.getBoundingClientRect();

      setOptions({ width: width.toString(), height: height.toString() });
    }
  }, []);

  return (
    <div className="video-container" ref={container}>
      {id ? <YouTube videoId={id} opts={options} /> : <span>Текущее видео</span>}
    </div>
  );
};

export default VideoPlayer;
