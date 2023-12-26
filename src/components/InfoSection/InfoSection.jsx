import styles from './InfoSection.module.scss';
import {Paper, Card, CardMedia, CardActions, CardContent, Typography, Collapse, Button} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useContext, useState } from 'react';
import {AudioContext} from '../../context/AudioContext'
import { SkeletonInfo } from '../Skeletons/SkeletonInfo/SkeletonInfo';

export const InfoSection = () => {

   const {isLoading} = useContext(AudioContext)
   const [expanded, setExpanded] = useState(false);

   const handleExpandClick = () => {
      setExpanded(!expanded);
   };

   const styleIcon = () => {
      return {transform: !expanded ? 'rotate(0deg)' : 'rotate(180deg)'}
   }

   return (
      <Paper className={styles.paper} sx={{maxWidth: 570, overflow: 'hidden'}}>
         {isLoading  ? <SkeletonInfo className={styles.skeleton}/>
                     :  <Card className={styles.card}>
                           <CardMedia 
                                 component="img"
                                 image="https://i.ibb.co/qx0Hjjs/world-Music-Day.png" 
                                 alt="World Music Day"
                                 sx={{
                                    maxHeight: '500px',
                                    objectFit: "contain" 
                                 }}>
                           </CardMedia>
                           <CardActions className={styles.actions} >
                              <Button  className={styles.btn} 
                                       variant="contained" 
                                       endIcon={<ExpandMoreIcon  sx={styleIcon()} />}
                                       size='large'
                                       expand={expanded}
                                       onClick={handleExpandClick}
                                       aria-label="show more"
                                       >Learn More</Button>
                           </CardActions>
                           <Collapse in={expanded} timeout="auto" unmountOnExit>
                              <CardContent className={styles.content}>
                                 <Typography paragraph className={styles.title} textAlign='center'>World Music Day</Typography>
                                 <Typography variant='body1' className={styles.text}>
                                    Also known as Fête de la Musique is celebrated every year on 21 June to honour the spirit of music and rejoice in the same. It is designated to pay tribute to music, an art that plays a significant role in everyone’s lives. The theme for World Music Day 2024 is yet to be announced. 
                                 </Typography>
                              </CardContent>
                           </Collapse>
                        </Card>}
      </Paper>
   )
}