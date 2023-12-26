import styles from './AppDrawer.module.scss'
import {Drawer, Box, Button} from '@mui/material';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import { FavTrack } from './FavTrack/FavTrack';
import { useContext } from 'react';
import { AudioContext } from '../../context/AudioContext';
import { EmptyDrawer } from './EmptyDrawer/EmptyDrawer';

export const AppDrawer = ({toggleDrawer, setDrawerOpen, isDrawerOpen}) => {

   const {favorites} = useContext(AudioContext)

   return (
      <Drawer  className={styles.drawer}
               anchor='right'
               open={isDrawerOpen}
               onClose={() => setDrawerOpen(false)}>
         <Box className={styles.container}>
            {(favorites.length === 0)  ? <EmptyDrawer className={styles.empty}/>
                                       : <Box className={styles.list}>
                                             {favorites.map((favTrack) => {
                                                return <FavTrack key={favTrack.id} {...favTrack} />})}
                                          </Box>}
            <Box className={styles.btn}>
               <Button  onClick={() => toggleDrawer()}
                        variant="contained"
                        className={styles.backBtn}
                        startIcon={<ArrowBackIosNewRoundedIcon fontSize='small'/>}
                        sx={{
                           height: '50px',
                        }}>
                  Back
               </Button>
            </Box>
         </Box>
      </Drawer>
   )
}