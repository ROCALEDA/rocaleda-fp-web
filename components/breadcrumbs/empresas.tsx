"use client";
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.preventDefault();
    //console.info('You clicked a breadcrumb.');
}

export default function EnterpriseBreadcrumbs() {
    return (
    <div role="presentation" onClick={handleClick}>
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/>">Empresas </Link>
        {/*<Link underline="hover" color="inherit" href="/material-ui/getting-started/installation/">Core</Link>*/}
        <Typography color="text.primary">Proyectos</Typography>
      </Breadcrumbs>
    </div>
  );
}