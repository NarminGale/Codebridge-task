import React, { useEffect, useState } from 'react'

import {
  Divider,
  FormControl,
  InputAdornment,
  OutlinedInput,
} from '@mui/material'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import SearchIcon from '@mui/icons-material/Search'

import PostCard from '../../components/PostCard/PostCard'

interface Article {
  id: number
  imageUrl: string
  title: string
  summary: string
  higlight: string
  publishedAt: string
}

export default function HomePage() {
  const [articles, setArticles] = useState<[]>([])
  const [text, setText] = useState<string>('')

  useEffect(() => {
    fetch('https://api.spaceflightnewsapi.net/v3/articles')
      .then(response => response.json())
      .then(data => setArticles(data))
  }, [])

  return (
    <Container maxWidth='lg' className='homepage' sx={{ my: 6 }}>
      <header className='homepage-header'>Filter by keywords</header>
      <FormControl sx={{ my: 2, width: 600 }}>
        <OutlinedInput
          value={text}
          onChange={e => setText(e.target.value)}
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
        Results: {articles.length}
        <Divider />
        <Box sx={{ flexGrow: 1, marginY: '30px' }}>
          <Grid
            container
            spacing={{ xs: 2, md: 3, lg: 4 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {articles.map((article: Article, index) => (
              <Grid item xs={2} sm={4} md={4} key={index}>
                <PostCard
                  id={article.id}
                  imageUrl={article.imageUrl}
                  title={article.title}
                  summary={article.summary}
                  higlight={text}
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
