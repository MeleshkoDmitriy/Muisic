import styles from './Genre.module.scss'
import {Paper, Card, Typography, CardMedia, CardContent, CardActionArea} from '@mui/material'
import cn from 'classnames'

export const Genre = (genre) => {

   const {id, src, title, active} = genre;

   const isActive = active === true;

   return (
      <Paper className={styles.wrapper} id={id}>
         <CardActionArea>
            <Card className={cn(styles.card, isActive && styles.active)}>
               <CardMedia
                  sx={{ 
                        minHeight: 240,
                        minWidth: 240,
                        maxHeight: 350,
                        objectFit: 'contain',
                        backgroundPositionY: '0'
                        }}
                  image={src}
               />
               <CardContent className={cn(styles.info, isActive && styles.active)}>
                  <Typography variant='subtitle2'>{title}</Typography>
               </CardContent>
            </Card>
         </CardActionArea>
      </Paper>
   )
}