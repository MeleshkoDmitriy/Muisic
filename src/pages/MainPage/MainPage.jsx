import { useContext} from 'react'
import { Track } from '../../components/Track/Track'
import styles from './MainPage.module.scss'
import { NotFound } from '../../components/NotFound/NotFound';
import { AudioContext } from '../../context/AudioContext';
import Box from '@mui/material/Box'
import { Container, Grid, Paper, Typography } from '@mui/material';
import { SkeletonTrack } from '../../components/Skeletons/SkeletonTrack/SkeletonTrack';
import { Genre } from '../../components/Genre/Genre';
import { SkeletonGenre } from '../../components/Skeletons/SkeletonGenre/SkeletonGenre';
import { InfoSection } from '../../components/InfoSection/InfoSection';
import { AppSnackbar } from '../../components/AppSnackbar/AppSnackbar';

export const MainPage = () => {

   const {tracklist, isLoading, isNotFound, genre} = useContext(AudioContext)

   const renderTracks = () => {
      return (
         isLoading   ? tracklist.map((track, index) => <SkeletonTrack key={index}>{index}</SkeletonTrack>)
                     : tracklist.map(track => {
                        return (
                                    <Track 
                                    key={track.id} 
                                    {...track} 
                                    />
                        )})
      )
   }

   const renderGenres = () => {
      return (
         isLoading   ? genre.map((g, i) => <SkeletonGenre key={i}></SkeletonGenre>)
                     : genre.map((g) => <Genre key={g.id} {...g}></Genre>)
      )
   }

   return (
      <>
      <AppSnackbar />
            <Container maxWidth="lg" className={styles.container}>
                              <Grid container>
                                 <Grid item  xs={12} sm={6} md={6} lg={3}
                                             order={{lg: 1, md: 2, sm: 2, xs: 2}}
                                             className={styles.infoSection}>
                                    <InfoSection />
                                 </Grid>
                                 {isNotFound ? <Grid item   xs={12} sm={12} md={12} lg={6}
                                                            order={{lg: 2, md: 1, sm: 1, xs: 1}}
                                                            ><NotFound /></Grid>
                                             : <Grid item xs={12} sm={12} md={12} lg={6} order={{lg: 2, md: 1, sm: 1, xs: 1}}>
                                                   <Paper elevation={3}>
                                                      <Box className={styles.list}>
                                                         {renderTracks()}
                                                      </Box>
                                                   </Paper>
                                                </Grid>}
                                 <Grid item  xs={12} sm={6} md={6} lg={3}
                                             order={{lg: 3, md: 3, sm: 3, xs: 3}}
                                             >
                                    <Paper   className={styles.genres}
                                             elevation={3}>
                                                <Typography className={styles.genresTitle}
                                                            variant='h2'
                                                            sx={{
                                                               textAlign: 'center',
                                                               lineHeight: '60px',
                                                            }}
                                                >Genres</Typography>
                                       {renderGenres()}
                                    </Paper>
                                 </Grid>
                              </Grid>
            </Container>
      </>
   )
}

