import React, { FC } from 'react';
import './RequestsList.scss';
import { Button } from '@material-ui/core';
import { VideoRequest } from '../../models/video';
import VideoStats from '../VideoStats/VideoStats';

interface RequestsListProps {
  requestQueue: VideoRequest[];
  onLoadMore: () => void;
}

const RequestsList: FC<RequestsListProps> = ({ requestQueue, onLoadMore }) => {
  return (
    <div className="request-container">
      <Button className="load-more-button" variant="outlined" color="primary" onClick={onLoadMore}>
        Загрузить еще
      </Button>
      {requestQueue.map((video, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <div className="request" key={index}>
          <div>{`${video.username} - ${video.title}`}</div>
          <VideoStats video={video} />
        </div>
      ))}
    </div>
  );
};

export default RequestsList;
