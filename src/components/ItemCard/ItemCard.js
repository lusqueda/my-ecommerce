import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import "./ItemCard.css";
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';

const ItemCard = ({
  img,
  title,
  backgroundColor,
  price,
}) => {
  return (
    <Card className="ItemCard" sx={{background: backgroundColor, marginBottom:"3vh", marginTop: "3vh"}}>
      <CardActionArea sx={{ width: 300 }}>
        <CardMedia component="img" image={img} alt="Item" />
          <ImageListItemBar
              title={title}
              subtitle={price}
              actionIcon={
                <IconButton
                  sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                  aria-label={`info about ${title}`}
                >
                  <InfoIcon />
                </IconButton>
              }
            />
      </CardActionArea>
    </Card>

  );
};
export default ItemCard;