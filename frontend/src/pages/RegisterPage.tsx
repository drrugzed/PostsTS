import { observer } from "mobx-react-lite";
import { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import AuthStore from "@stores/AuthStore";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import type { IRegisterFormData } from "../types/auth";

export const RegisterPage = observer(() => {
  const navigate = useNavigate();
  const [RegisterformData, setRegisterFormData] = useState<IRegisterFormData>({
    username: "",
    email: "",
    password: "",
    password2: "",
  });
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const success = await AuthStore.register(RegisterformData);
    if (success) {
      navigate("/");
    } else {
      console.log("Ошибка регистрации");
    }
  };
  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 4 }}>
      <Typography variant="h5">Регистрация</Typography>
      {AuthStore.registerError && (
        <Typography color="error" gutterBottom>
          {JSON.stringify(AuthStore.registerError)}
        </Typography>
      )}
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          label="Логин"
          value={RegisterformData.username}
          onChange={(e) =>
            setRegisterFormData({
              ...RegisterformData,
              username: e.target.value,
            })
          }
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="Email"
          value={RegisterformData.username}
          onChange={(e) =>
            setRegisterFormData({ ...RegisterformData, email: e.target.value })
          }
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="password"
          value={RegisterformData.username}
          onChange={(e) =>
            setRegisterFormData({
              ...RegisterformData,
              password: e.target.value,
            })
          }
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="password"
          value={RegisterformData.username}
          onChange={(e) =>
            setRegisterFormData({
              ...RegisterformData,
              password2: e.target.value,
            })
          }
          required
        />
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Зарегистрироваться
        </Button>
      </form>
      <Typography sx={{ mt: 0.2 }}>
        <Button
          component={RouterLink}
          to="/"
          variant="text"
          fullWidth
          sx={{ mt: 1 }}
        >
          Уже есть аккаунт? Войти
        </Button>
      </Typography>
    </Box>
  );
});
