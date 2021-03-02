import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import './SkipState.scss';
import { Button } from '@material-ui/core';
import classNames from 'classnames';
import { SkipBotService } from '../../services/SkipBotService';

interface SkipStateProps {
  toNextVideo: () => void;
}

const SkipState: FC<SkipStateProps> = ({ toNextVideo }) => {
  const [skips, setSkips] = useState<number>(0);
  const [maxSkips] = useState<number>(7);
  const [isMaxSkips, setIsMaxSkips] = useState<boolean>(false);
  const skipService = useRef<SkipBotService>(new SkipBotService(setSkips));

  const skipVideo = useCallback(() => {
    skipService.current.resetSkips();
    toNextVideo();
    setIsMaxSkips(false);
  }, [toNextVideo]);

  useEffect(() => {
    if (skips === maxSkips) {
      setIsMaxSkips(true);
    }
  }, [maxSkips, skips]);

  return (
    <div className="skip-container">
      <div className="skip-slice-container">
        {Array(maxSkips)
          .fill(null)
          .map((value, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <div className={classNames('skip-slice', { active: index < skips || isMaxSkips })} key={index} />
          ))}
      </div>
      <Button variant="contained" color="primary" onClick={skipVideo} className="skip-button">
        Скип
      </Button>
    </div>
  );
};

export default SkipState;
