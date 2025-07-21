export interface SongData {
    id: number;
    title: string;
    artist: string;
    duration: string;
    albumId: number;
    coverUrl?: string;
    audioUrl?: string;
}

const songs: SongData[] = [
    {
        id: 0,
        title: "Shape of You",
        artist: "Ed Sheeran",
        duration: "03:53",
        albumId: 0,
        coverUrl: "https://upload.wikimedia.org/wikipedia/en/b/b4/Shape_Of_You_%28Official_Single_Cover%29_by_Ed_Sheeran.png",
        audioUrl: "/songs/song1.mp3",
    },
    {
        id: 1,
        title: "Blinding Lights",
        artist: "The Weekend",
        duration: "03:22",
        albumId: 1,
        coverUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/e/e6/The_Weeknd_-_Blinding_Lights.png/250px-The_Weeknd_-_Blinding_Lights.png",
        audioUrl: "/songs/song2.mp3",
    },
    {
        id: 2,
        title: "Levitating",
        artist: "Dua Lipa",
        duration: "03:23",
        albumId: 2,
        coverUrl: "https://upload.wikimedia.org/wikipedia/en/3/3d/Dua_Lipa_Levitating_%28DaBaby_Remix%29.png",
        audioUrl: "/songs/song3.mp3",
    },
    {
        id: 3,
        title: "Peaches",
        artist: "Justin Bieber",
        duration: "03:18",
        albumId: 3,
        coverUrl: "https://upload.wikimedia.org/wikipedia/en/0/0a/Justin_Bieber_-_Peaches.png",
        audioUrl: "/songs/song4.mp3",
    },
    {
        id: 4,
        title: "Watermelon Sugar",
        artist: "Harry Styles",
        duration: "03:07",
        albumId: 5,
        coverUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/b/bf/Watermelon_Sugar_-_Harry_Styles.png/250px-Watermelon_Sugar_-_Harry_Styles.png",
        audioUrl: "/songs/song5.mp3",
    },
    {
        id: 5,
        title: "Bad Guy",
        artist: "Billie Eilish",
        duration: "03:14",
        albumId: 4,
        coverUrl: "https://i1.sndcdn.com/artworks-000530693577-7adijn-t1080x1080.jpg",
        audioUrl: "/songs/song6.mp3",
    },
    {
        id: 6,
        title: "Stay",
        artist: "The Kid LAROI, Justin Bieber",
        duration: "02:21",
        albumId: 6,
        coverUrl: "https://upload.wikimedia.org/wikipedia/en/0/0c/The_Kid_Laroi_and_Justin_Bieber_-_Stay.png",
        audioUrl: "/songs/song7.mp3",
    },
    {
        id: 7,
        title: "Montero (Call Me By Your Name)",
        artist: "Lil Nas X",
        duration: "02:17",
        albumId: 7,
        coverUrl: "https://upload.wikimedia.org/wikipedia/en/e/e6/Montero_%28Call_Me_by_Your_Name%29.png",
        audioUrl: "/songs/song8.mp3",
    },
    {
        id: 8,
        title: "Kiss Me More",
        artist: "Doja Cat, SZA",
        duration: "03:28",
        albumId: 8,
        coverUrl: "https://upload.wikimedia.org/wikipedia/ru/b/b1/Doja_Cat_-_Kiss_Me_More.png",
        audioUrl: "/songs/song9.mp3",
    },
    

];

export default songs;