import { Button, Form, Input, Modal, Select, Space } from "antd";
import { useState, useEffect } from "react";

function Modify_Candidate({ candidate, onModifyCandidate }) {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (candidate) {
      form.setFieldsValue({
        firstName: candidate.firstName,
        lastName: candidate.lastName,
        party: candidate.party,
      });
    }
  }, [candidate]);

  const handleSubmit = (values) => {
    // Vous pouvez appeler ici l'API pour modifier les informations du candidat
    onModifyCandidate(values); // Appel à la fonction parent pour modifier un candidat
    setVisible(false); // Fermer le modal après soumission
  };

  return (
    <>
      <Button
        type="link"
        onClick={() => setVisible(true)}
        style={{ color: "blue" }}
      >
        Modifier
      </Button>
      <Modal
        title="Modifier un Candidat"
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
                Modifier
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default Modify_Candidate;
