import { Box, Container, Grid, Stack } from "@mui/material";
import { ReactNode } from "react";
import Image from "next/image";

interface LayoutProps {
  children: ReactNode;
}

export default function DetailLayout({ children }: LayoutProps) {
  return (
    <Stack sx={{ position: "relative" }}>
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
        <Grid container sx={{ height: "100%" }} spacing={2}>
          <Grid item xs={12} md={7}>
            <Box
              component="img"
              alt="Ballon background"
              src="/images/balloon.png"
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
    </Stack>
  );
}
