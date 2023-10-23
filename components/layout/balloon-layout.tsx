import Image from "next/image";
import { ReactNode } from "react";
import { Grid } from "@mui/material";

import styles from "./balloon-layout.module.css";

interface BalloonLayoutProps {
  children: ReactNode;
  text?: string;
  textColor?: string;
}


export default function BalloonLayout({ children , text, textColor }: BalloonLayoutProps) {
  return (
    <div className={styles.container}>
      <Grid container spacing={2} padding={2} style={{ padding: '0' }}>
        <Grid item xs={12} md={6} display="flex" alignItems="flex-start" justifyContent="flex-start" className={styles.globo}>
          <Image
            src="/images/balloon.png"
            alt="Balloon"
            width={111}
            height={266}
          />
        </Grid>
        <Grid item xs={12} md={6} display="flex" alignItems="center" justifyContent="flex-end" className={styles.nubes}>
          
        </Grid>
      </Grid>
      {children}
    </div>
  );
}
