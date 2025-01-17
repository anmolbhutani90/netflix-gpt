import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TMDB_API_OPTIONS } from "../utils/constants";
import { addPopularMovies } from "../redux/movieSlice";

const usePopularMovies = () =>{
    const dispatch = useDispatch();
    const popularMovies = useSelector(store=>store.movies?.popularMovies)
    const fetchPopularMovies = async () =>{
        const popularData = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', TMDB_API_OPTIONS);
        const popularJson = await popularData.json();
        console.log('popular', popularJson);
        dispatch(addPopularMovies(popularJson?.results))
    }
    useEffect(()=>{
        !popularMovies && fetchPopularMovies()
    },[])

}
export default usePopularMovies;