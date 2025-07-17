import { useParams } from "react-router-dom"

const AlbumPage:React.FC = () => {
    const { id } = useParams(); // для получения параметра из url

    return (
        <div className="text-white">
            <h1 className="text-2xl font-bold mb-4">Album ID: {id}</h1>
            <p>SAS</p>
        </div>
    )
}

export default AlbumPage;