import React from "react";
import Button from '@mui/material/Button';
import GitHubIcon from '@mui/icons-material/GitHub';
import Box from '@mui/material/Box';
import "./About.css";


const About = () => {
  return (
    <div className="About">
      <h1>REPOSITORIO</h1>
      <Box component="span" sx={{ p: 5, border: '5px dashed grey' }}>
          <Button variant="contained" color="inherit" endIcon={<GitHubIcon color="primary"/>}>
            <a href="https://github.com/lusqueda/my-ecommerce" target="_blank" rel="noreferrer" >Github</a>
          </Button>
      </Box>
    </div>
  );
};

export default About;