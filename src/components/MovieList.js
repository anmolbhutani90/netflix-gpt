import MovieCard from "./MovieCard";

const MovieList = ({title, movies})=>{
    if(!movies) return
    return(
        <div className="flex flex-col pt-6">
            <h3 className="font-bold text-xl mb-5 text-white">{title}</h3>
            <div className="flex flex-row gap-4 overflow-x-auto">
            <div className="flex">{movies.map((movie)=>{
                return <MovieCard key={movie?.id} posterPath={movie?.poster_path}/>
            })
            }
            </div>
            </div>
        </div>
    )
}
export default MovieList;