import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useContext} from 'react';
import { AudioContext } from '../../context/AudioContext';
import { Slide } from '@mui/material';

export function AppSnackbar() {

   const {openSnack,snack, handleSnackClose} = useContext(AudioContext)

   const action = (
   <>
      <IconButton
         size="small"
         aria-label="close"
         color="inherit"
         onClick={handleSnackClose}
      >
         <CloseIcon fontSize="small" />
      </IconButton>
   </>
   );

   return (
         <Snackbar
            open={openSnack}
            autoHideDuration={1000}
            onClose={handleSnackClose}
            message={snack}
            action={action}
            TransitionComponent={(props) => <Slide {...props} direction='right'/>}
         />
   );
}