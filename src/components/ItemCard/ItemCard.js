import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import "./ItemCard.css";

const ItemCard = ({
  img,
  title,
  backgroundColor,
  price,
}) => {
  return (
    <Card className="ItemCard" sx={{background: backgroundColor }}>
      <CardActionArea>
        <CardMedia component="img" sx={{ height: 300 }} image={img} alt="Item" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <div>{price}$</div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
export default ItemCard;