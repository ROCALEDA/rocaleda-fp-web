import * as React from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "next/link";
import MUILink from "@mui/material/Link";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

interface RouteType {
  name: string;
  path: string;
}
interface BreadcrumbsProps {
  routes: RouteType[];
  paddingLeft?: string;
}

export default function CustomBreadcrumbs({
  routes,
  paddingLeft,
}: BreadcrumbsProps) {
  return (
    <div role="presentation" style={{ paddingLeft: paddingLeft }}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {routes.map((route, index) => {
          if (index === routes.length - 1) {
            return (
              <Typography key={index} color="text.primary">
                {route.name}
              </Typography>
            );
          }
          return (
            <Link key={index} href={route.path} passHref>
              <MUILink underline="hover" color="inherit">
                {route.name}
              </MUILink>
            </Link>
          );
        })}
      </Breadcrumbs>
    </div>
  );
}
