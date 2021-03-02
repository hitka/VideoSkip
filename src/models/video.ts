export interface VideoData {
  title: string;
  viewCount: number;
  likeCount: number;
  dislikeCount: number;
}

export interface VideoRequest extends VideoData {
  videoId: string;
  username: string;
}
