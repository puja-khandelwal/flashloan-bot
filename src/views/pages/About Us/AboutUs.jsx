import { Box, Container, Typography, makeStyles, Grid, Avatar } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  mainBox: {
    padding: "100px 0",
    color: "#0c0d31",
  },
  heading: {
    fontWeight: 700,
    marginBottom: theme.spacing(3),
    color: "black"
  },
  section: {
    marginBottom: theme.spacing(4),
  },
  teamSection: {
    textAlign: "center",
    marginTop: theme.spacing(5),
  },
  teamMember: {
    marginBottom: theme.spacing(2),
  },
  avatar: {
    width: theme.spacing(14),
    height: theme.spacing(14),
    margin: "0 auto",
  },
  name: {
    fontWeight: 600,
    marginTop: theme.spacing(1),
  },
  role: {
    color: "#555",
  },
}));

const AboutUs = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="md" className={classes.mainBox}>
      <Typography variant="h2" className={classes.heading}>About us</Typography>

      <Box className={classes.section}>
        <Typography variant="h5" style={{color: "black"}}>Who We Are</Typography>
        <Typography variant="body1">
          UniProc Solutions, S.L. is a technology-driven company based in Seville, Spain, specializing in smart procurement and process automation. 
          We help organizations harness the power of artificial intelligence and blockchain to transform the way they make decisions, operate, and grow. 
          Our vision is global, but our solutions are tailored to the unique needs of each client.
        </Typography>
      </Box>

      <Box className={classes.section}>
        <Typography variant="h5" style={{color: "black"}}>Our Mission</Typography>
        <Typography variant="body1">
          Our mission is to empower businesses, institutions, and entrepreneurs to streamline their operations, increase transparency, and unlock 
          new levels of efficiency through intelligent automation. Whether it’s in finance, purchasing, education, or decentralized systems, we 
          build tools that turn innovation into action.
        </Typography>
      </Box>

      <Box className={classes.section}>
        <Typography variant="h5" style={{color: "black"}}>What We Offer</Typography>
        <ul>
          <li>AI-powered trading bots and dashboards</li>
          <li>Flash loan arbitrage systems</li>
          <li>Training and onboarding via UniProc Academy</li>
          <li>End-to-end development and consulting through trusted partners like Web3inventiv</li>
        </ul>
      </Box>

      <Box className={classes.section}>
        <Typography variant="body1">
          UniProc Solutions is the engine behind UniProc AI, UniProc Academy, and soon UniProc Pulse — building the future of intelligent systems, one solution at a time.
        </Typography>
      </Box>

      <Box className={classes.section}>
        <Typography variant="h5" style={{color: "black"}}>Meet the Team – The Visionaries Behind Web3inventiv</Typography>
        <Typography variant="body1">
          At Web3inventiv, we are more than just developers – we are innovators, problem-solvers, and blockchain pioneers. Our team brings together AI specialists, 
          DeFi architects, and security experts to build cutting-edge, scalable, and secure solutions for the decentralized world.
        </Typography>
      </Box>

      <Box className={classes.teamSection}>
        <Grid container spacing={4} justifyContent="center">
          {[
            { name: "Shubham K.", role: "Blockchain Expert", image: "images/shubham.k.jpg" },
            { name: "Adersh T.", role: "Project Manager", image: "images/adersh.t.jpg" },
            { name: "Puja K.", role: "Lead UI/UX Dev.", image: "images/puja.k.jpg" },
          ].map((member, idx) => (
            <Grid item xs={12} sm={4} key={idx} className={classes.teamMember}>
              <Avatar src={member.image} alt={member.name} className={classes.avatar} />
              <Typography className={classes.name}>{member.name}</Typography>
              <Typography className={classes.role}>{member.role}</Typography>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box mt={5}>
        <Typography variant="body1">
          With a deep passion for blockchain automation, AI-driven trading, and DeFi infrastructure, we specialize in Flash Loan Arbitrage Bots, Smart Contract Development, 
          AI-Integrated Trading Algorithms, and Web3 Security Solutions.
        </Typography>
        <Typography variant="body1" mt={2}>
          We believe in trust, transparency, and technology as the pillars of our success, ensuring our clients receive industry-leading solutions that redefine decentralized finance.
        </Typography>
      </Box>
    </Container>
  );
};

export default AboutUs;
