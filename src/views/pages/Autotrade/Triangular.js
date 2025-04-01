import React, { useState } from "react";
import { Box, makeStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Simple from "./Simple";
const useStyles = makeStyles((theme) => ({}));

export default function Triangular() {
  const history = useHistory();
  return (
    <Box>
      <Simple />
    </Box>
  );
}
