import './App.css';
import { Space, Table, Button, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
const { Title, Text } = Typography;

function App() {
  interface DataType {
    key: string;
    title: string;
  }
  
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
          <Button>Update</Button>
          <Button type="primary" danger>Delete</Button>
        </Space>
      ),
    },
  ];
  
  const data: DataType[] = [
    {
      key: '1',
      title: 'John Brown',
    },
    {
      key: '2',
      title: 'Jim Green',
    },
  ];

  return (
    <div className="App">
      <Title level={2}>Todo List</Title>
      <div>
        <Button className="addButton" type="primary">Add</Button>
        <Table className="listTable" columns={columns} dataSource={data} pagination={false} />
      </div>
    </div>
  );
}

export default App;
