import React, { useEffect } from "react";
import { Box } from "@material-ui/core";
import Page from "src/component/Page";
import Baner from "./Baner";
import Leading from "./Leading";
import Trading from "./Trading";
import Comming from "./Comming";
import Plan from "./Plan";
// import Subscriptions from "src/views/pages/Subscriptions/Index";
import Contact from "./Contact";

import { Link, useHistory, useLocation } from "react-router-dom";
import Scroll from "react-scroll";
function Home(props) {
  const location = useLocation();

  useEffect(() => {
    let searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has("id")) {
      let param = searchParams.get("id");
      const getdiv = document.getElementById(param);
      const ofsetTop = getdiv.offsetTop - 30;
      console.log(ofsetTop);
      var scroll = Scroll.animateScroll;
      scroll.scrollTo(ofsetTop, param);
    }
  }, [location.pathname]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <Page title="Arbitage-bot-Tushar">
      <Box>
        <div id="home">
          <Baner />
        </div>
        <div id="leading">
          <Leading />
        </div>
        <div id="trading">
          <Trading />
        </div>
        {/* <div id="plan">
          <Subscriptions />
        </div> */}
        <div id="comming">
          <Comming />
        </div>

        <div id="contact">
          <Contact />
        </div>
      </Box>
    </Page>
  );
}

export default Home;
