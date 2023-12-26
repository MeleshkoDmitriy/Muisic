import styles from './EmptyDrawer.module.scss'
import empty from '../../../../src/img/emptyFav.png'
import { Box, Typography } from '@mui/material'

export const EmptyDrawer = () => {
   return (
   <Box className={styles.wrapper}>
      <Typography variant='p' className={styles.text} textAlign='center'>
         Like your favorite tracks to add them to the collection
      </Typography>
      <img  src={empty} width={280} alt='' />
   </Box>
   )
}