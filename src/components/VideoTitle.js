const VideoTitle = ({title,overview})=>{
    return(
        <div className="absolute pt-[30%] z-20 top-6 left-8 text-white w-4/12">
            <h3 className="text-4xl font-bold mb-3">{title}</h3>
            <p>{overview}</p>
            <div className="flex gap-6 my-6">
                <button className="bg-white text-black font-bold text-lg rounded-lg py-2 px-10">Play</button>
                <button className="bg-gray-400 text-white font-bold text-lg rounded-lg py-2 px-6">More Info</button>
            </div>
        </div>
    )
}
export default VideoTitle;