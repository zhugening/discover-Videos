// Obtion1 - use API
// import videosData from "../data/videos.json";


// export const getCommonVideos = async (url) =>{

//     const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
//     //https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=disney%20trailer&key=[YOUR_API_KEY] 

//     try {
//         const BASE_URL = 'youtube.googleapis.com/youtube/v3'
        
//         const response = await fetch(`https://${BASE_URL}/${url}&25&key=${YOUTUBE_API_KEY}`);
        
    
//         const data = await response.json();
//         console.log(data)

//     if (data?.error) {
//         console.error("Youtube API error", data.error);
//         return [];
//     }

//     return data?.items.map((item) => {
//         console.log(data)
//         const id = item.id?.videoId || item.id
//         const snippet = item.snippet;
//         return {
//             title : item.snippet?.title,
//             imgUrl: item.snippet.thumbnails.high.url,
//             id,
//         };
//     });
// } catch (error) {
//     console.error("Somthing went wrong with videos libary", error);
//     return [];
// }
// };

// export const getVideos =(searchQuery) =>{
//     const URL = `search?part=snippet&maxResults=25&q=${searchQuery}&type=video`;
//     return getCommonVideos(URL);
// };

// export const getPopularVideos = () =>{
//     const URL = `videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=JP`
//     return getCommonVideos(URL);
// }



// Option 2 remake again
import videoData from "../data/videos.json";


export const getCommonVideos = async(url) => {
    
    const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

    try { 
    const BASE_URL = "youtube.googleapis.com/youtube/v3"
    
    const response = await fetch(`https://${BASE_URL}/${url}&key=${YOUTUBE_API_KEY}`)
    const data = await response.json();

    if (data?.error) {
        console.error("Youtube API error", data.error);
        return [];
    }

    return data?.items.map( (item) => {
        // console.log({ id: item.id });
        const id = item.id?.videoId || item.id;
        return {
            title: item.snippet.title,
            imgUrl: item.snippet.thumbnails.high.url,
            id ,
        };
    });
} catch (error) {
    console.error("Somthing went wrong with video library", error);
    return [];
}
};

export const getVideos = (searchQuery) => {
    const URL = `search?part=snippet&maxResults=25&q=${searchQuery}&type=video`
    return getCommonVideos(URL)
};

export const getPopularVideos = () =>{
    const URL = `videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US` 
    return getCommonVideos(URL)

}