import { observer } from "mobx-react-lite";
import { Button, TextField, Box, Typography,Alert } from "@mui/material";
import AuthStore from "@stores/AuthStore";
import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import type { ILoginFormData } from "../types/auth";

export const LoginPage = observer(() => {
    const [loginFormData,setLoginFormData] = useState<ILoginFormData>({
        username:'',
        password:''
    })
    const navigate = useNavigate();
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        await AuthStore.login(loginFormData);
        if(AuthStore.isAuthenticated) return navigate("/posts")
    }
  return (
    <Box sx={{maxWidth:400,mx:'auto',mt:10}}>
        <Typography variant="h4">Авторизация</Typography>
        {AuthStore.loginError && (
            <Typography>
                {JSON.stringify(AuthStore.loginError)}
            </Typography>
        )}
        <form onSubmit={handleSubmit}>
            <TextField
          fullWidth
          margin="normal"
          label="Логин"
          value={loginFormData.username}
          onChange={(e) =>
            setLoginFormData({ ...loginFormData, username: e.target.value })
          }
        />
        
            <TextField
          fullWidth
          margin="normal"
          label="Пароль"
          type="password"
          value={loginFormData.password}
          onChange={(e) =>
            setLoginFormData({ ...loginFormData, password: e.target.value })
          }
        />
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
                  Войти
        </Button>
        
         <Button
          component={RouterLink}
          to="/register"
          variant="text"
          fullWidth
          sx={{ mt: 1 }}
        >
          Нет аккаунта? Зарегистрируйтесь
        </Button>
        {AuthStore.loginError && (
            <Alert severity="error" sx={{mt:2}}>
                {AuthStore.loginError}
            </Alert>
        )}
        </form>
    </Box>
  )
})

