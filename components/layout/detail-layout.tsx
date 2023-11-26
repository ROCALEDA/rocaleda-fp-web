import { Box, Container, Grid } from "@mui/material";
import { ReactNode } from "react";
import Image from "next/image";

interface LayoutProps {
  children: ReactNode;
}

export default function DetailLayout({ children }: LayoutProps) {
  return (
    <Box sx={{ position: "relative" }}>
      <Container
        maxWidth="lg"
        sx={{
          position: "absolute",
          height: "100%",
          left: 0,
          right: 0,
          margin: "0 auto",
          zIndex: -1,
        }}
      >
        <Grid container sx={{ height: "100%" }} spacing={4}>
          <Grid item xs={12} md={7}>
            <Box
              component="img"
              src="/images/balloon.png" // Replace with your image path
              sx={{
                position: "fixed",
                left: -100,
                top: "20%",
                zIndex: -1,
              }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={5}
            zIndex={-1}
            sx={{ display: { xs: "none", md: "flex" }, position: "relative" }}
          >
            <Image
              src="/images/cloud4.png"
              layout="fill"
              objectFit="cover"
              alt="Cloud Background Image"
            />
          </Grid>
        </Grid>
      </Container>
      {children}
    </Box>
  );
}
