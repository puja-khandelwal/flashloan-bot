import React, { useState, useEffect } from "react";
import {
  makeStyles,
  Box,
  Grid,
  Typography,
  Button,
  FormControl,
  TextField,
  FormHelperText,
  Paper,
} from "@material-ui/core";
import ButtonCircularProgress from "./ButtonCircularProgress";
const useStyles = makeStyles((theme) => ({
  root: {
    // backgroundColor: "#0F212E",
    padding: "15px",
  },
}));

function SearchField(props) {
  const classes = useStyles();
  const { handleCloseSearch } = props;
  const [isUpdating, setIsUpdating] = useState(false);
  return (
    <>
      <Paper className={classes.root}>
        <Typography variant="h6" style={{paddingBottom:"10px"}}>Search</Typography>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <FormControl fullWidth>
              <TextField
                variant="outlined"
                name="firstName"
                size="small"
                fullWidth="true"
                placeholder="Enter to search..."
                // value={values.firstName}
                // error={Boolean(touched.firstName && errors.firstName)}
                // onBlur={handleBlur}
                // onChange={handleChange}
              />
              <FormHelperText error>
                {/* {touched.firstName && errors.firstName} */}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <Box>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={isUpdating}
                onClick={handleCloseSearch}
              >
                Search
                {isUpdating && <ButtonCircularProgress />}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}

export default SearchField;
