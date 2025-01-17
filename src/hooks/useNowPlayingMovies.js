import { useEffect, useState } from "react";
import { TMDB_API_OPTIONS } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addNowPlayingMovies } from "../redux/movieSlice";

const useNowPlayingMovies = () =>{
    const dispatch = useDispatch()
    const nowPlayingMovies = useSelector(store=>store.movies.nowPlayingMovies);
    const fetchNowPlayingMovies = async () => {
        try {
            const response = await fetch(
                "https://api.themoviedb.org/3/movie/now_playing?language=IN&page=1",
                TMDB_API_OPTIONS
            );
            const jsonData = await response.json();
            dispatch(addNowPlayingMovies(jsonData?.results))
        } catch (error) {
            console.error("Failed to fetch now playing movies:", error);
        } 
    };

    useEffect(() => {
        !nowPlayingMovies && fetchNowPlayingMovies();

    }, []);

    return nowPlayingMovies;

}
export default useNowPlayingMovies;