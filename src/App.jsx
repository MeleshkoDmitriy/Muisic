import { MainPage } from "./pages/MainPage/MainPage"
import styles from './global.module.scss'
import { Playbar } from "./components/Playbar/Playbar"
import { Header } from "./components/Header/Header"
import { useState, useContext} from "react";
import { AudioContext } from "./context/AudioContext";
import { AppDrawer } from "./components/Drawer/AppDrawer";

export const App = () => {

  const {isLoading} = useContext(AudioContext);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen)
  }

  return (
    <div className={styles.wrapper}>
      <Header className={styles.header} toggleDrawer={toggleDrawer}/>
      <AppDrawer toggleDrawer={toggleDrawer} setDrawerOpen={setDrawerOpen} isDrawerOpen={isDrawerOpen}/>
      <main className={styles.content}>
              <MainPage />
      </main>
      { isLoading ? ''
                  : <Playbar className={styles.playbar} /> }
    </div>
  ) 
}
