import './ArticleCard.scss'

import React from 'react'
import { useNavigate } from 'react-router-dom'

import { Button, CardActions } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined'

export default function ArticleCard(props: any) {
  const navigate = useNavigate()

  const date = new Date(props.publishedAt)
  const dateFormatted = date.toDateString().split(' ').slice(1)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>, id: number) =>
    navigate(`/articles/${id}`)

  const getHighlightedText = (text: string, highlight: string) => {
    // Split on highlight term and include term into parts, ignore case
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'))
    return (
      <span>
        {parts.map((part: string, i: number) => (
          <span
            key={i}
            style={
              part.toLowerCase() === highlight.toLowerCase()
                ? { background: 'yellow' }
                : {}
            }
          >
            {part}
          </span>
        ))}
      </span>
    )
  }

  return (
    <Card
      className='article position-relative'
      sx={{ maxWidth: 400, height: 512 }}
    >
      <CardMedia
        component='img'
        height='217'
        image={props.imageUrl}
        alt={props.title}
      />
      <CardContent className='article-content user-select-none px-4'>
        <Typography className='article-content__date pt-2 pb-3 d-flex align-items-center'>
          <CalendarTodayOutlinedIcon fontSize='small' className='me-2' />
          {`${dateFormatted[0]} ${dateFormatted[1]}th, ${dateFormatted[2]}`}
        </Typography>
        <Typography
          className='article-content__title'
          variant='h5'
          marginBottom={2}
        >
          {getHighlightedText(props.title, props.highlight)}
        </Typography>
        <Typography className='article-content__summary' variant='body2'>
          {getHighlightedText(props.summary.substring(0, 100), props.highlight)}
          ...
        </Typography>
      </CardContent>
      <CardActions className='article-action position-absolute bottom-0 pb-3 ps-3'>
        <Button
          size='small'
          className='article-action__button fw-bold'
          onClick={e => handleClick(e, props.id)}
        >
          Read more
          <ArrowForwardIcon fontSize={'small'} className='ms-1' />
        </Button>
      </CardActions>
    </Card>
  )
}
