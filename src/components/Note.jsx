import React, { useState } from "react";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import { XIcon } from "@heroicons/react/outline";
import GitHubIcon from "../Assets/Images/github.svg";

export default function Note() {
  const [open, setOpen] = useState(true);

  return (
    <Box sx={{ width: "100%", position: "fixed", bottom: 0, left: 0 }}>
      <Collapse in={open}>
        <Alert
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <XIcon className="h-7" />
            </IconButton>
          }
          sx={{
            mb: 2,
            p: 2,
            padding: { xs: "none", md: "0 10rem", lg: "0 20rem" },
          }}
          className="p-0 lg:px-48"
        >
          <p className="md:text-md font-medium flex flex-col items-center">
            Note: This is Not a Official Website, This is only built for the
            Demonstration Purposes by
            <a
              className="font-bold md:text-xl text-blue-400 flex items-center mr-2"
              href="https://github.com/Anurag-Band"
              target={"_blank"}
              rel="noopener noreferrer"
            >
              <img
                className="h-7 w-7 object-contain mx-2"
                src={GitHubIcon}
                alt="GitHub"
              />
              Anurag Band
            </a>
            If you like it Please give a ⭐ on GitHub, Contact Me if you need
            any Help...💖
          </p>
        </Alert>
      </Collapse>
    </Box>
  );
}
