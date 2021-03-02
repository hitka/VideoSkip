import React, { FC } from 'react';
import './RequestsList.scss';
import { VideoRequest } from '../../models/video';

interface RequestsListProps {
  requestQueue: VideoRequest[];
}

const RequestsList: FC<RequestsListProps> = ({ requestQueue }) => {
  return (
    <div className="request-container">
      {requestQueue.map(({ title, username }, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <div className="request" key={index}>{`${username} - ${title}`}</div>
      ))}
    </div>
  );
};

export default RequestsList;
