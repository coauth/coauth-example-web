import {Drawer, List, Paper, Stack, Toolbar} from "@mui/material";
import assets from "../../assets";
import colorConfigs from "../../configs/colorConfigs";
import sizeConfigs from "../../configs/sizeConfigs";
import appRoutes from "../../routes/appRoutes";
import SidebarItem from "./SidebarItem";
import SidebarItemCollapse from "./SidebarItemCollapse";
import Footer from "./Footer.tsx";
import {styled} from '@mui/material/styles';

const Item = styled(Paper)(({theme}) => ({
  backgroundColor: 'transparent',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Sidebar = () => {
  return (
      <Drawer
          variant="permanent"
          sx={{
            width: sizeConfigs.sidebar.width,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: sizeConfigs.sidebar.width,
              boxSizing: "border-box",
              borderRight: "0px",
              backgroundColor: colorConfigs.sidebar.bg,
              color: colorConfigs.sidebar.color
            }
          }}
      >
        <List disablePadding>
          <Toolbar sx={{marginBottom: "20px"}}>
            <Stack
                sx={{width: "100%"}}
                direction="row"
                justifyContent="center"
            ><Item elevation={0}>
              <img src={assets.images.logo} alt={'CO-Auth Logo'}
                   style={{maxWidth: "60%"}} align={"left"}/>
            </Item>
            </Stack>
          </Toolbar>
          {appRoutes.map((route, index) => (
              route.sidebarProps ? (
                  route.child ? (
                      <SidebarItemCollapse item={route} key={index}/>
                  ) : (
                      <SidebarItem item={route} key={index}/>
                  )
              ) : null
          ))}
        </List>
        {/*
        <AppBar position="fixed" color="primary" sx={{top: 'auto', bottom: 0}}>
          <Toolbar>
            <IconButton color="inherit" aria-label="open drawer">
              <MenuIcon/>
            </IconButton>
            <StyledFab color="secondary" aria-label="add">
              <AddIcon/>
            </StyledFab>
            <Box sx={{flexGrow: 1}}/>
            <IconButton color="inherit">
              <SearchIcon/>
            </IconButton>
            <IconButton color="inherit">
              <MoreIcon/>
            </IconButton>
          </Toolbar>
        </AppBar>
*/}
        <Footer/>

      </Drawer>
  );
};

export default Sidebar;