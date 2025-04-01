import React, { Suspense, Fragment, useContext } from "react";
import { Router, Switch, Route } from "react-router-dom";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import { routes } from "src/routes";
import { createBrowserHistory } from "history";
import UserAuthContext from "src/context/User";
import PageLoading from "src/component/PageLoading";
import AuthGuard from "src/component/AuthGuard";
import { ThemeProvider } from "@material-ui/core";
import { createTheme } from "src/theme";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SettingsContext from "src/context/SettingsContext";

const history = createBrowserHistory();
function App() {
  const themeSeeting = useContext(SettingsContext);
  const theme = createTheme({
    theme: themeSeeting.settings.theme,
  });

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <UserAuthContext>
            <ToastContainer />
            <Router history={history}>
              <RenderRoutes data={routes} />
            </Router>
          </UserAuthContext>
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;

function RenderRoutes(props) {
  return (
    <Suspense fallback={<PageLoading />}>
      <Switch>
        {props.data.map((route, i) => {
          const Component = route.component;
          const Guard = route.guard ? AuthGuard : Fragment;
          const Layout = route.layout || Fragment;
          return (
            <Route
              exact={route.exact}
              key={i}
              path={route.path}
              render={(props) => (
                <Guard>
                  <Layout>
                    {route.routes ? (
                      <RenderRoutes data={route.routes} />
                    ) : (
                      <Component {...props} />
                    )}
                  </Layout>
                </Guard>
              )}
            />
          );
        })}
      </Switch>
    </Suspense>
  );
}
