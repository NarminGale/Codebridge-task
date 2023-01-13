import './PostCard.scss'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { Button, CardActionArea, CardActions } from '@mui/material'
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined'

export default function PostCard(props: any) {
  const date = new Date(props.publishedAt)
  const dateFormatted = date.toDateString().split(' ').slice(1)

  return (
    <Card sx={{ maxWidth: 400, height: 530 }}>
      <CardActionArea>
        <CardMedia
          component='img'
          height='217'
          image={props.imageUrl}
          alt='green iguana'
        />
        <CardContent>
          <Typography>
            <CalendarTodayOutlinedIcon fontSize={'small'} />
            {`${dateFormatted[0]} ${dateFormatted[1]}th, ${dateFormatted[2]}`}
          </Typography>
          <Typography
            className='article-title'
            gutterBottom
            variant='h5'
            component='div'
          >
            {props.title}
          </Typography>
          <Typography
            className='article-content'
            variant='body2'
            color='text.secondary'
          >
            {props.summary}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size='small' color='primary'>
          read more ...
        </Button>
      </CardActions>
    </Card>
  )
}
