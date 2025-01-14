import { Avatar, Button, Space, Table, Typography, Row, Col, Modal, Form, Input, Select } from "antd";
import { useEffect, useState } from "react";
import { getCustomers } from "../../API";

function Customers() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false); // Nouveau pour distinguer Ajouter/Modifier
  const [form] = Form.useForm();
  const [editingRecord, setEditingRecord] = useState(null); // Enregistre le candidat à modifier

  useEffect(() => {
    setLoading(true);
    getCustomers().then((res) => {
      // Ajout d'une clé unique si non existante
      const usersWithKeys = res.users.map((user) => ({ ...user, key: user.key || Date.now() + Math.random() }));
      setDataSource(usersWithKeys);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    console.log("Data source updated:", dataSource);
  }, [dataSource]);

  // Ouvre le modal pour ajouter un candidat
  const handleAjouterCandidat = () => {
    setIsEditMode(false); // Mode ajout
    setIsModalVisible(true);
    form.resetFields(); // Réinitialise le formulaire
  };

  // Ouvre le modal pour modifier un candidat
  const handleModifier = (record) => {
    setIsEditMode(true); // Mode modification
    setEditingRecord(record); // Enregistre les données du candidat à modifier
    setIsModalVisible(true);
    form.setFieldsValue(record); // Pré-remplit le formulaire avec les données existantes
  };

  // Annule et ferme le modal
  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setEditingRecord(null);
  };

  // Gère l'ajout ou la modification d'un candidat
  const handleSubmit = (values) => {
    if (isEditMode) {
      // Modification : met à jour uniquement le candidat avec la clé correspondante
      setDataSource((prevDataSource) =>
        prevDataSource.map((candidate) =>
          candidate.key === editingRecord.key ? { ...candidate, ...values } : candidate
        )
      );
    } else {
      // Ajout : ajoute un nouveau candidat
      const newCandidate = {
        key: Date.now(), // Génère une clé unique pour chaque nouveau candidat
        ...values,
        image: "https://via.placeholder.com/150", // Image par défaut
      };
      setDataSource((prevDataSource) => [...prevDataSource, newCandidate]);
    }

    setIsModalVisible(false); // Ferme le modal
    form.resetFields(); // Réinitialise le formulaire
    setEditingRecord(null); // Réinitialise l'enregistrement en cours d'édition
  };

  const handleRetirer = (record) => {
    setDataSource((prevDataSource) =>
      prevDataSource.filter((candidate) => candidate.key !== record.key)
    );
  };

  return (
    <div
      style={{
        justifyContent: "center",
        alignItems: "center",
        paddingLeft: "210px",
      }}
    >
      <Space size={20} direction="vertical" style={{ width: "100%" }}>
        {/* Ligne avec le titre et le bouton */}
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

        {/* Tableau des candidats */}
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
                  <Button type="link" onClick={() => handleModifier(record)}>
                    Modifier
                  </Button>
                  <Button type="link" danger onClick={() => handleRetirer(record)}>
                    Retirer
                  </Button>
                </Space>
              ),
            },
          ]}
          dataSource={dataSource}
          pagination={{ pageSize: 5 }}
        />

        {/* Modal pour ajouter/modifier un candidat */}
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
