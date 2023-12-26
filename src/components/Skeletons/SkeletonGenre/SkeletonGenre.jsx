import styles from './SkeletonGenre.module.scss'
import {Box, Skeleton } from "@mui/material"

export const SkeletonGenre = () => {
   return (
      <Box className={styles.container}>
         <Skeleton animation="wave" variant='rounded' width='1000px' height={300} />
      </Box>
   )
}