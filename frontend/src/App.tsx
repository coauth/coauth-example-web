import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import {routes} from "./routes";
import {Provider} from 'jotai';
import {createTheme, ThemeProvider} from "@mui/material";


const theme = createTheme({
  typography: {
    // In Chinese and Japanese the characters are usually larger,
    // so a smaller fontsize may be appropriate.
    fontFamily: "Open Sans"
  },
});

function App() {
  return (
      <Provider>
        <ThemeProvider theme={theme}>

          <BrowserRouter>
            <Routes>
              <Route path="/" element={<MainLayout/>}>
                {routes}
              </Route>
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
  );
}

export default App;
