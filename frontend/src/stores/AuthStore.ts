import { makeAutoObservable, runInAction } from "mobx";
import axios from "axios";
import instance from "../api/axios";
import { jwtDecode } from "jwt-decode";
import PostStore from "./PostStore";
import type {
  ILoginFormData,
  IRegisterFormData,
  IMyJwtPayLoad,
} from "../types/auth";

class AuthStore {
  registerError: string | null = null; // ошибка регистрация тип строка или нулл
  isAuthenticated: boolean | null = false; // флаг авторизации
  loginError: string | null = null; // ошибка логина
  isLoading: boolean = false; // флаг для отрисовки загрузки
  token: string | null = null; // токен строка или null
  userId: number | null = null; // id юзера

  constructor() {
    makeAutoObservable(this); // отслеживает все поля класса(реактивность)
    this.checkAuth(); // при перезагрузке проверяет есть ли токен и восстанавливает состояние входа
  }

  register = async (registerData: IRegisterFormData) => {
    // принимает данные с формы и использует интерфейс регистрации
    this.registerError = null; // сброс прошлой ошибки если она была
    this.isLoading = true;
    try {
      await instance.post("auth/register/", registerData); // передаем данные с формы
      console.log("Пользователь зарегистрирован");
      return true; // true если пользователь зареган
    } catch (error) {
      // ловим ошибку
      if (axios.isAxiosError(error)) {
        // проверяем ошибка ли это запроса
        this.registerError = error.response?.data || "Неизвестная ошибка"; // если да записываем ее
        return false; // возвращаем false
      } else {
        this.registerError = "Ошибка сервера или сети"; // в ином случае что-то с серваком
      }
      return false; // возвращаем false(так как регистрация не прошла )
    }
  };

  login = async (loginFormData: ILoginFormData) => {
    // принимает данные с формы
    this.isLoading = true;
    try {
      const res = await instance.post("/token/", loginFormData); // отправляем данные
      const decoded = jwtDecode<IMyJwtPayLoad>(res.data.access); // декодируем и типизируем
      runInAction(() => {
        this.userId = decoded.user_id; // записываем id user
        this.isAuthenticated = true; // флаг авториза - true
        localStorage.setItem("token", res.data.access); // кладем токен ЛС
        localStorage.setItem("refreshToken", res.data.refresh); // кладем рефреш токен
      });
      PostStore.loadPosts(); // загружаем посты
    } catch (error) {
      // ловим ошибку
      if (axios.isAxiosError(error)) {
        this.loginError =
          error.response?.data.detail || "Неверный логин иили пароль";
        console.error("Login error", error.response?.data);
        throw error;
      }
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  };
  logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    runInAction(() => {
      this.isAuthenticated = false;
      this.userId = null;
    });
  };
  checkAuth = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode<IMyJwtPayLoad>(token);
      this.userId = decoded.user_id;
      this.isAuthenticated = true;
    } else {
      this.isAuthenticated = false;
    }
  };

  async refreshToken() {
    const refresh = localStorage.getItem("refreshToken");
    if (!refresh) return this.logout();
    try {
      const res = await instance.post("/token/refresh/", { refresh });
      runInAction(() => {
        localStorage.setItem("token", res.data.access);
        this.isAuthenticated = true;
      });
      return res.data.access;
    } catch (err) {
      this.logout();
      throw err;
    }
  }
}
export default new AuthStore();
