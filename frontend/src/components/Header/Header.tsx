import React from "react";
import {  Link as RouterLink } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
} from "@mui/material";
import AuthStore from "@stores/AuthStore";
export const Header = () => {
  
  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar>
        {/* Лого/Название (слева) */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          MySocialApp
        </Typography>

        {/* Навигация (справа) */}
        <Box sx={{ display: "flex", gap: 2 }}> 
          {AuthStore.isAuthenticated ? (
            <>
              <Button color="inherit" href="/profile">
                Профиль
              </Button>
              <Button
                component={RouterLink}
                to="/"
                color="inherit"
                onClick={AuthStore.logout}
                
              >
                Выйти
              </Button>
            </>
          ) : (
            <>
              <Button component={RouterLink} to="/" color="inherit">
                Войти
              </Button>
              <Button component={RouterLink} to="/register" color="inherit">
                Регистрация
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
