import React from "react";
import Button from '@mui/material/Button';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Box from '@mui/material/Box';
import "./Contact.css";

const Contact = () => {
  return (
    <div className="Contact">
      <h1>CONTACT</h1>
      <Box component="span" sx={{ p: 5, border: '5px dashed grey' }}>
          <Button variant="contained" color="inherit" endIcon={<AccountBoxIcon color="primary"/>}>
            <a href="http://146.185.149.84/" target="_blank" rel="noreferrer" >Hugo Leonardo Usqueda</a>
          </Button>
      </Box>
    </div>
  );
};

export default Contact;