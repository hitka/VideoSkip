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
  setSkipCount: (count: number) => void;

  constructor(setSkipCount: (count: number) => void) {
    this.client = new tmi.client(opts);
    this.skipMap = new Map<string, number>();
    this.setSkipCount = setSkipCount;

    this.client.on('message', this.handleMessage);

    this.client.connect();
  }

  resetSkips = (): void => {
    this.skipMap.clear();
    this.updateSkipCount();
  };

  updateSkipCount = (): void => {
    let skipCont = 0;

    this.skipMap.forEach((value): void => {
      skipCont += value;
    });

    this.setSkipCount(skipCont);
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
