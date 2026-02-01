export interface SongData {
  id: string;          // uuid
  title: string;
  artistName: string;
  album: string;
  url: string;         // аудио CloudFront URL
  coverUrl?: string;   // обложка CloudFront URL
}