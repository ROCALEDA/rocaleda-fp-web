import React from "react";
import { Box, Card, CardContent, Grid, Skeleton } from "@mui/material";

export default function LoadingSkeleton() {
  return (
    <Card sx={{ minWidth: 400, width: "100%" }}>
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={4}>
            <Skeleton variant="text" width="80%" />
            <Skeleton variant="text" width="60%" />
          </Grid>
          <Grid item>
            <Skeleton variant="rectangular" width={10} height={60} />
          </Grid>
          <Grid item xs={3}>
            <Skeleton variant="text" width="50%" />
            <Skeleton variant="text" width="70%" />
          </Grid>
          <Grid item>
            <Skeleton variant="rectangular" width={10} height={60} />
          </Grid>
          <Grid item xs={3}>
            <Skeleton variant="rectangular" width="70%" height={24} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
