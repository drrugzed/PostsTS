import type { JwtPayload } from "jwt-decode";
export interface IRegisterFormData extends ILoginFormData {
  password: string;
  password2: string;
  email: string;
}
export interface ILoginFormData {
  username: string;
  password: string;
}
export interface IMyJwtPayLoad extends JwtPayload {
  user_id: number
}