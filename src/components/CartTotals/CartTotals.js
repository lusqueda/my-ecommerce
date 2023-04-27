import React from "react";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const CartTotals = ({items, amount}) => {

  return (
    <div>
      <Paper
      sx={{
        p: 2,
        margin: 'auto',
        maxWidth: 500,
        flexGrow: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography variant="body2" gutterBottom>
                TOTAL:  
              </Typography>
              <Typography variant="body2" color="text.secondary">
                CANTIDAD DE PRODUCTOS: {items}
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" component="div">
              $ {amount}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>

    </div>
  );
};

export default CartTotals;