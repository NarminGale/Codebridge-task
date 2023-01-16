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

import ArticleCard from '../../components/ArticleCard/ArticleCard'

import './HomePage.scss'

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
      <Box className='fw-semibold mb-2'>Filter by keywords</Box>
      <FormControl className='filter-input mb-5'>
        <OutlinedInput
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder='Search'
          startAdornment={
            <InputAdornment position='start'>
              <SearchIcon sx={{ fontSize: '20px' }} />
            </InputAdornment>
          }
        />
      </FormControl>
      <main className='homepage-content'>
        <Box className='fw-semibold'>Results: {articles.length}</Box>
        <Divider />
        <Box className='my-5'>
          <Grid container spacing={{ xs: 4, lg: 5 }}>
            {articles.map((article: Article, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <ArticleCard
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
