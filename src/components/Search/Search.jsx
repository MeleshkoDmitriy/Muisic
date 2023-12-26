import styles from './Search.module.scss'
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton'
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import Box from '@mui/material/Box';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { useContext } from 'react';
import Zoom from '@mui/material/Zoom';
import { AudioContext } from '../../context/AudioContext';

export const Search = () => {

   const {handleChange, search, clearSearch, searching} = useContext(AudioContext)

   return (
      <Box className={styles.search}>
         <Paper   className={styles.paper}
                  elevation={3}
                  sx={{ height: '50px', 
                        display: 'flex', 
                        flexDirection: 'row', 
                        // justifyContent: 'space-between', 
                        alignItems: 'center'}}>
            <SearchRoundedIcon   className={styles.iconSearch} fontSize="medium"
                                 sx={{ml:'10px'}}/>
                                 
            <InputBase  className={styles.input}
                        onChange={handleChange}
                        value={search}
                        sx={{ ml: '20px',
                              flexGrow: 1,
                              flexShrink: 1,
                              flexBasis: 'auto'}}
                        placeholder="Search..." 
                        />
                           <Zoom in={searching}>
                              <IconButton 
                                 onClick={clearSearch}
                                 className={`${styles.clear} ${styles.icons}`}
                                 sx={{m: '10px'}}>
                                    <ClearRoundedIcon 
                                                fontSize="medium" />
                              </IconButton>
                           </Zoom>
         </Paper>
      </Box>
   )
}