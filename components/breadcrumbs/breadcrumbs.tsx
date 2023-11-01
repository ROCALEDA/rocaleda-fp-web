import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

interface RouteType {
  name: string;
  path: string;
}
interface BreadcrumbsProps {
  routes: RouteType[];
  paddingLeft?: string;
}

export default function CustomBreadcrumbs({ routes, paddingLeft }: BreadcrumbsProps) {
    return (

    <div role="presentation" style={{ paddingLeft: paddingLeft }}>
    <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
        {routes.map((route, index) => {
            if (index === routes.length - 1) {
                return (
                    <Typography key={index} color="text.primary">
                        {route.name}
                    </Typography>
                );
            }
            return (
                <Link key={index} underline="hover" color="inherit" href={route.path}>
                    {route.name}
                </Link>
            );
        })}
    </Breadcrumbs>
</div>
);
}