import { Box, Typography } from "@mui/material"
import imgNotFound from '../../img/notFound.png'
import styles from './NotFound.module.scss'

export const NotFound = () => {
   return (
      <Box className={styles.wrapper}>
         <Typography variant="p" className={styles.text}>Sorry, we couldn't find any results</Typography>
         <img src={imgNotFound} className={styles.img} width={400} height={400} alt="Not Found" />
      </Box>
   )
}