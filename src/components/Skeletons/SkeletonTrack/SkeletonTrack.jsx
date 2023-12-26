import styles from './SkeletonTrack.module.scss'
import {Box, Skeleton } from "@mui/material"

export const SkeletonTrack = () => {
   return (
      <Box className={styles.container}>
         <Box >
            <Skeleton animation="wave" variant='circular' width={50} height={50} />
         </Box>
         <Box >
            <Skeleton animation="wave" variant='rounded' width={50} height={50} />
         </Box>
         <Box className={styles.wideBlock}>
            <Skeleton animation="wave" variant='rounded' height={50} width='1000px'/>
         </Box>
      </Box>
   )
}