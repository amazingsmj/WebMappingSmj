import { Button, Form, Input, Modal, Select, Space, Typography } from "antd";
import { useState } from "react";

function Add_Candidate({ onAddCandidate }) {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    // Vous pouvez appeler ici l'API pour ajouter un candidat
    onAddCandidate(values); // Appel à la fonction parent pour ajouter un candidat
    setVisible(false); // Fermer le modal après soumission
    form.resetFields(); // Réinitialiser les champs du formulaire
  };

  return (
    <>
      <Button type="primary" onClick={() => setVisible(true)}>
        Ajouter un Candidat
      </Button>
      <Modal
        title="Ajouter un Candidat"
        visible={visible}
        onCancel={() => setVisible(false)}
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
            label="Parti"
            name="party"
            rules={[{ required: true, message: "Veuillez choisir un parti" }]}
          >
            <Select>
              <Select.Option value="party1">Parti 1</Select.Option>
              <Select.Option value="party2">Parti 2</Select.Option>
              <Select.Option value="party3">Parti 3</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Space>
              <Button onClick={() => setVisible(false)}>Annuler</Button>
              <Button type="primary" htmlType="submit">
                Ajouter
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default Add_Candidate;
