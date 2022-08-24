import React, { useEffect } from "react";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import { useDispatch } from "react-redux";

import "assets/css/style.css";

import GuestRoute from "components/Routes/GuestRoute";

import NotFound from "pages/404";

//frontpage
import Frontpage from "pages/Frontpage";
//syarat ketentuan
// eslint-disable-next-line
import Syaratketentuan from "pages/Syaratketentuan";

//pendaftaran
// import PendaftaranBaru from "pages/PendaftaranBaru";
import PendaftaranLama from "pages/PendaftaranLama";
import PendaftaranLamaBpjs from "pages/PendaftaranLamaBpjs";
import CariAntrean from "pages/CariAntrean";

import { setAuthorizationHeader } from "configs/axios";

import users from "constants/api/users";

import { populateProfile } from "store/actions/users";

function App() {
  const dispatch = useDispatch();
  const history = createBrowserHistory({ basename: process.env.PUBLIC_URL });

  useEffect(() => {
    let session = null;
    if (localStorage.getItem("SIDEPRESI:token")) {
      session = JSON.parse(localStorage.getItem("SIDEPRESI:token"));
      setAuthorizationHeader(session.token);

      users.details().then((details) => {
        dispatch(populateProfile(details.data));
      });
    }
  }, [dispatch]);
  return (
    <>
      <Router history={history}>
        <Switch>
          <GuestRoute path="/home" component={Frontpage}></GuestRoute>
          {/* <GuestRoute
            path="/syaratketentuan"
            component={Syaratketentuan}
          ></GuestRoute> */}
          {/* <GuestRoute
            path="/pendaftaranbaru"
            component={PendaftaranBaru}
          ></GuestRoute> */}
          <GuestRoute path="/cariantrean" component={CariAntrean}></GuestRoute>
          <GuestRoute
            path="/pendaftaranlamabpjs"
            component={PendaftaranLamaBpjs}
          ></GuestRoute>
          <GuestRoute
            path="/pendaftaranlama"
            component={PendaftaranLama}
          ></GuestRoute>

          <Route path="*" component={NotFound}></Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
