import styles from './Playbar.module.scss'
import { useContext, useState, useEffect } from 'react'
import { AudioContext } from '../../context/AudioContext'
import {IconButton, Slider, Box, Typography, Avatar, Grid, Paper} from '@mui/material'
import {PlayArrow, Pause} from '@mui/icons-material'
import secondsToMMSS from '../../utils/secondsToMMSS'
import Container from '@mui/material/Container'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import DownloadIcon from '@mui/icons-material/Download';

const TimeControls = () => {

   const { audio, currentTrack } = useContext(AudioContext);
   const { duration } = currentTrack;
   const [currentTime, setCurrentTime] = useState(0)
   const sliderCurrentTime = Math.round((currentTime / duration) * 100)
   const formattedCurrentTime = secondsToMMSS(currentTime)

   const onChangeCurrentTime = (_, value) => {
      const time = Math.round((value / 100) * duration)
      setCurrentTime(time);
      audio.currentTime = time;
   }

   useEffect(() => {
      const timeInterval = setInterval(() => {
         setCurrentTime(audio.currentTime)
      }, 1000)

      return () => {
         clearInterval(timeInterval);
      };
   }, [])

   return (
      <>
         <Typography variant='p' component='p'>{formattedCurrentTime}</Typography>
         <Slider  step={1} min={0} max={100} 
                  size="small"
                  value={sliderCurrentTime}
                  onChange={onChangeCurrentTime}
                  className={styles.sliderTime}/>
      </>
   )
}

export const Playbar = () => {

   const renderVolumeIcon = (volume) => {
      if (volume === 0) {
         return <><VolumeOffIcon /></>
      } else if (volume > 0 && volume < 0.51) {
         return <><VolumeDownIcon className={styles.iconFix}/></>
      } else {
         return <><VolumeUpIcon /></>
      }
   }

   const {currentTrack, isPlaying, handleToggleAudio, likeHandler, likes, playNextTrack, playPreviousTrack, volume, onChangeVolume} = useContext(AudioContext)
   const { artists, title, preview, duration, src } = currentTrack;
   const formattedDuration = secondsToMMSS(duration);

   return (
      <Paper className={styles.playbar} elevation={5} sx={{
         bgcolor: '#9340fe'
      }}>
            <Container className={styles.container} maxWidth="lg"
                        sx={{
                           display: 'flex',
                           height: '100%',
                        }}>
               <Grid container className={styles.gridContainer}>
                  <Grid item xs={12} sm={6} md={3} lg={3} order={{xs:1, sm:1, md:1, lg:1}} className={styles.left}
                        sx={{
                           display: 'flex',
                           alignItems: 'center',
                           }}>
                     <Avatar  sx={{width: '55px', height: '55px',}}
                           className={styles.preview} src={preview} alt=''/>
                     <Box  className={styles.credits}
                        sx={{
                           margin: '10px',
                        }}>
                        <Typography variant='h5' component='h5'>{title}</Typography>
                        <Typography variant='p' component='p' sx={{fontWeight: 'bold'}}>{artists}</Typography>
                     </Box>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} order={{xs:2, sm:3, md:2, lg:2}} className={styles.center}
                        sx={{
                           display: 'flex',
                           flexDirection: 'column',
                        }}>
                           
                        <Box  className={styles.buttons}
                              sx={{
                                 display: 'flex',
                                 justifyContent: 'space-between',
                                 alignItems: 'center'
                              }}>
                           <IconButton 
                           onClick={() => likeHandler(currentTrack)}>
                              {likes.find(like => currentTrack.id === like.id) ? <FavoriteIcon className={styles.btn}/> : <FavoriteBorderIcon className={styles.btn}/>}
                           </IconButton>
                           <IconButton onClick={() => playPreviousTrack(currentTrack)}>
                              <SkipPreviousIcon className={styles.btn}/>
                           </IconButton>
                           <IconButton className={styles.playBtn} onClick={() => handleToggleAudio(currentTrack)}>
                              {isPlaying ? <Pause className={styles.btn} fontSize='large'/> : <PlayArrow className={styles.btn} fontSize='large'/>}
                           </IconButton>
                           <IconButton onClick={() => playNextTrack(currentTrack)}>
                              <SkipNextIcon className={styles.btn}/>
                           </IconButton>
                           <a href={src} target='blank' download>
                              <IconButton >
                                 <DownloadIcon className={styles.btn}/>
                              </IconButton>
                           </a>
                        </Box>
                        <Box  className={styles.timing}
                              sx={{
                                 display: 'flex',
                              }}>
                           <TimeControls />
                           <Typography variant='p' component='p'>{formattedDuration}</Typography>
                        </Box>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3} lg={3} order={{xs:3, sm:2, md:3, lg:3}} className={styles.right}>
                     <Box  className={styles.iconVolume}
                           sx={{
                              width: '30px',
                              height: '30px',
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'center',
                              alignItems: 'flex-end',
                           }}>
                        {renderVolumeIcon(volume)}
                     </Box>
                     <Slider  step={1} min={0} max={100} 
                              defaultValue={volume} valueLabelDisplay="auto"
                              size="small" aria-label="Small"
                              value={Math.round(volume * 100)}
                              onChange={(event) => onChangeVolume(event)}
                              className={styles.sliderVolume}/>
                  </Grid>
               </Grid>
            </Container>
      </Paper>
   )
}