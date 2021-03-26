import { ChatUserstate, Client } from 'tmi.js';

export class SkipBotService {
  private client: Client;
  skipMap: Map<string, number>;
  setSkipCount: ((count: number) => void) | undefined;
  ignoreUser?: string;
  videoId?: string;

  skipCommand = 'скип';
  safeCommand = 'сейв';

  constructor(channel: string) {
    this.client = new Client({
      identity: {
        username: 'Kozjar',
        password: 'oauth:8ebzxq0hfa4yk66wpgf0l4pc4wtaci',
      },
      channels: [channel],
    });
    this.skipMap = new Map<string, number>();
    this.setSkipCount = undefined;

    this.client.on('message', this.handleMessage);

    this.client.connect();
  }

  resetSkips = (): void => {
    this.skipMap.clear();
    this.updateSkipCount();
  };

  updateSkipCount = (): void => {
    const skipCont = Array.from(this.skipMap).reduce((accum, [, value]) => accum + value, 0);

    if (this.setSkipCount) {
      this.setSkipCount(skipCont);
    }
  };

  handleMessage = (channel: string, tags: ChatUserstate, message: string): void => {
    if (message === '!видос' && this.videoId) {
      this.client.say('cabbakid', `@${tags['display-name']} https://youtu.be/${this.videoId}`);
      return;
    }

    if (tags['display-name'] === this.ignoreUser) {
      return;
    }

    if (message.startsWith(this.skipCommand)) {
      this.skipMap.set(tags.username || '', 1);
      this.updateSkipCount();
    }

    if (message.startsWith(this.safeCommand)) {
      this.skipMap.set(tags.username || '', -1);
      this.updateSkipCount();
    }
  };
}
