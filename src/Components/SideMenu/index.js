import {
  AppstoreOutlined,
   BankOutlined, TeamOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function SideMenu() {
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState("/");

  useEffect(() => {
    const pathName = location.pathname;
    setSelectedKeys(pathName);
  }, [location.pathname]);

  const navigate = useNavigate();
  return (
    <div className="SideMenu">
      <Menu
        className="SideMenuVertical"
        mode="vertical"
        onClick={(item) => {
          //item.key
          navigate(item.key);
        }}
        selectedKeys={[selectedKeys]}
        items={[
          {
            label: "Dashbaord",
            icon: <AppstoreOutlined />,
            key: "/",
          },
          {
            label: "Bureaux de votes",
            key: "/inventory",
            icon: <SolutionOutlined />,
          },
          {
            label: "Centre de vote",
            key: "/orders",
            icon: < BankOutlined/>,
          },
          {
            label: "Candidats",
            key: "/customers",
            icon: <TeamOutlined   />,
          },
        ]}
      ></Menu>
    </div>
  );
}
export default SideMenu;
