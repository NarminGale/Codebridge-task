import { useEffect, useState } from 'react'

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

import { IArticleCard } from '../../common/types'
import Loader from '../../components/Loader/Loader'
import ArticleCard from '../../components/ArticleCard/ArticleCard'
import './HomePage.scss'

export default function HomePage() {
  const [articles, setArticles] = useState<[]>([])
  const [text, setText] = useState<string>('')
  const [filteredArticles, setFilteredArticles] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
      if (text === '') {
          // show all articles if text is empty (no search)
          setFilteredArticles(articles)
      }
      else {
          // Filter articles by title
          const filteredArticlesByTitle = articles.filter((article: IArticleCard) => {
              return article.title.toLowerCase().includes(text.toLowerCase())
          })

          // Filter articles by summary and remove duplicates
          const filteredArticlesBySummary = articles
              .filter((article: IArticleCard) => {
                  return !filteredArticlesByTitle
                      .map((article: IArticleCard) => article.id)
                      .includes(article.id)
              })
              .filter((article: IArticleCard) => {
                  return article.summary
                      .substring(0, 100)
                      .toLowerCase()
                      .includes(text.toLowerCase())
              })

          // Concatenate both filtered arrays
          const result = filteredArticlesByTitle.concat(
              filteredArticlesBySummary
          )

          // Set filtered articles
          setFilteredArticles(result)
      }
  }, [text])

  /* Get articles from api */
  useEffect(() => {
      fetch('https://api.spaceflightnewsapi.net/v3/articles?_limit=100')
        .then(response => response.json())
        .then(data => setArticles(data))
  }, [])

 /* Show all articles when open the page */
  useEffect(() => {
    if (articles.length > 0) {
      setFilteredArticles(articles)
      setLoading(false)
    }
  }, [articles])

  return (
    <Container maxWidth='lg' className='homepage' sx={{ my: 6 }}>
     {/* Card filter input starts */}
     <Box className='fw-semibold mb-2'>Filter by keywords</Box>
     <FormControl className='filter-input mb-5'>
      <OutlinedInput
       value={text}
       placeholder='Search'
       onChange={e => setText(e.target.value)}
       startAdornment={
        <InputAdornment position='start'>
         <SearchIcon className='fs-4' />
        </InputAdornment>
       }
      />
     </FormControl>
     {/* Card filter input ends */}

     {/* Loader starts */}
     <Loader isLoaded={loading}>
      <Box>
       <Box className='fw-semibold'>Results: {filteredArticles.length}</Box>
       <Divider />
       <Box className='my-5'>
        {/* Articles container starts */}
        <Grid container spacing={{ xs: 4, lg: 5 }}>
         {filteredArticles.map((article: IArticleCard, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
           <ArticleCard
            id={article.id}
            imageUrl={article.imageUrl}
            title={article.title}
            summary={article.summary}
            highlight={text}
            publishedAt={article.publishedAt}
           />
          </Grid>
         ))}
        </Grid>
        {/* Articles container ends */}
       </Box>
      </Box>
     </Loader>
     {/* Loader ends */}
    </Container>
  )
}
