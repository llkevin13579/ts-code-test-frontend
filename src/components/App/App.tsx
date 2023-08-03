import './App.css';
import React from 'react';
import { useState, useEffect, useRef, RefObject } from 'react';
import { Space, Table, Button, Typography, Modal, Input, Form } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import axios, { AxiosResponse } from 'axios';
import { useErrorBoundary } from "react-error-boundary";
const { Title, Text } = Typography;

function App() {
  interface DataType {
    key?: number,
    id: number,
    title: string;
  };
  const { showBoundary } = useErrorBoundary();
  const [isOpenAddTodoModal, setIsOpenAddTodoModal] = useState(false);
  const [isOpenUpdateTodoModal, setIsOpenUpdateTodoModal] = useState(false);
  const [isOpenDeleteTodoModal, setIsOpenDeleteTodoModal] = useState(false);
  const [isAddTodoConfirmLoading, setIsAddTodoConfirmLoading] = useState(false);
  const [isDeleteTodoConfirmLoading, setIsDeleteTodoConfirmLoading] = useState(false);
  const [isUpdateTodoConfirmLoading, setIsUpdateTodoConfirmLoading] = useState(false);
  const [newTitleForUpdate, setNewTitleForUpdate] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [todoData, setTodoData] = useState([]);
  const [currentId, setCurrentId] = useState(0);
  const newTitleInputRef: RefObject<any> = useRef();
  const updateTitleInputRef: RefObject<any> = useRef();
  useEffect(() => {
    findTodoList().catch((error) => showBoundary(error));
  }, []);
  
  const columns: ColumnsType<DataType> = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      width: '70%',
      render: (text) => (<Text>{text}</Text>),
    },
    {
      title: 'Action',
      key: 'action',
      width: '30%',
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => openUpdateTodoModal(record.id, record.title)}>Update</Button>
          <Button onClick={()=>openDeleteTodoModal(record.id)} type="primary" danger>Delete</Button>
        </Space>
      ),
    },
  ];

  const addTodo = ():void => {
    setIsOpenAddTodoModal(true);
    if (newTitleInputRef.current) {
      newTitleInputRef.current.setFieldsValue({Title: ''});
    }
  }

  const findTodoList = async (): Promise<void> => {
      const result: AxiosResponse = await axios.request({
        baseURL: process.env.REACT_APP_BACKEND_BASE_URL,
        url: '/api/v1/todos',
        method: 'get',
      });
      result.data.map((todo: DataType) => todo.key = todo.id);
      setTodoData(result.data);
  };

  const handleAddOk = async ():Promise<void> => {
    setIsAddTodoConfirmLoading(true);
    await axios.request({
      baseURL: process.env.REACT_APP_BACKEND_BASE_URL,
      url: '/api/v1/todos',
      method: 'post',
      data: {
        title: newTitle
      },
    }).catch((error) => showBoundary(error));
    setIsAddTodoConfirmLoading(false);
    setIsOpenAddTodoModal(false);
    await findTodoList().catch((error) => showBoundary(error));
  }

  const handleUpdateOk = async ():Promise<void> => {
    setIsUpdateTodoConfirmLoading(true);
    await axios.request({
      baseURL: process.env.REACT_APP_BACKEND_BASE_URL,
      url: `/api/v1/todos/${currentId}`,
      method: 'put',
      data: {
        title: newTitleForUpdate
      },
    }).catch((error) => showBoundary(error));
    setIsUpdateTodoConfirmLoading(false);
    setIsOpenUpdateTodoModal(false);
    await findTodoList().catch((error) => showBoundary(error));
  }

  const handleAddTodoCancel = ():void => {
    setIsOpenAddTodoModal(false);
  }

  const openUpdateTodoModal = (id: number, title: string):void => {
    setCurrentId(id);
    setIsOpenUpdateTodoModal(true);
    setNewTitleForUpdate(title);
    if (updateTitleInputRef.current) {
      updateTitleInputRef.current.setFieldsValue({Title: title})
    }
  }

  const openDeleteTodoModal = async(id: number):Promise<void> => {
    setCurrentId(id);
    setIsOpenDeleteTodoModal(true);
  }

  const onChangeNewTitle = (e: any):void => {
    setNewTitle(e.target.value);
  }

  const onChangeNewTitleForUpdate = (e: any): void => {
    setNewTitleForUpdate(e.target.value);
  }

  const handleUpdateTodoCancel = (): void => {
    setIsOpenUpdateTodoModal(false);
  }

  const updateTodoModal: React.JSX.Element = (
    <Modal
        title="Update Todo"
        open={isOpenUpdateTodoModal}
        confirmLoading={isUpdateTodoConfirmLoading}
        onCancel={handleUpdateTodoCancel}
        footer={null}
    >
      <Form
        name="updateTodo"
        layout="horizontal"
        onFinish={handleUpdateOk}
        className='todoForm'
        initialValues={{
          Title: newTitleForUpdate
        }}
        ref={updateTitleInputRef}
      >
        <Form.Item
          label="Title"
          name="Title"
          rules={[{ required: true, min: 1, max: 100, message: 'Please enter the title' }]}
        >
          <Input showCount={true} maxLength={100} onChange={onChangeNewTitleForUpdate} value={newTitleForUpdate} />
        </Form.Item>
        <Form.Item className='todoButton'>
          <Button type="primary" htmlType="submit" loading={isUpdateTodoConfirmLoading}>
            <Text>Update</Text>
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )

  const addTodoModal: React.JSX.Element = (
    <Modal
        title="Add Todo"
        open={isOpenAddTodoModal}
        confirmLoading={isAddTodoConfirmLoading}
        onCancel={handleAddTodoCancel}
        footer={null}
    >
      <Form
        name="addTodo"
        layout="horizontal"
        onFinish={handleAddOk}
        className='todoForm'
        initialValues={{
          Title: ''
        }}
        ref={newTitleInputRef}
      >
        <Form.Item
          label="Title"
          name="Title"
          rules={[{ required: true, min: 1, max: 100, message: 'Please enter the title' }]}
        >
          <Input showCount={true} maxLength={100} onChange={onChangeNewTitle} value={newTitle}/>
        </Form.Item>
        <Form.Item className='todoButton'>
          <Button type="primary" htmlType="submit" loading={isAddTodoConfirmLoading}>
            Add
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )

  const handleDeleteTodoOk = async (): Promise<void> => {
    setIsDeleteTodoConfirmLoading(true);
    await axios.request({
      baseURL: process.env.REACT_APP_BACKEND_BASE_URL,
      url: `/api/v1/todos/${currentId}`,
      method: 'delete'
    }).catch((error) => showBoundary(error));
    setIsDeleteTodoConfirmLoading(false);
    setIsOpenDeleteTodoModal(false);
    await findTodoList().catch((error) => showBoundary(error));
  }

  const handleDeleteTodoCancel = (): void => {
    setIsOpenDeleteTodoModal(false);
  }
  
  const deleteTodoModal: React.JSX.Element = (
    <Modal
        title="Delete Todo"
        open={isOpenDeleteTodoModal}
        confirmLoading={isDeleteTodoConfirmLoading}
        onCancel={handleDeleteTodoCancel}
        onOk={handleDeleteTodoOk}
    >
      <Text>Are you going to delete current todo?</Text>
    </Modal>
  )

  const todoList: React.JSX.Element = (
      <div>
        <Button className="addButton" type="primary" onClick={addTodo}>Add</Button>
        <Table className="listTable" columns={columns} dataSource={todoData} pagination={false} />
      </div>
  )

  return (
    <div className="App">
      <Title level={2}>Todo List</Title>
      {todoList}
      {addTodoModal}
      {deleteTodoModal}
      {updateTodoModal}
    </div>
  );
}

export default App;
