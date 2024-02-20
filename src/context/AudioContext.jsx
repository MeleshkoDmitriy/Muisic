import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const defaultTrack = tracksList[0];

const audio = new Audio(defaultTrack.src);

export const AudioContext = createContext({})

let data = null;
let genres = null;

export const AudioProvider = ({children}) => {

   const [tracklist, setTracklist] = useState([])
   const [isLoading, setLoading] = useState(true);

   const [currentTrack, setCurrentTrack] = useState(defaultTrack);
   const [isPlaying, setPlaying] = useState(false);
   const [volume, setVolume] = useState(0)

   const [search, setSearch] = useState('')
   const [isNotFound, setNotFound] = useState(false)
   const [searching, setSearching] = useState(false)

   const [favorites, setFavorites] = useState([])
   const [likes, setLikes] = useState([])

   const [genre, setGenre] = useState([])

   const [openSnack, setOpenSnack] = useState(false);
   const [snack, setSnack] = useState('');

   useEffect(() => {
      async function fetchData() {
         try {
         setLoading(true);

         const [tracklistResponse, genresResponce] = await Promise.all([
            axios.get('https://22a059f79fb4c54b.mokky.dev/tracklist'),
            axios.get('https://22a059f79fb4c54b.mokky.dev/genres'),
         ])

         data = tracklistResponse.data;
         setTracklist(data);
         setCurrentTrack(data[0])
         setFavorites(data.filter((obj) => obj.liked === true))
         setLikes(data.filter((obj) => obj.liked === true))
         audio.volume = 0.5;
         setVolume(audio.volume)

         genres = genresResponce.data;
         setGenre(genres)

         } catch (error) {
         alert('Error! Something wrong with data responce')
         } finally {
            setTimeout(() => {
               // I made this timeout only for show you how skeleton works
               setLoading(false)
            }, 1500)
         }
   }
   fetchData();
},[])

const onChangeVolume = (event) => {
   const currentVolume = Math.round(event.target.value + Number.EPSILON);
   audio.volume = currentVolume / 100;
   setVolume(audio.volume);
   
}

const handleToggleAudio = (track) => {

   if(currentTrack.id !== track.id) {
      setCurrentTrack(track);
      setPlaying(true)
      audio.src = track.src;
      audio.currentTime = 0;
      audio.play();
      return;
   }

   if(isPlaying) {
      audio.pause()
      setPlaying(false)
   } else {
      audio.play()
      setPlaying(true)
   }
}

const playPreviousTrack = (currentTrack) => {
   const previousTrackId = currentTrack.id - 1;
   const previousTrack = tracklist.find((track) => track.id === previousTrackId);
   const lastTrack = tracklist[tracklist.length - 1]

   if(previousTrackId > 0) {
      setCurrentTrack(previousTrack)
      audio.src = previousTrack.src;
      audio.currentTime = 0;
      audio.play()
      setPlaying(true)
   } else {
      setCurrentTrack(lastTrack)
      audio.src = lastTrack.src;
      audio.currentTime = 0;
      audio.play()
      setPlaying(true)
   }
}

const playNextTrack = (currentTrack) => {
   const nextTrackId = currentTrack.id + 1;
   const nextTrack = tracklist.find((track) => track.id === nextTrackId);
   const quantityTracks = tracklist.length;

   if(nextTrackId <= quantityTracks) {
      setCurrentTrack(nextTrack)
      audio.src = nextTrack.src;
      audio.currentTime = 0;
      audio.play()
      setPlaying(true)
   } else {
      setCurrentTrack(tracklist[0])
      audio.src = tracklist[0].src;
      audio.currentTime = 0;
      audio.play()
      setPlaying(true)
   }
}

const handleSnackClick = () => {
   setOpenSnack(true);
};

const handleSnackClose = (event, reason) => {
   if (reason === 'clickaway') {
      return;
   }

   setOpenSnack(false);
};

const likeHandler = async (obj) => {

   let foundedId = obj.id;

   try {
      if(favorites.find(el => el.id === obj.id)) {
         await axios.patch(`https://22a059f79fb4c54b.mokky.dev/tracklist/${foundedId}`, {liked: false})
         setFavorites((prev) => prev.filter((item) => item.id !== obj.id))
         setLikes((prev) => prev.filter((item) => item.id !== obj.id))
         setSnack(`You unliked: ${obj.artists} - ${obj.title}`)
         handleSnackClick()
      } else {
         await axios.patch(`https://22a059f79fb4c54b.mokky.dev/tracklist/${foundedId}`, {liked: true})
         setFavorites(prev => [...prev, obj])
         setLikes(prev => [...prev, obj])
         setSnack(`You liked: ${obj.artists} - ${obj.title}`)
         handleSnackClick()
      }

   } catch (error) {
      alert('Error! Something wrong with favorites')
   }
};


const favoritesLength = () => {
   return favorites.length;
}

   const runSearch = (query) => {

   if(!query) {
      return data;
   }

   const lowerCaseQuery = query.toLowerCase();

   const result = tracklist.filter((track) => track.artists.toLowerCase().includes(lowerCaseQuery) || track.title.toLowerCase().includes(lowerCaseQuery));

   return result;
}

   const handleChange = (event) => {

   if(event.target.value) {
      setSearching(true)
   } else {
      setSearching(false)
   }

   setSearch(event.target.value)
   const foundTracks = runSearch(event.target.value)
   setTracklist(foundTracks)
   if (foundTracks.length === 0) {
      setNotFound(true)
      setTracklist(data)
   } else {
      setNotFound(false)
   }
}

const clearSearch = () => {
   setSearch('')
   setTracklist(data)
   setNotFound(false)
   setSearching(false)
}

   const value = {
            audio, 
            currentTrack, 
            isPlaying, 
            handleToggleAudio, 
            likeHandler,
            tracklist,
            isLoading,
            search, 
            setSearch, 
            isNotFound, 
            setNotFound,
            searching, 
            setSearching,
            handleChange,
            clearSearch,
            runSearch,
            favoritesLength,
            favorites,
            likes,
            setLikes,
            genre,
            setGenre,
            openSnack,
            setOpenSnack,
            snack,
            setSnack,
            handleSnackClick,
            handleSnackClose,
            playNextTrack,
            playPreviousTrack,
            volume,
            setVolume,
            onChangeVolume
   }

   return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>
}