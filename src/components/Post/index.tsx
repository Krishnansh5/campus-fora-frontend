import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Card,
  CardActions,
  Chip,
  Divider,
  Tooltip,
  Typography,
  useTheme,
  Link
} from '@mui/material';
import { formatDistance, subDays } from 'date-fns';
import TodayTwoToneIcon from '@mui/icons-material/TodayTwoTone';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import React from 'react';
function Post() {
  const [liked, setLiked] = React.useState(false);
  const theme = useTheme();
  const handleClick = () => {};
  const handleLikeClick = () => {
    setLiked(!liked);
  };

  return (
    <Card
      variant="outlined"
      sx={{
        p: 3,
        background: `${theme.colors.alpha.black[5]}`,
            }}
    >
      <Typography variant="h2">First Post of campus fora</Typography>
      <CardActions
        sx={{
                  display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
                  pt: 2,
                }}
      >
        <AvatarGroup>
          <Tooltip arrow title={'Krishnansh'}>
            <Avatar
              sx={{
                width: 40,
                height: 40,
                            }}
              component={Link}
              href="#"
              alt="Remy Sharp"
              src="/static/images/avatars/3.jpg"
            />
          </Tooltip>
          <Typography
            display="flex"
            alignItems="center"
            variant="subtitle2"
            sx={{ pl: 1.5 }}
          >
            Krishnansh Agarwal
          </Typography>
        </AvatarGroup>
        <Typography display="flex" alignItems="center" variant="subtitle2">
          <TodayTwoToneIcon
            sx={{
              mr: 1,
                        }} />
          />
          {formatDistance(subDays(new Date(), 24), new Date(), {
            addSuffix: true,
                    })}
        </Typography>
      </CardActions>
      <Box
        sx={{
          pt: 1,
                }}
      >
        <Chip
          sx={{
                      mr: 0.5,
                    }}
          size="small"
          label="Website"
          color="secondary"
          onClick={handleClick}
        />
        <Chip
          sx={{
            mr: 0.5,
                    }}
          size="small"
          label="Integrations"
          color="secondary"
          onClick={handleClick}
        />
      </Box>
      <Divider
        sx={{
          my: 2,
                }} />
      <Typography
        sx={{
          py: 2,
                  pl: 1,
                }}
        color="text.secondary"
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima ducimus
        doloremque rerum. Praesentium architecto magni iusto, blanditiis facere
        explicabo neque omnis reprehenderit consectetur repudiandae odio
        mollitia recusandae rerum esse voluptatem sunt debitis corrupti quidem
        inventore laudantium provident? Necessitatibus, libero beatae laboriosam
        porro autem earum soluta delectus reiciendis vel, doloremque, dicta
        fugit praesentium veniam ea facilis. Repudiandae, rerum neque. Sapiente,
        quidem molestiae. Sunt tempora voluptas recusandae nisi blanditiis illo
        expedita reprehenderit consequatur. Enim expedita molestiae corrupti
        similique maiores doloremque mollitia reiciendis ipsum temporibus
        possimus quae doloribus eius minima quisquam cupiditate ab in, aliquam
        labore! Pariatur nesciunt accusamus dolorum atque! Deserunt repellat
        quibusdam libero! Veritatis vero maxime cumque, eaque cupiditate quidem
        totam placeat dignissimos sint numquam! Obcaecati non necessitatibus aut
        dicta illum voluptas. Minus iure, molestiae velit id sint voluptatibus a
        sunt nobis hic, iusto nam sequi culpa mollitia! Omnis explicabo
        recusandae illum quos perferendis ex debitis accusamus voluptatem
        obcaecati quas, ipsam minima harum sint quam. Placeat quam illum facere.
        Quia blanditiis earum eos, quaerat doloribus ex error voluptate numquam
        fugiat modi tempore fuga, a eaque ipsam, quibusdam est sint officia
        maiores quis corrupti recusandae quasi alias vel pariatur. Blanditiis
        repellat velit nisi animi eligendi asperiores dignissimos libero, sint
        omnis mollitia quam.
      </Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          pl: 1,
          py: 2,
                }}
      >
        {liked && (
          <Button size="small" variant="contained" onClick={handleLikeClick}>
            <FavoriteIcon />
            <Typography
              sx={{
                              ml: 1,
                            }}
              variant="button"
            >
              Liked
            </Typography>
          </Button>
        )}
        {!liked && (
          <Button size="small" variant="outlined" onClick={handleLikeClick}>
            <FavoriteBorderOutlinedIcon />
            <Typography
              sx={{
                ml: 1,
                            }}
              variant="button"
            >
              4 Likes
            </Typography>
          </Button>
        )}
        <Button size="small" variant="outlined" sx={{ mr: 0 }}>
          Report
        </Button>
      </Box>
    </Card>
  );
}

export default Post;
