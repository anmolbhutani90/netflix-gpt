import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const SecondaryContainer = ()=>{
    const nowPlayingMovies = useSelector(store=>store.movies?.nowPlayingMovies);
    const popularMovies = useSelector(store=>store.movies?.popularMovies)
    
    if(!nowPlayingMovies && !popularMovies) return
    return(
        <div className="-mt-[10%] z-30 px-10 bg-black">
            <MovieList title="Now Playing" movies={nowPlayingMovies}/>
            <MovieList title="Popular" movies={popularMovies}/>
        </div>
    )
}
export default SecondaryContainer;