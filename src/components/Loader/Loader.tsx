import { Box, CircularProgress } from '@mui/material'

import {LoaderProps} from '../../common/types'

export default function Loader({isLoaded, children}: LoaderProps) {
 return (
  <>
   {isLoaded ? (
    <Box
     className= 'loader-container'
    >
     <CircularProgress
      size={40}
      thickness={4}
      color='inherit'
     />
    </Box>
   ) : (
    children
   )}
  </>
 )
}
