import { useLocation, Outlet } from "react-router-dom";
import { Header } from "@components/Header/Header";
export const MainLayout = () => {
  const location = useLocation();
  const showHeader = !["/", "/register"].includes(location.pathname);

  return (
    <div>
      {showHeader && <Header />}
      <main>
        <Outlet />
      </main>
    </div>
  );
};
