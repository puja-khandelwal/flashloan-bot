import React from "react";
import {
  Typography,
  Dialog,
  DialogContent,
  Button,
  Box,
  IconButton,
} from "@material-ui/core";
import { AiOutlineClose } from "react-icons/ai";

export default function ConfirmationModal({
  title,
  desc,
  isLoading,
  open,
  handleClose,
  handleSubmit,
}) {
  return (
    <Dialog
      open={open}
      onClose={() => {
        if (!isLoading) {
          handleClose();
        }
      }}
      fullWidth
      maxWidth="xs"
    >
      <Box style={{ position: "absolute", top: "0px", right: "0px" }}>
        <IconButton onClick={handleClose}>
          <AiOutlineClose color="rgba(0, 0, 0, 0.3)" />
        </IconButton>
      </Box>

      <Box align="center">
        <img
          src="/images/logout.png"
          alt="logoImage"
          width="50px"
          height="50px"
        />
      </Box>
      <Box align="center" my={1}>
        <Typography variant="h3" style={{ color: "rgba(61, 61, 61, 1)" }}>
          {title}
        </Typography>
      </Box>
      <Box align="center">
        <Typography variant="h6" style={{ color: "rgba(61, 61, 61, 1)" }}>
          {desc}
        </Typography>
      </Box>

      <Box my={2} align="center" className="displayCenter">
        <Button
          disabled={isLoading}
          variant="outlined"
          color="primary"
          fullWidth
          onClick={() => {
            if (!isLoading) {
              handleClose();
            }
          }}
          style={{
            marginRight: "8px",
            color: "#14133b",
            border: "1px solid rgba(65, 22, 67, 1)",
          }}
        >
          No
        </Button>
        <Button
          disabled={isLoading}
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => {
            handleSubmit();
          }}
          style={{ marginleft: "8px" }}
        >
          Yes
        </Button>
      </Box>
    </Dialog>
  );
}
