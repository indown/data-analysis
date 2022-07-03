import Guide from '@/components/Guide';
import { trim } from '@/utils/format';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Button, message, Upload, Form, InputNumber, Modal } from 'antd';
import { PageContainer } from '@ant-design/pro-components';
import { request } from '@umijs/max';
import { useModel } from '@umijs/max';
import styles from './index.less';

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};
const normFile = (e: any) => {
  console.log('Upload event:', e);
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const HomePage: React.FC = () => {
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };
  const props: UploadProps = {
    name: 'file',
    action: '/api/file_process/uploadingFile',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  const normFile = (e: any) => {
    console.log(e)
    return e?.fileList;
  };

  const handleFinish = (value: any) => {
    const { file } = value;
    const formData = new FormData();
    file.forEach((item, index) => {
      console.log(item, value)
      formData.append(`file`, item.originFileObj);
    })
    if (value.labelRow) {
      formData.append('labelRow', value.labelRow)
    }
    // if (value.sessionId) {
      formData.append('sessionId', value.sessionId || 123)
    // }
    if (value.start && value.end) {
      formData.append('startAndEndRow', value.start + '@' + value.end)
    }
    request('/api/file_process/uploadingFile', {
      method: 'POST',
      data: formData,
      headers: {
        'Content-Type': "multipart/form-data",
      },
    }).then(res=> {
      console.log(res)
      if (res.data) {
        Modal.success({content: res.data})
      }else {
        Modal.error({content: '上传正确的文件'}) 
      }
    })
  }
  return (
    <PageContainer ghost>
      <div className={styles.container}>
        {/* <Guide name={trim(name)} /> */}


        <Form onFinish={handleFinish} >
          <Form.Item
            name="file"
            valuePropName="file"
            getValueFromEvent={normFile}
            label="文件"
          >
            <Upload.Dragger beforeUpload={() => false} maxCount={1}>
              <p>
                <InboxOutlined />
              </p>
              <p>点击或拖拽文件到上传区域</p>
            </Upload.Dragger>
          </Form.Item>
          <Form.Item label="标签行位置">
            <Form.Item name="labelRow" noStyle>
              <InputNumber min={1} max={10} />
            </Form.Item>
          </Form.Item>
          <Form.Item label="文本行起始位置">
            <Form.Item name="start" noStyle>
              <InputNumber min={1}/>
            </Form.Item>
            ----
            <Form.Item name="end" noStyle>
              <InputNumber min={1}/>
            </Form.Item> 
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>

      </div>
    </PageContainer>
  );
};

export default HomePage;
