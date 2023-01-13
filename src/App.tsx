import './App.css'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import PostCard from './components/PostCard/PostCard'
import { useEffect, useState } from 'react'
import {
  Divider,
  FormControl,
  InputAdornment,
  OutlinedInput,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

interface Article {
  imageUrl: string
  title: string
  summary: string
  publishedAt: string
}

export default function App() {
  const [currentTutorial, setCurrentTutorial] = useState([])

  useEffect(() => {
    fetch('https://api.spaceflightnewsapi.net/v3/articles')
      .then(response => response.json())
      .then(data => setCurrentTutorial(data))
  }, [])

  return (
    <Container maxWidth='lg' className='homepage' sx={{ my: 6 }}>
      <header className='homepage-header'>Filter by keywords</header>
      <FormControl sx={{ my: 2, width: 600 }}>
        <OutlinedInput
          sx={{ height: '40px', fontSize: '16px' }}
          placeholder='The most successful IT companies in 2020'
          startAdornment={
            <InputAdornment position='start'>
              <SearchIcon sx={{ fontSize: '20px' }} />
            </InputAdornment>
          }
        />
      </FormControl>
      <main className='homepage-content'>
        Results: {currentTutorial.length}
        <Divider />
        <Box sx={{ flexGrow: 1, marginY: '30px' }}>
          <Grid
            container
            spacing={{ xs: 2, md: 3, lg: 4 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {currentTutorial.map((article: Article, index) => (
              <Grid item xs={2} sm={4} md={4} key={index}>
                <PostCard
                  imageUrl={article.imageUrl}
                  title={article.title}
                  summary={article.summary}
                  publishedAt={article.publishedAt}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </main>
    </Container>
  )
}
