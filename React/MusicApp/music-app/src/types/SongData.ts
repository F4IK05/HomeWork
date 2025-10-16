export interface SongData {
  id: string;          // uuid
  title: string;
  artist: string;
  album: string;
  url: string;         // аудио CloudFront URL
  coverUrl?: string;   // обложка CloudFront URL
}