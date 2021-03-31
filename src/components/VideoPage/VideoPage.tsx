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
import LoadingPage from '../LoadingPage/LoadingPage';

const YOUTUBE_API_KEY = 'AIzaSyCVPinFlGHMn0uzeWFjNTA38QOZBejOlSs';
const validRewards = ['5d95f900-576b-4ef7-bd12-0b12e5b497e4', 'b07bdfaa-9c5b-4d0b-a14d-cbc7e6914027'];

const VideoPage: FC = () => {
  const { username } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);
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

  const setConnection = useCallback(async () => {
    const twitchPubSubService = new TwitchPubSubService(handleNewRequest);

    await updateConnection(twitchPubSubService, username);

    setIsLoading(false);
  }, [handleNewRequest, username]);

  useEffect(() => {
    setConnection();
  }, [setConnection]);

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

  if (isLoading) {
    return <LoadingPage helpText="Загрузка..." />;
  }

  return (
    <div className="page-container">
      <div className="video-container">
        <VideoPlayer id={currentVideo?.videoId} />
        <SkipState toNextVideo={toNextVideo} currentVideo={currentVideo} />
      </div>
      <RequestsList requestQueue={requestQueue} onLoadMore={handleLoadMore} />
      <div className="extra">created by Kozjar</div>
    </div>
  );
};

export default VideoPage;
