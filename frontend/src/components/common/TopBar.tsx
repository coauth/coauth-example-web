import {AppBar, Box, Button, CssBaseline, Toolbar, Typography} from "@mui/material";
import colorConfigs from "../../configs/colorConfigs";
import sizeConfigs from "../../configs/sizeConfigs";

const navItems = [{text: "Website", link: "https://www.coauth.dev"}
  , {text: "Documentation", link: "https://godwinpinto.gitbook.io/authable"}, {
    text: "Github", link: "https://github.com/godwinpinto/authable"
  }];

const openLink = (elementId: number) => {
  window.open(navItems[elementId].link, "blank");
};

const TopBar = () => {


  return (
      <Box sx={{display: 'flex'}}>
        <CssBaseline/>
        <AppBar
            position="fixed"
            sx={{
              width: `calc(100% - ${sizeConfigs.sidebar.width})`,
              ml: sizeConfigs.sidebar.width,
              backgroundColor: colorConfigs.topbar.bg,
              color: colorConfigs.topbar.color
            }}
            component="nav"
        >
          <Toolbar>
            <Typography
                variant="h6"
                component="div"
                sx={{flexGrow: 1, display: {xs: 'none', sm: 'block'}}}
            >
              CO-Auth Demo
            </Typography>
            <Box sx={{display: {xs: 'none', sm: 'block'}}}>
              {navItems.map((item, index: number) => (
                  <Button key={index} sx={{
                    color: '#0747A6', fontWeight: 'bold', "&:hover": colorConfigs.whiteButtonHover
                  }} onClick={() => openLink(index)}>
                    {item.text}
                  </Button>
              ))}
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
  );
};

export default TopBar;