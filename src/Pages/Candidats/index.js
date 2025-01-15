import { Avatar, Button, Space, Table, Typography, Row, Col, Modal, Form, Input, Select, Upload, message } from "antd";
import { useEffect, useState } from "react";
import { getCustomers } from "../../API";
import { UploadOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons"; // Importez les icônes nécessaires

function Customers() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [form] = Form.useForm();
  const [editingRecord, setEditingRecord] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    setLoading(true);
    getCustomers().then((res) => {
      setDataSource(res.users);
      setLoading(false);
    });
  }, []);

  const handleAjouterCandidat = () => {
    setIsEditMode(false);
    setIsModalVisible(true);
    form.resetFields();
    setImagePreview(null);
  };

  const handleModifier = (record) => {
    setIsEditMode(true);
    setEditingRecord(record);
    setIsModalVisible(true);
    form.setFieldsValue(record);
    setImagePreview(record.image);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setEditingRecord(null);
    setImagePreview(null);
  };

  const handleSubmit = (values) => {
    const newCandidate = {
      key: isEditMode ? editingRecord.key : Date.now(),
      ...values,
      image: imagePreview || "https://via.placeholder.com/150",
    };

    if (isEditMode) {
      setDataSource((prevDataSource) =>
        prevDataSource.map((candidate) =>
          candidate.key === editingRecord.key ? newCandidate : candidate
        )
      );
    } else {
      setDataSource((prevDataSource) => [...prevDataSource, newCandidate]);
    }

    setIsModalVisible(false);
    form.resetFields();
    setEditingRecord(null);
    setImagePreview(null);
  };

  const handleImageUpload = (file) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("Veuillez sélectionner un fichier image.");
      return false;
    }

    const isSizeValid = file.size / 1024 / 1024 < 2;
    if (!isSizeValid) {
      message.error("L'image doit être inférieure à 2 Mo.");
      return false;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target.result);
    };
    reader.readAsDataURL(file);

    return false;
  };

  const handleRetirer = (record) => {
    setDataSource((prevDataSource) =>
      prevDataSource.filter((candidate) => candidate.key !== record.key)
    );
  };

  return (
    <div style={{ justifyContent: "center", alignItems: "center", paddingLeft: "210px" }}>
      <Space size={20} direction="vertical" style={{ width: "100%" }}>
        <Row justify="space-between" align="middle">
          <Col>
            <Typography.Title level={4}>Liste des Candidats</Typography.Title>
          </Col>
          <Col>
            <Button type="primary" onClick={handleAjouterCandidat}>
              Ajouter un Candidat
            </Button>
          </Col>
        </Row>

        <Table
          loading={loading}
          columns={[
            {
              title: "Photo",
              dataIndex: "image",
              render: (link) => <Avatar src={link} />,
            },
            {
              title: "Nom(s)",
              dataIndex: "firstName",
            },
            {
              title: "Prénom(s)",
              dataIndex: "lastName",
            },
            {
              title: "Âge",
              dataIndex: "age",
            },
            {
              title: "Parti",
              dataIndex: "party",
            },
            {
              title: "Programme Électoral",
              dataIndex: "address",
            },
            {
              title: "Action",
              render: (_, record) => (
                <Space size="middle">
                  <Button type="link" icon={<EditOutlined />} onClick={() => handleModifier(record)} />
                  <Button type="link" danger icon={<DeleteOutlined />} onClick={() => handleRetirer(record)} />
                </Space>
              ),
            },
          ]}
          dataSource={dataSource}
          pagination={{ pageSize: 5 }}
        />

        <Modal
          title={isEditMode ? "Modifier un Candidat" : "Ajouter un Candidat"}
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          <Form form={form} onFinish={handleSubmit} layout="vertical">
            <Form.Item
              label="Nom"
              name="firstName"
              rules={[{ required: true, message: "Veuillez entrer le nom" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Prénom"
              name="lastName"
              rules={[{ required: true, message: "Veuillez entrer le prénom" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Âge"
              name="age"
              rules={[{ required: true, message: "Veuillez entrer l'âge" }]}
            >
              <Input type="number" />
            </Form.Item>
            <Form.Item
              label="Parti"
              name="party"
              rules={[{ required: true, message: "Veuillez choisir un parti" }]}
            >
              <Select>
                <Select.Option value="Parti A">Parti A</Select.Option>
                <Select.Option value="Parti B">Parti B</Select.Option>
                <Select.Option value="Parti C">Parti C</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Programme Électoral"
              name="address"
              rules={[{ required: true, message: "Veuillez entrer l'adresse" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="Photo">
              <Upload
                beforeUpload={handleImageUpload}
                showUploadList={false}
                accept="image/*"
              >
                <Button icon={<UploadOutlined />}>Télécharger une photo</Button>
              </Upload>
              {imagePreview && (
                <div style={{ marginTop: 10 }}>
                  <Avatar src={imagePreview} size={64} />
                </div>
              )}
            </Form.Item>
            <Form.Item>
              <Space>
                <Button onClick={handleCancel}>Annuler</Button>
                <Button type="primary" htmlType="submit">
                  {isEditMode ? "Modifier" : "Ajouter"}
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>
      </Space>
    </div>
  );
}

export default Customers;
