import styles from './SkeletonInfo.module.scss'
import { Box, Skeleton } from '@mui/material'

export const SkeletonInfo = () => {
   return (
      <Box className={styles.wrapper}>
         <Box className={styles.content}>
            <Skeleton variant="rounded" animation="wave" width='1000px' height={250} />
            <Skeleton variant="rounded" animation="wave" width='1000px' height={42} />
         </Box>
      </Box>
   )
}