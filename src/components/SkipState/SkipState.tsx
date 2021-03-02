import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import './SkipState.scss';
import { Button, Input } from '@material-ui/core';
import classNames from 'classnames';
import { SkipBotService } from '../../services/SkipBotService';

interface SkipStateProps {
  toNextVideo: () => void;
}

const SkipState: FC<SkipStateProps> = ({ toNextVideo }) => {
  const [skips, setSkips] = useState<number>(3);
  const [maxSkips, setMaxSkips] = useState<number>(7);
  const [isMaxSkips, setIsMaxSkips] = useState<boolean>(false);
  const skipService = useRef<SkipBotService>(new SkipBotService(setSkips));
  const skipsDisplay = useMemo(() => {
    if (isMaxSkips) {
      return maxSkips;
    }

    if (skips < 0) {
      return 0;
    }

    return skips;
  }, [isMaxSkips, maxSkips, skips]);

  const skipVideo = useCallback(() => {
    skipService.current.resetSkips();
    toNextVideo();
    setIsMaxSkips(false);
  }, [toNextVideo]);

  useEffect(() => {
    if (skips >= maxSkips) {
      setIsMaxSkips(true);
    }
  }, [maxSkips, skips]);

  const handleMaxSkipsChange = useCallback((e: any) => {
    setMaxSkips(Number(e.target.value));
    setIsMaxSkips(false);
  }, []);

  return (
    <div className="skip-container">
      <div className="skip-slice-container">
        {Array(maxSkips)
          .fill(null)
          .map((value, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <div className={classNames('skip-slice', { active: index < skips || isMaxSkips })} key={index} />
          ))}
        <div className="skips-count">
          <span>{`${skipsDisplay} / `}</span>
          <Input className="max-skips-input" onBlur={handleMaxSkipsChange} defaultValue={maxSkips} />
        </div>
      </div>
      <Button variant="contained" color="primary" onClick={skipVideo} className="skip-button">
        Скип
      </Button>
    </div>
  );
};

export default SkipState;
