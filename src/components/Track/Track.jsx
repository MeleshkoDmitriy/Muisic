import styles from './Track.module.scss'
import {Box, IconButton, Typography, InputBase} from '@mui/material'
import {PlayArrow, Pause} from '@mui/icons-material';
import secondsToMMSS from '../../utils/secondsToMMSS';
import { AudioContext } from '../../context/AudioContext';
import { useContext, useState } from 'react';
import cn from 'classnames'
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import DownloadIcon from '@mui/icons-material/Download';
import Tooltip from '@mui/material/Tooltip';
import ShareRoundedIcon from '@mui/icons-material/ShareRounded';
import {Modal} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import RedditIcon from '@mui/icons-material/Reddit';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';

export const Track = (
   track
) => {
   const {id, preview, title, artists, duration, src} = track;

   const formattedDuration = secondsToMMSS(duration)
   
   const {handleToggleAudio, currentTrack, isPlaying, likeHandler, likes} = useContext(AudioContext)

   const isCurrentTrack = currentTrack.id === track.id;

   const [open, setOpen] = useState(false)
   const [isCopy, setCopy] = useState(false)
   const [link, setLink] = useState(src)

   const copyLink = () => {
      navigator.clipboard.writeText(link)
      setCopy(true)
   }

   const handleClose = () => {
      setOpen(false);
      setCopy(false)
   } 
   const handleOpen = () => setOpen(true)

   const styleModal = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      maxWidth: 400,
      height: 200,
      width: '100%',
      bgcolor: '#fff',
      borderRadius: 1,
      boxShadow: 24,
      padding: '20px',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-evenly',
      alignItems: 'center',
   };

   const stylesTextField = {
      color: '#d268cc',
      border: '1px solid #d268cc',
      borderRadius: '5px',
      padding: '10px'
   }

   return (
      <>
         <Box id={id} className={cn(styles.track, isCurrentTrack && styles.playing)}>
            <IconButton onClick={() => handleToggleAudio(track)}>
               {isCurrentTrack && isPlaying ? <Pause fontSize='large' className={styles.controlBtns}/> : <PlayArrow fontSize='large' className={styles.controlBtns}/>}
            </IconButton>
            <img className={styles.preview} src={preview} alt="" />
            <Box className={styles.credits}>
               <Typography variant='subtitle2' fontSize='20px' >{title}</Typography>
               <Typography variant='subtitle1'>{artists}</Typography>
            </Box>
            <Tooltip disableFocusListener disableTouchListener title="Click to get a download link">
            <a href={src} target='blank' download>
               <IconButton >
                  <DownloadIcon className={styles.actions}/>
               </IconButton>
            </a>
            </Tooltip>
            <IconButton onClick={() => likeHandler(track)}>
               {likes.find(like => track.id === like.id) ? <FavoriteIcon className={`${styles.like} ${styles.actions} `}/> 
                                                         : <FavoriteBorderIcon className={styles.actions}/>}
            </IconButton>
            <IconButton >
               <ShareRoundedIcon onClick={handleOpen} className={styles.actions}/>
               <Modal   open={open}
                        onClose={handleClose}
                        className={styles.modal}>
                        <Box sx={styleModal} className={styles.wrapper}>
                           <Box className={styles.close}>
                              <IconButton className={styles.icons} onClick={handleClose}>
                                 <ClearRoundedIcon className={styles.iconClose}/>
                              </IconButton>
                           </Box>
                           <Box>
                              <Typography variant='p' fontSize={20} className={styles.title}>Share this track by</Typography>
                           </Box>
                           <Box sx={{
                                             width: '100%'
                                          }}> 
                              <IconButton onClick={handleClose} className={styles.social}>
                                 <FacebookIcon  fontSize='medium' />
                              </IconButton>
                              <IconButton  onClick={handleClose} className={styles.social}>
                                 <InstagramIcon fontSize='medium'/>
                              </IconButton >
                              <IconButton onClick={handleClose} className={styles.social}>
                                 <RedditIcon fontSize='medium'/>
                              </IconButton >
                              <IconButton onClick={handleClose} className={styles.social}>
                                 <WhatsAppIcon fontSize='medium'/>
                              </IconButton >
                              <IconButton onClick={handleClose} className={styles.social}>
                                 <AlternateEmailIcon fontSize='medium'/>
                              </IconButton >
                              <IconButton onClick={handleClose} className={styles.social}>
                                 <ShareRoundedIcon fontSize='medium'/>
                              </IconButton >
                           </Box>
                           <Box className={styles.link}>
                              <InputBase  
                                          fullWidth
                                          focused 
                                          label="Copy link"
                                          value={link}
                                          sx={stylesTextField}
                                          className={styles.textfield}
                                          />

                                 <IconButton className={styles.copyBtn}
                                             onClick={(event) => copyLink(event.target.value)}>
                                    {isCopy  ? <Tooltip title="Link copied successfully" arrow><CheckRoundedIcon fontSize='large'/></Tooltip>
                                             :  <Tooltip title="Click to copy link" arrow>
                                                   <ContentCopyIcon fontSize='large'/>
                                                </Tooltip>}
                                 </IconButton>
                           </Box>
                        </Box>
               </Modal>
            </IconButton>
            <Typography variant='p' className={styles.duration}>{formattedDuration}</Typography>
         </Box>
      </>
   )
}