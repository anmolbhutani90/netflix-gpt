import { useSelector } from "react-redux";
import useTrailerVideo from "../hooks/useTrailerVideo";

const VideoBackground = ({movieId})=>{
    useTrailerVideo(movieId)
    const trailerData = useSelector(store=>store.movies.trailerVideo);
    if(!trailerData) return;
    const trailerId = trailerData[0]?.key;
    return(
        <div className="w-screen">
            <iframe className="w-screen aspect-video" src={`https://www.youtube.com/embed/${trailerId}?autoplay=1&mute=1`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        </div>
    )
}
export default VideoBackground;