import { Outlet } from "react-router-dom";
import BottomNav from "./BottomNav";
import "../../styles/appLayout.css";

const AppLayout = () => {
  return (
    <div className="app-layout">
      <main className="app-main">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
};

export default AppLayout;