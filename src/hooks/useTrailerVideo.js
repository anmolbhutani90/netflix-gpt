import { useEffect } from "react";
import { TMDB_API_OPTIONS } from "../utils/constants"
import { useDispatch, useSelector } from "react-redux";
import { addTrailerVideo } from "../redux/movieSlice";

const useTrailerVideo = (movie_id) =>{
    const dispatch = useDispatch();
    const trailerVideos = useSelector(store=>store.movies.trailerVideo)
    const fetchTrailerVideo = async () =>{
        const movieData = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}/videos?language=IN`, TMDB_API_OPTIONS)
        const jsonData = await movieData.json();
        const trailerVideo = jsonData?.results.filter((vid)=>vid.type === 'Trailer');
        const officialTrailer = trailerVideo.filter((v)=>v.name==="Official Trailer");

        dispatch(addTrailerVideo(officialTrailer))
    }

    useEffect(()=>{
       !trailerVideos && fetchTrailerVideo()
    },[])

}
export default useTrailerVideo;