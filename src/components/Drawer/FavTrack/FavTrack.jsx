import styles from './FavTrack.module.scss';
import { Box, Paper, Typography, IconButton} from '@mui/material';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { useContext } from 'react';
import { AudioContext } from '../../../context/AudioContext';
import {PlayArrow, Pause} from '@mui/icons-material';

export const FavTrack = (favTrack) => {

   const {preview, title, artists, id} = favTrack;
   const {handleToggleAudio, currentTrack, isPlaying, likeHandler} = useContext(AudioContext)
   const isCurrentTrack = currentTrack.id === favTrack.id;

   return (
      <Paper id={id} elevation={3} className={styles.wrapper} >
         <IconButton className={styles.controlBtn} onClick={() => handleToggleAudio(favTrack)}>
            {isCurrentTrack && isPlaying ? <Pause fontSize='large'/> : <PlayArrow fontSize='large'/>}
         </IconButton>
         <img className={styles.img} src={preview} alt="" />
         <Box className={styles.info} onClick={() => handleToggleAudio(favTrack)}>
            <Typography variant='subtitle1' fontSize='14px'>{artists} - <b>{title}</b></Typography>
         </Box>
         <IconButton className={styles.unlike} onClick={() =>likeHandler(favTrack)}>
            <CancelRoundedIcon />
         </IconButton>
      </Paper>
   )
}