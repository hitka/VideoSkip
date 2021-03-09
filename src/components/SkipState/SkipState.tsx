import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import './SkipState.scss';
import { Button, Input } from '@material-ui/core';
import classNames from 'classnames';
import { SkipBotService } from '../../services/SkipBotService';

interface SkipStateProps {
  toNextVideo: () => void;
}

const skipService = new SkipBotService();

const SkipState: FC<SkipStateProps> = ({ toNextVideo }) => {
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

  const skipVideo = useCallback(() => {
    skipService.resetSkips();
    toNextVideo();
  }, [toNextVideo]);

  const handleMaxSkipsChange = useCallback((e: any) => {
    setMaxSkips(Number(e.target.value));
  }, []);

  return (
    <div className="skip-container">
      <div className="skip-slice-container">
        {Array(maxSkips)
          .fill(null)
          .map((value, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <div className={classNames('skip-slice', { active: index < skips })} key={index} />
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
