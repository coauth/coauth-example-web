import DashboardPageLayout from "../pages/dashboard/DashboardPageLayout";
import HomePage from "../pages/home/HomePage";
import {RouteType} from "./config";
import DefaultPage from "../pages/dashboard/DefaultPage";
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import {HomeOutlined, ViewModuleOutlined,} from "@mui/icons-material";
import UseCasePage from "../pages/usecase/UseCasePage.tsx";
import TOtpWebPage from "../pages/demo/totp/TOtpWebPage.tsx";

const appRoutes: RouteType[] = [
  {
    index: true,
    path: "/",
    element: <HomePage/>,
    state: "welcome",
    sidebarProps: {
      displayText: "Welcome",
      icon: <HomeOutlined/>
    }
  },
/*   {
    path: "/totp",
    element: <UseCasePage/>,
    state: "use-case",
    sidebarProps: {
      displayText: "Use Case",
      icon: <ViewModuleOutlined/>
    }
  }, */
  {
    path: "/demo",
    element: <DashboardPageLayout/>,
    state: "demo",
    sidebarProps: {
      displayText: "Demo",
      icon: <DashboardOutlinedIcon/>
    },
    child: [
      {
        index: true,
        path: "/demo",
        element: <TOtpWebPage/>,
        state: "demo.totp-web",
        sidebarProps: {
          displayText: "Time based OTP - Web"
        },
      }/* ,
      {
        path: "/demo/totp",
        element: <DefaultPage/>,
        state: "dashboard.totp",
        sidebarProps: {
          displayText: "Time Based OTP"
        },
      } */
    ]
  }
];

export default appRoutes;