export interface AlbumData {
  id: number;
  title: string;
  artist: string;
  releaseYear: number;
  coverUrl: string;
  artistImgUrl?: string;
}

const albums: AlbumData[] = [
  {
    id: 0,
    title: "Divide",
    artist: "Ed Sheeran",
    releaseYear: 2017,
    coverUrl: "https://upload.wikimedia.org/wikipedia/en/4/45/Divide_cover.png",
    artistImgUrl: "https://i.scdn.co/image/ab67616d0000b273d4e0fdd4c41a4f9bfd884301",
  },
  {
    id: 1,
    title: "After Hours",
    artist: "The Weekend",
    releaseYear: 2020,
    coverUrl: "https://upload.wikimedia.org/wikipedia/ru/c/c1/The_Weeknd_-_After_Hours.png",
    artistImgUrl: "https://i.scdn.co/image/ab6761610000e5eb9e528993a2820267b97f6aae",
  },
  {
    id: 2,
    title: "Future Nostalgia",
    artist: "Dua Lipa",
    releaseYear: 2020,
    coverUrl: "https://upload.wikimedia.org/wikipedia/ru/3/38/Future_Nostalgia.png",
    artistImgUrl: "https://i.scdn.co/image/ab67616d0000b2734bc66095f8a70bc4e6593f4f",
  },
  {
    id: 3,
    title: "Justice",
    artist: "Justin Bieber",
    releaseYear: 2021,
    coverUrl: "https://upload.wikimedia.org/wikipedia/en/0/08/Justin_Bieber_-_Justice.png",
    artistImgUrl: "https://i.scdn.co/image/ab6761610000e5eb8ae7f2aaa9817a704a87ea36",
  },
  {
    id: 4,
    title: "Happier Than Ever",
    artist: "Billie Eilish",
    releaseYear: 2021,
    coverUrl: "https://upload.wikimedia.org/wikipedia/en/4/45/Billie_Eilish_-_Happier_Than_Ever.png",
    artistImgUrl: "https://i.scdn.co/image/ab6761610000e5eb4a21b4760d2ecb7b0dcdc8da",
  },
  {
    id: 5,
    title: "Fine Line",
    artist: "Harry Styles",
    releaseYear: 2019,
    coverUrl: "https://upload.wikimedia.org/wikipedia/en/b/b1/Harry_Styles_-_Fine_Line.png",
    artistImgUrl: "https://i.scdn.co/image/ab6761610000e5ebf7db7c8ede90a019c54590bb",
  },

];

export default albums;