import styles from './Header.module.scss';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { IconButton} from '@mui/material';
import Badge from '@mui/material/Badge';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import FavoriteIcon from '@mui/icons-material/Favorite';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Search } from '../Search/Search';
import Grid from '@mui/material/Grid';
import { useContext } from 'react';
import { AudioContext } from '../../context/AudioContext';
import logoWhite from '../../img/icons/logoWhite.png'
import { useState } from 'react';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';

const BurgerMenu = ({toggleDrawer}) => {

   const {favoritesLength} = useContext(AudioContext);
   const [anchorEl, setAnchorEl] = useState(null);
   const open = Boolean(anchorEl);

   const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
   };
   const handleClose = () => {
      setAnchorEl(null);
   };
      return (
            <Box sx={{ display: { xs: 'block', sm: 'none', md: 'none', lg: 'none', xl: 'none' }}} >
            <Tooltip title="Show menu">
               <Badge   badgeContent={favoritesLength()} max={99}
                        color='error'>
                  <IconButton
                     onClick={handleClick}
                     size="large"
                     aria-controls={open ? 'menu' : undefined}
                     aria-haspopup="true"
                     aria-expanded={open ? 'true' : undefined}
                  >
                     <MenuRoundedIcon className={styles.birgerIcon} fontSize='medium'/>
                  </IconButton>
               </Badge>
            </Tooltip>
            <Menu
            anchorEl={anchorEl}
            id="menu"
            open={open}
            onClose={handleClose}
         >
            <MenuItem onClick={handleClose}>
            <Tooltip disableFocusListener disableTouchListener title="There are no new updates">
                  <IconButton >
                     <Badge   className={styles.badges}
                              badgeContent={0} max={99}>
                        <CircleNotificationsIcon fontSize="large" className={styles.iconsMenu} />
                     </Badge>
                  </IconButton>
               </Tooltip>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleClose}>
               <IconButton onClick={() =>toggleDrawer()}>
                  <Badge   className={styles.badges}
                           badgeContent={favoritesLength()} max={99}
                           color='error'
                           >
                     <FavoriteIcon fontSize="large" className={styles.iconsMenu} />
                  </Badge>
               </IconButton>
            </MenuItem>
            <Divider />
            <MenuItem >
               <a target='blank' href='https://github.com/DmitriyMeleshko/musicApp'>
                  <IconButton >
                     <Badge >
                           <GitHubIcon fontSize="large" className={styles.iconsMenu} />
                     </Badge>
                  </IconButton>
               </a>
            </MenuItem>
         </Menu>
            </Box>
      )
   }


export const Header = ({toggleDrawer}) => {

   const {favoritesLength} = useContext(AudioContext);

   return (
      <header className={styles.header}>
            <AppBar className={styles.appBar}>
               <Container maxWidth="lg" className={styles.container}>
                  <Grid container  className={styles.wrapper}>
                        <Grid item xs={2} sm={2} md={3} className={styles.logo}>
                           <Box >
                              <img src={logoWhite} alt='' className={styles.logoImg}/>
                           </Box>
                        </Grid>
                        <Grid item xs={7} sm={7} md={6} className={styles.search}>
                           <Search className={styles.search__component}/>
                        </Grid>
                        <Grid item xs={3} sm={3} md={3} className={styles.menu} >
                        <IconButton sx={{ display: { xs: 'none', sm: 'block' }}}>
                           <Tooltip disableFocusListener disableTouchListener title="There are no new updates">
                              <Badge   className={styles.badges}
                                       badgeContent={0} max={99}
                                       color='error'>
                                 <CircleNotificationsIcon fontSize="large" className={styles.icons} />
                              </Badge>
                           </Tooltip>
                        </IconButton>
                        <IconButton 
                           onClick={() => toggleDrawer()}
                           sx={{ display: { xs: 'none', sm: 'block' }}}
                        >
                           <Badge   className={styles.badges}
                                    badgeContent={favoritesLength()} max={99}
                                    color='error'
                                    >
                              <FavoriteIcon fontSize="large" className={styles.icons} />
                           </Badge>
                        </IconButton>
                        <a target='blank' href='https://github.com/MeleshkoDmitriy/Muisic'>
                           <IconButton sx={{ display: { xs: 'none', sm: 'block' }}}>
                              <Badge >
                                    <GitHubIcon fontSize="large" className={styles.icons} />
                              </Badge>
                           </IconButton>
                        </a>
                        <BurgerMenu toggleDrawer={toggleDrawer}/>
                        </Grid>
                  </Grid>
               </Container>
            </AppBar>
      </header>
   )
}

