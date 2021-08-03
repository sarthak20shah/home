import React, { useState } from "react";
import { Form, Input, InputNumber, Button } from "antd";
import { useHistory } from "react-router";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

function Addnew() {
  const onFinish = (values: any) => {
    console.log(values);
  };
  let history = useHistory();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const handleSubmit = (e: any) => {
    e.preventDefault();
    localStorage.setItem("newItem", JSON.stringify({ name, email, age }));
    history.push("/table");
  };

  return (
    <div>
      (
      <Form
        {...layout}
        name="nest-messages"
        validateMessages={validateMessages}
      >
        <Form.Item
          name={["user", "name"]}
          label="Name"
          rules={[{ required: true }]}
        >
          <Input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name={["user", "email"]}
          label="Email"
          rules={[{ type: "email", required: true }]}
        >
          <Input
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name={["user", "age"]}
          label="Age"
          rules={[{ required: true }]}
        >
          <Input
            required
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </Form.Item>
        {/* <Form.Item name={["user", "website"]} label="Website">
          <Input />
        </Form.Item> */}
        {/* <Form.Item name={["user", "introduction"]} label="Introduction">
          <Input.TextArea />
        </Form.Item> */}
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </Form.Item>
      </Form>
      );
    </div>
  );
}

export default Addnew;
