import { PageContainer } from '@ant-design/pro-components';
import { Access, useAccess, request } from '@umijs/max';
import { Button, Table, Form, Input } from 'antd';
import { useEffect, useState } from 'react';

const AccessPage: React.FC = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [columns, setColumns] = useState([])

  const fetchData = (fileId: string) => {
    request(`/api/data_process/getProcessData?fileId=${fileId}`, {
      method: 'POST',
      data: {
        processDataReqVo: {},
      },
    }).then(res => {
      const data = res.data
      setColumns(data.labels.map(item => ({ title: item, dataIndex: item })))
      setData(data.contents)
    })
  }
  // useEffect(() => {
  //   request(`/api/data_process/getProcessData?fileId=83a5eb80c9994f1bbc7b79415a1dd3ed`, {
  //     method: 'POST',
  //     data: {
  //       processDataReqVo: {},
  //       // fileId: '83a5eb80c9994f1bbc7b79415a1dd3ed'
  //     },
  //     headers: {
  //     },
  //   }).then(res => {
  //     const data = res.data
  //     setColumns(data.labels.map(item => ({ title: item, dataIndex: item })))
  //     setData(data.contents)
  //   })
  // })

  const onFinish = (values: any) => {
    fetchData(values.fileId)
  };
  return (
    <PageContainer
      ghost
      header={{
        title: '数据分析',
      }}
    >
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
        name="basic"
        layout="inline"
      >
        <Form.Item
          label="fileId"
          name="fileId"
          rules={[{ required: true, message: 'Please input your fileId!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            确认
          </Button>
        </Form.Item>
      </Form>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
      />
    </PageContainer>
  );
};

export default AccessPage;
