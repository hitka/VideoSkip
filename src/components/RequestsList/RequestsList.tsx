import React, { FC } from 'react';
import './RequestsList.scss';
import { VideoRequest } from '../../models/video';
import VideoStats from '../VideoStats/VideoStats';

interface RequestsListProps {
  requestQueue: VideoRequest[];
}

const RequestsList: FC<RequestsListProps> = ({ requestQueue }) => {
  return (
    <div className="request-container">
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
