import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

import { CardActionArea } from '@mui/material'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

export default function ArticlePage() {
  const [article, setArticle] = useState<{
    title: string
    summary: string
    imageUrl: string
  }>({
    title: '',
    summary: '',
    imageUrl: '',
  })

  const params = useParams()

  const articleID = params.id

  useEffect(() => {
    fetch(`https://api.spaceflightnewsapi.net/v3/articles/${articleID}`)
      .then(response => response.json())
      .then(data => setArticle(data))
  }, [])

  return (
    <Container
      fixed
      maxWidth='lg'
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        component='img'
        sx={{
          height: 245,
          width: '100%',
          objectFit: 'cover',
          position: 'absolute',
          left: 0,
          top: 0,
          zIndex: -1,
        }}
        alt='The house from the offer.'
        src={article.imageUrl}
      />

      <Card sx={{ minHeight: 600, paddingY: '20px', paddingX: '30px' }}>
        <CardActionArea>
          <CardContent>
            <Typography
              className='article-title'
              variant='h5'
              marginBottom={5}
              sx={{ color: '#363636', textAlign: 'center' }}
            >
              {article.title}
            </Typography>
            <Typography
              className='article-content'
              variant='body2'
              sx={{ fontSize: '18px' }}
            >
              {article.summary}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>

      <Box
        component='div'
        sx={{
          alignSelf: 'start',
          marginTop: '35px',
          width: '178px',
          fontWeight: 'bold',
          paddingX: '30px',
        }}
      >
        <Link
          to='/'
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            textDecoration: 'none',
            color: '#000',
          }}
        >
          <ArrowBackIcon />
          Back to homepage
        </Link>
      </Box>
    </Container>
  )
}
