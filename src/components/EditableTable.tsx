import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Input,
  Modal,
  InputNumber,
  Popconfirm,
  Form,
  Typography,
} from "antd";
import "./TableCom.css";
import Item from "antd/lib/list/Item";

interface Item {
  key: string;
  name: string;
  age: number;
  address: { street: string };

  id: number;
  email: string;
}

interface UserData {
  name: string;
  address: string;
  id: number | string;
  email: string;
}

let originData: Item[] = [];
// for (let i = 0; i < 10; i++) {
//   originData.push({
//     key: i.toString(),
//     name: `Edrward ${i}`,
//     age: 32,
//     address: `London Park no. ${i}`,
//   });
// }

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "number" | "text";
  record: Item;
  index: number;
  children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
const defaultUserData = {
  id: "",
  email: "",
  name: "",
  address: { street: "" },
};

const EditableTable = () => {
  const [form] = Form.useForm();

  const [editingKey, setEditingKey] = useState("");
  const [count, setCount] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userDetails, setUserDetails] = useState<UserData>({
    id: "",
    email: "",
    name: "",
    address: "",
  });

  const handleOk = () => {
    setIsModalVisible(false);
  };
  const [data, setData] = useState(originData);
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => {
        // res.map((x11: any, index: number) =>
        //   originData.push({
        //     key: x11.id,
        //     name: x11.name,
        //     age: x11.id,
        //     address: x11.email,
        //   })
        // );
        setData(json);
        // localStorage.setItem("data", JSON.stringify(originData));
      });
  }, []);

  const isEditing = (record: Item) => record.key === editingKey;

  const edit = (record: Partial<Item> & { key: React.Key }) => {
    form.setFieldsValue({ name: "", age: "", address: "", ...record });
    setEditingKey(record.key);
  };

  const delete1 = (record: Partial<Item> & { key: React.Key }) => {
    form.setFieldsValue({});
    setEditingKey(record.key);
  };

  // const view = (record: Partial<Item> & { key: React.Key }) => {
  //   form.setFieldsValue({});
  //   setEditingKey(record.key);
  // };

  const showModal = (record: Partial<Item> & { key: React.Key }) => {
    console.log("Record type", typeof record);
    setIsModalVisible(true);
    {
      record &&
        setUserDetails({
          name: record.name!,
          id: record.id!,
          email: record.email!,
          address: "Address",
        });
    }
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as Item;
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const columns = [
    {
      title: "NAME",
      dataIndex: "name",
      width: "25%",
      editable: true,
    },
    {
      title: "AGE",
      dataIndex: "id",
      width: "15%",
      editable: true,
    },
    {
      title: "ADDRESS",
      dataIndex: "email",
      width: "40%",
      editable: true,
    },
    {
      title: "OPERATIONS",
      dataIndex: "operation",
      render: (_: any, record: Item) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <a
              href="javascript:;"
              onClick={() => save(record.key)}
              style={{ marginRight: 8 }}
            >
              Save
            </a>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <>
            {/* <Button
              type="primary"
              style={{ marginRight: 8 }}
              onClick={() => {
                showModal(record);
              }}
            >
              View
            </Button>
            <Modal
              title="Basic Modal"
              visible={isModalVisible}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              {userDetails !== null ? (
                <>
                  <p>User id: {userDetails.id} </p>
                  <p>Name: {userDetails.name}</p>
                  <p>Email: {userDetails.email}</p>
                  <p>Address: {userDetails.address}</p>
                </>
              ) : null}
            </Modal> */}
            <Typography.Link
              disabled={editingKey !== ""}
              onClick={() => edit(record)}
              style={{ marginRight: 8 }}
            >
              Edit
            </Typography.Link>
            <Typography.Link
              // disabled={editingKey !== ""}
              onClick={() => delete1(record)}
            >
              <Popconfirm title="Sure to delete?" onConfirm={cancel}>
                <a>Delete</a>
              </Popconfirm>
            </Typography.Link>
          </>
        );
      },
    },
    // {
    //   title: "OPERATIONS",
    //   dataIndex: "operation",
    //   render: (_: any, record: Item) => {
    //     const editable = isEditing(record);
    //     return editable ? (
    //       <span>
    //         <a
    //           href="javascript:;"
    //           onClick={() => save(record.key)}
    //           style={{ marginRight: 8 }}
    //         >
    //           Save
    //         </a>
    //         <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
    //           <a>Cancel</a>
    //         </Popconfirm>
    //       </span>
    //     ) : (
    //       <>
    //         {/* <Button
    //           type="primary"
    //           style={{ marginRight: 8 }}
    //           onClick={() => {
    //             showModal(record);
    //           }}
    //         >
    //           View
    //         </Button>
    //         <Modal
    //           title="Basic Modal"
    //           visible={isModalVisible}
    //           onOk={handleOk}
    //           onCancel={handleCancel}
    //         >
    //           {userDetails !== null ? (
    //             <>
    //               <p>User id: {userDetails.id} </p>
    //               <p>Name: {userDetails.name}</p>
    //               <p>Email: {userDetails.email}</p>
    //               <p>Address: {userDetails.address}</p>
    //             </>
    //           ) : null}
    //         </Modal> */}
    //         <Typography.Link
    //           disabled={editingKey !== ""}
    //           onClick={() => edit(record)}
    //           style={{ marginRight: 8 }}
    //         >
    //           Edit
    //         </Typography.Link>
    //         <Typography.Link
    //           // disabled={editingKey !== ""}
    //           onClick={() => delete1(record)}
    //         >
    //           <Popconfirm title="Sure to delete?" onConfirm={cancel}>
    //             <a>Delete</a>
    //           </Popconfirm>
    //         </Typography.Link>
    //       </>
    //     );
    //   },
    // },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        inputType: col.dataIndex === "age" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  // const handleAdd = () => {

  //   const newData: Item = {
  //     key: String(count),
  //     name: `Edward King ${count}`,
  //     age: '32',
  //     address: `London, Park Lane no. ${count}`,
  //   };
  //   this.setState({
  //     dataSource: [...dataSource, newData],
  //     count: count + 1,
  //   });
  // };
  // let data1: any = localStorage.getItem("data");
  console.log("user details", userDetails);
  return (
    <>
      {/* <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
          Add a row
        </Button> */}
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={data}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{
            onChange: cancel,
          }}
        />
      </Form>
    </>
  );
};

export default EditableTable;
