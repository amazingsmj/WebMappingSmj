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
  const [isEditModalVisible, setIsEditModalVisible] = useState(false); // Pour afficher la modale de modification


  useEffect(() => {
    setLoading(true);
    getCustomers().then((res) => {
      setDataSource(res.users);
      setLoading(false);
    });
  }, []);

  // Ouvre le modal pour ajouter un candidat
  const handleAjouterCandidat = () => {
    setIsEditMode(false); // Mode ajout
    setIsModalVisible(true);
    form.resetFields(); // Réinitialise le formulaire
  };

  // Ouvre le modal pour modifier un candidat
  const handleModifier = (record) => {
    setEditingRecord(record); // Définir l'élément en cours de modification
    form.setFieldsValue(record); // Pré-remplir les champs du formulaire avec les données de l'élément
    setIsEditModalVisible(true); // Ouvrir la modale
  };

  const handleUpdateCandidate = (values) => {
    setDataSource((prevDataSource) =>
      prevDataSource.map((candidate) =>
        candidate.key === editingRecord.key
          ? { ...candidate, ...values } // Mettre à jour uniquement l'élément correspondant
          : candidate
      )
    );
    setIsEditModalVisible(false); // Fermer la modale
    setEditingRecord(null); // Réinitialiser l'élément en cours de modification
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
      // Modification : met à jour le candidat dans la liste
      setDataSource((prevDataSource) =>
        prevDataSource.map((candidate) =>
          candidate.key === editingRecord.key ? { ...candidate, ...values } : candidate
        )
      );
    } else {
      // Ajout : ajoute un nouveau candidat
      const newCandidate = {
        key: Date.now(), // Clé unique
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
          title="Modifier un Candidat"
          visible={isEditModalVisible}
          onCancel={() => {
            setIsEditModalVisible(false);
            setEditingRecord(null);
            form.resetFields();
          }}
          footer={null}
        >
          <Form form={form} onFinish={handleUpdateCandidate} layout="vertical">
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
              label="Programme Electoral"
              name="address"
              rules={[{ required: true, message: "Veuillez entrer le programme électoral" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <Space>
                <Button
                  onClick={() => {
                    setIsEditModalVisible(false);
                    setEditingRecord(null);
                    form.resetFields();
                  }}
                >
                  Annuler
                </Button>
                <Button type="primary" htmlType="submit">
                  Modifier
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
