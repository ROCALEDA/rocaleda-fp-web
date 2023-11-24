"use client";
import Link from "next/link";

import {
  Box,
  Menu,
  AppBar,
  Button,
  Toolbar,
  MenuItem,
  Container,
  IconButton,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";

import MenuIcon from "@mui/icons-material/Menu";
import LanguageSelector from "../language-selector.tsx/language-selector";
import { LogoutOutlined } from "@mui/icons-material";
import { useTranslations } from "next-intl";

export default function Navbar() {
  const { data: session } = useSession();
  const lang = useTranslations("Home");

  const pages = [
    { roles: [1, 2], name: lang("projects.title"), link: "/projects" },
    { roles: [1, 2], name: lang("candidates.title"), link: "/candidates" },
    { roles: [3], name: lang("interviews.title"), link: "/interviews" },
  ];

  const user = session?.user;

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  function getRoleLogo(role_id?: number) {
    const roleLogos: any = {
      1: "/images/logo_admin.jpeg",
      2: "/images/logo_empresas.jpeg",
      3: "/images/logo_candidatos.jpeg",
      default: "/images/logo.png",
    };
    return roleLogos[role_id ?? "default"];
  }

  var roleLogo = getRoleLogo(user?.role_id);

  async function handleLogout() {
    await signOut({ redirect: true, callbackUrl: "/login" });
  }

  return (
    <AppBar
      position="static"
      color="transparent"
      sx={{ backgroundColor: "white", boxShadow: 0 }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}>
            <Image
              src={roleLogo}
              alt="Quire logo desktop"
              width={250}
              height={70}
              style={{ objectFit: "contain" }}
            />
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => {
                return session?.user?.role_id &&
                  page.roles.includes(session.user.role_id) ? (
                  <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center" color="black">
                      {page.name}
                    </Typography>
                  </MenuItem>
                ) : null;
              })}
            </Menu>
          </Box>
          <Box
            sx={{ display: { xs: "flex", md: "none" }, mr: 1, width: "100%" }}
          >
            <Image
              src={roleLogo}
              alt="Quire logo mobile"
              width={250}
              height={70}
              style={{ objectFit: "contain" }}
            />
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => {
              return session?.user?.role_id &&
                page.roles.includes(session.user.role_id) ? (
                <Link key={page.name} href={page.link}>
                  <Button
                    key={page.name}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, display: "block" }}
                  >
                    {page.name}
                  </Button>
                </Link>
              ) : null;
            })}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <LanguageSelector />
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Button
              variant="text"
              color="primary"
              startIcon={<LogoutOutlined />}
              onClick={handleLogout}
            />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
