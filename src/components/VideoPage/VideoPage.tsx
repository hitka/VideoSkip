import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import VideoPlayer from '../VideoPlayer/VideoPlayer';
import SkipState from '../SkipState/SkipState';
import RequestsList from '../RequestsList/RequestsList';
import './VideoPage.scss';
import { parseYoutubeUrl } from '../../utils/url.utils';
import { TwitchPubSubService, updateConnection } from '../../services/PubSubService';
import { Redemption, RedemptionMessage, RedemptionStatus } from '../../models/purchase';
import { VideoData, VideoRequest } from '../../models/video';
import { getRedemptions, updateRedemptionStatus } from '../../api/twitchApi';

const YOUTUBE_API_KEY = 'AIzaSyCVPinFlGHMn0uzeWFjNTA38QOZBejOlSs';
const validRewards = ['0ff42df7-3a02-4fc2-8539-c25bf026bdc4'];

const VideoPage: FC = () => {
  const { username } = useParams();
  const [requestQueue, setRequestQueue] = useState<VideoRequest[]>([]);
  const currentVideo = useMemo(() => requestQueue[0] || null, [requestQueue]);

  const getVideoInfo = useCallback(async (id): Promise<VideoData> => {
    const { data } = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
      params: { id, key: YOUTUBE_API_KEY, part: 'snippet,statistics' },
    });
    const { viewCount, likeCount, dislikeCount } = data.items[0].statistics;

    return {
      title: data.items[0].snippet.title,
      dislikeCount: Number(dislikeCount),
      likeCount: Number(likeCount),
      viewCount: Number(viewCount),
    };
  }, []);

  const parseRedemption = useCallback(
    async ({ user, reward: { id: rewardId }, user_input, user_name, id }: Redemption): Promise<VideoRequest | null> => {
      const videoId = parseYoutubeUrl(user_input);
      const name = user ? user.display_name : user_name;

      if (videoId && validRewards.includes(rewardId)) {
        try {
          const videoData = await getVideoInfo(videoId);

          return { videoId, username: name, id, ...videoData };
        } catch (e) {
          console.warn(e);

          return null;
        }
      } else {
        return null;
      }
    },
    [getVideoInfo],
  );

  const handleNewRequest = useCallback(
    async ({ redemption }: RedemptionMessage) => {
      const newRequest = await parseRedemption(redemption);

      if (newRequest) {
        setRequestQueue((requests) => [...requests, newRequest]);
      }
    },
    [parseRedemption],
  );

  useEffect(() => {
    const twitchPubSubService = new TwitchPubSubService(handleNewRequest);

    updateConnection(twitchPubSubService, username);
  }, [getVideoInfo, handleNewRequest, username]);

  const handleLoadMore = useCallback(async () => {
    const redemptions = await getRedemptions(validRewards[0], username);
    const newRequests = (await Promise.all(redemptions.map(parseRedemption))).filter(
      (request) => request && !requestQueue.find(({ id }) => request.id === id),
    ) as VideoRequest[];

    setRequestQueue((requests) => [...newRequests, ...requests]);
  }, [parseRedemption, requestQueue, username]);

  const toNextVideo = useCallback(() => {
    setRequestQueue((requests) => {
      updateRedemptionStatus(validRewards[0], username, requests[0].id, RedemptionStatus.Fulfilled);

      return requests.slice(1);
    });
  }, [username]);

  return (
    <div className="page-container">
      <div className="video-container">
        <VideoPlayer id={currentVideo?.videoId} />
        <SkipState toNextVideo={toNextVideo} currentVideo={currentVideo} />
      </div>
      <RequestsList requestQueue={requestQueue} onLoadMore={handleLoadMore} />
    </div>
  );
};

export default VideoPage;
