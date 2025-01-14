import { Avatar, Rate, Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { getInventory, getOrders } from "../../API";

function Orders() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    setLoading(true);
    getOrders().then((res) => {
      setDataSource(res.products);
      setLoading(false);
    });
  }, []);

  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={4}>Centres de votes</Typography.Title>
      <Table
        loading={loading}
        columns={[
          // {
          //   title: "Id_centre",
          //   dataIndex: "id_centre",
          // },
          {
            title: "Nom",
            dataIndex: "title",
          },
          {
            title: "Region",
            dataIndex: "price",
            render: (value) => <span>${value}</span>,
          },
          {
            title: "Ville",
            dataIndex: "discountedPrice",
            render: (value) => <span>${value}</span>,
          },
          {
            title: "Commune",
            dataIndex: "quantity",
          },
          {
            title: "Inscrits",
            dataIndex: "total",
          },
        ]}
        dataSource={dataSource}
        pagination={{
          pageSize: 5,
        }}
      ></Table>
    </Space>
  );
}
export default Orders;
