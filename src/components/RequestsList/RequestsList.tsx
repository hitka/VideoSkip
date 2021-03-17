import React, { FC, useState } from 'react';
import './RequestsList.scss';
import { VideoRequest } from '../../models/video';
import VideoStats from '../VideoStats/VideoStats';
import withLoading from '../../decorators/withLoading';
import LoadingButton from '../LoadingButton/LoadingButton';

interface RequestsListProps {
  requestQueue: VideoRequest[];
  onLoadMore: () => Promise<void>;
}

const RequestsList: FC<RequestsListProps> = ({ requestQueue, onLoadMore }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <div className="request-container">
      <LoadingButton
        className="load-more-button"
        variant="outlined"
        onClick={withLoading(setIsLoading, onLoadMore)}
        isLoading={isLoading}
      >
        Загрузить еще
      </LoadingButton>
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
