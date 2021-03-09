import tmi, { ChatUserstate, Client } from 'tmi.js';

const COMMANDS = {
  skip: 'Rasstroen',
  safe: 'Dovolen',
};

const opts = {
  identity: {
    username: 'Kozjar',
    password: 'oauth:8ebzxq0hfa4yk66wpgf0l4pc4wtaci',
  },
  channels: ['cabbakid', 'kozjar'],
};

export class SkipBotService {
  private client: Client;
  skipMap: Map<string, number>;
  setSkipCount: ((count: number) => void) | undefined;

  constructor() {
    this.client = new tmi.client(opts);
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
    if (message.startsWith(COMMANDS.skip)) {
      this.skipMap.set(tags.username || '', 1);
      this.updateSkipCount();
    }

    if (message.startsWith(COMMANDS.safe)) {
      this.skipMap.set(tags.username || '', -1);
      this.updateSkipCount();
    }
  };
}
