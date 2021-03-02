export interface VideoData {
  title: string;
}

export interface VideoRequest extends VideoData {
  videoId: string;
  username: string;
}
