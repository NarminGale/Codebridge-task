import './PostCard.scss'

import React from 'react'
import { useNavigate } from 'react-router-dom'

import { Button, CardActionArea, CardActions } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined'

export default function PostCard(props: any) {
  const navigate = useNavigate()

  const date = new Date(props.publishedAt)
  const dateFormatted = date.toDateString().split(' ').slice(1)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>, id: number) => navigate(`/articles/${id}`)

  return (
    <Card sx={{ maxWidth: 400, height: 512, position: 'relative' }}>
      <CardActionArea>
        <CardMedia
          component='img'
          height='217'
          image={props.imageUrl}
          alt='green iguana'
        />
        <CardContent sx={{ paddingTop: '10px' }}>
          <Typography
            sx={{
              py: 2,
              fontSize: '14px',
              color: '#afafaf',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <CalendarTodayOutlinedIcon fontSize='small' sx={{ pr: 1 }} />
            {`${dateFormatted[0]} ${dateFormatted[1]}th, ${dateFormatted[2]}`}
          </Typography>
          <Typography
            className='article-title'
            variant='h5'
            marginBottom={2}
            sx={{ color: '#363636' }}
          >
            {props.title}
          </Typography>
          <Typography
            className='article-content'
            variant='body2'
            sx={{ color: '#5b5b5b' }}
          >
            {props.summary.substring(0, 100)}...
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions
        sx={{
          position: 'absolute',
          bottom: 0,
          paddingBottom: '20px',
          color: '#363636',
        }}
      >
        <Button
          size='small'
          sx={{ textTransform: 'none', color: '#363636', fontWeight: '900' }}
          onClick={e => handleClick(e, props.id)}
        >
          Read more
          <ArrowForwardIcon fontSize={'small'} />
        </Button>
      </CardActions>
    </Card>
  )
}
