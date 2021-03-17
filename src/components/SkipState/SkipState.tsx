import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import './SkipState.scss';
import { Button, Input, LinearProgress } from '@material-ui/core';
import { SkipBotService } from '../../services/SkipBotService';
import { VideoRequest } from '../../models/video';

interface SkipStateProps {
  toNextVideo: () => void;
  currentVideo?: VideoRequest;
}

const skipService = new SkipBotService();

const SkipState: FC<SkipStateProps> = ({ toNextVideo, currentVideo }) => {
  const [skips, setSkips] = useState<number>(0);
  const [maxSkips, setMaxSkips] = useState<number>(7);
  const skipsDisplay = useMemo(() => {
    if (skips < 0) {
      return 0;
    }

    return skips;
  }, [skips]);

  useEffect(() => {
    skipService.setSkipCount = setSkips;
  }, []);

  useEffect(() => {
    skipService.ignoreUser = currentVideo?.username;
    skipService.videoId = currentVideo?.videoId;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentVideo?.username, currentVideo?.videoId]);

  const skipVideo = useCallback(() => {
    skipService.resetSkips();
    toNextVideo();
  }, [toNextVideo]);

  const handleMaxSkipsChange = useCallback((e: any) => {
    setMaxSkips(Number(e.target.value));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const progress = useMemo(() => (skipsDisplay >= maxSkips ? 100 : (skipsDisplay / maxSkips) * 100), [
    maxSkips,
    skipsDisplay,
  ]);

  const currentColor = useMemo(() => (skipsDisplay >= maxSkips ? 'secondary' : 'primary'), [maxSkips, skipsDisplay]);

  return (
    <div className="skip-container">
      <div className="skip-slice-container">
        <LinearProgress className="skip-progress" variant="determinate" value={progress} color={currentColor} />
        <div className="skips-count">
          <span>{`${skipsDisplay} / `}</span>
          <Input className="max-skips-input" onBlur={handleMaxSkipsChange} defaultValue={maxSkips} />
        </div>
      </div>
      <Button variant="contained" color={currentColor} onClick={skipVideo} className="skip-button">
        Скип
      </Button>
    </div>
  );
};

export default SkipState;
