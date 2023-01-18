import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

import { IArticlePage } from '../../common/types'
import './ArticlePage.scss'

export default function ArticlePage() {
  const [article, setArticle] = useState<IArticlePage>({
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
    <Container className='article mx-0 px-0 mw-100 vh-100'>
      {/* Background image starts */}
      <Box component='div' className='article-image w-100 top-0 position-fixed'>
        <Box
          component='img'
          className='w-100 h-100'
          src={article.imageUrl}
          alt={article.title}
        />
      </Box>
      {/* Background image ends */}

      {/* Article Container starts */}
      <Container className='article-container px-5 h-100 d-flex flex-column justify-content-center align-items-center'>
        <Box className='d-flex flex-column h-100 justify-content-around align-items-center'>
          {/* Article Cart starts */}
          <Card className='article-card user-select-none py-3 px-4'>
            <CardContent>
              {/* Article title */}
              <Typography
                variant='h5'
                className='article-card__title text-center mb-4'
              >
                {article.title}
              </Typography>

              {/* Article content */}
              <Typography variant='body2' className='article-card__content'>
                {article.summary}
              </Typography>
            </CardContent>
          </Card>
          {/* Article Cart ends */}

          {/* Article back button starts */}
          <Box
            component='div'
            className='fw-bold px-5 article-back-button align-self-start'
          >
            <Link
              to='/'
              className='d-flex align-items-center justify-content-start gap-1 text-decoration-none'
            >
              <ArrowBackIcon />
              Back to homepage
            </Link>
          </Box>
        </Box>
      </Container>
      {/* Article Container ends */}
    </Container>
  )
}
