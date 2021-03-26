import React, { FC, useCallback, useEffect, useState } from 'react';
import { CircularProgress, IconButton } from '@material-ui/core';
import { Collection, Emote, EmoteFetcher } from '@mkody/twitch-emoticons';
import { useSelector } from 'react-redux';
import { RootState } from '../../reducers';
import './TwitchEmotesList..scss';
import { EmoteData } from '../../models/common.model';

const fetcher = new EmoteFetcher();

interface TwitchEmotesListProps {
  setActiveEmote: (emote: EmoteData) => void;
}

const TwitchEmotesList: FC<TwitchEmotesListProps> = ({ setActiveEmote }) => {
  const { userId } = useSelector((root: RootState) => root.user);
  const [userEmotes, setUserEmotes] = useState<(Collection<string, Emote> | undefined)[]>();

  useEffect(() => {
    if (userId) {
      Promise.all([
        fetcher.fetchTwitchEmotes(Number(userId)).catch(() => undefined),
        fetcher.fetchBTTVEmotes(Number(userId)).catch(() => undefined),
        fetcher.fetchFFZEmotes(Number(userId)).catch(() => undefined),
      ]).then(setUserEmotes);
    }
  }, [userId]);

  const crateEmoteList = useCallback(
    (emotes?: Collection<string, Emote>) => {
      if (!emotes) {
        return null;
      }

      return (
        <div className="emotes-group">
          {Array.from(emotes.values()).map((emote) => {
            const handleClick = (): void => {
              setActiveEmote({ image: emote.toLink(1), code: emote.code });
            };

            return (
              <IconButton key={emote.id} className="emote-button" onClick={handleClick}>
                <img alt="emote" src={emote.toLink(0)} />
              </IconButton>
            );
          })}
        </div>
      );
    },
    [setActiveEmote],
  );

  return (
    <div className="emotes-container">
      {userEmotes ? (
        <>
          {crateEmoteList(userEmotes[0])}
          {crateEmoteList(userEmotes[1])}
          {crateEmoteList(userEmotes[2])}
        </>
      ) : (
        <CircularProgress className="emotes-loading" />
      )}
    </div>
  );
};

export default TwitchEmotesList;
