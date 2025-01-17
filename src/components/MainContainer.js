import { useSelector } from "react-redux";
import VideoBackground from "./VideoBackground";
import VideoTitle from "./VideoTitle";

const MainContainer = ()=>{
    const nowPlayingMovies = useSelector(store=>store?.movies?.nowPlayingMovies);
    if(!nowPlayingMovies) return
    const mainMovie = nowPlayingMovies[0];
    const {original_title, overview, id} = mainMovie;
    return(
        <div className="w-full overflow-hidden">
            <VideoBackground movieId={id}/>
            <VideoTitle title={original_title} overview={overview}/>
        </div>
    )
}
export default MainContainer;