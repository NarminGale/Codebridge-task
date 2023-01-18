import { Box, CircularProgress } from '@mui/material'

import { ILoaderProps } from '../../common/types'

export default function Loader({isLoaded, children}: ILoaderProps) {
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
