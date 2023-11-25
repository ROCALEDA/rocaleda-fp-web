import * as React from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "next/link";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

interface RouteType {
  name: string;
  path: string;
}
interface BreadcrumbsProps {
  routes: RouteType[];
  paddingLeft?: string;
  marginTop?: string;
}

export default function CustomBreadcrumbs({
  routes,
  paddingLeft,
  marginTop,
}: BreadcrumbsProps) {
  return (
    <div role="presentation" style={{ paddingLeft: paddingLeft, marginTop: marginTop, position: 'absolute'}}>
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
            <Link key={index} href={route.path}>
              {route.name}
            </Link>
          );
        })}
      </Breadcrumbs>
    </div>
  );
}
