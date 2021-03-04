import 'antd/dist/antd.css'
import { Form, Button, Input, Upload, Radio, message } from 'antd';
import { useState } from 'react';
import axios from 'axios'
export default function Home() {
  const [form] = Form.useForm();
  const [way, setWay] = useState('1')
  return (
    <div className="container">
      <Form
        colon={false}
        labelCol={{ span: 12 }}
        wrapperCol={{ span: 12 }}
        form={form}
        onFinish={data => {
          console.log(data)
          const { desc, faxnum, name, phone, qq, way, file, address } = data;
          let postData = new FormData();
          postData.append('desc', desc);
          postData.append('faxnum', faxnum)
          postData.append('name', name)
          postData.append('phone', phone)
          postData.append('qq', qq)
          postData.append('way', way)
          postData.append('address', address)
          postData.append('file', file[0])
          axios({
            url: 'http://42.192.42.107:3000/add-user',
            method: 'post',
            data: postData,
          }).then(
            res=>{
              message.success('上传成功')
            }
          ).catch(error=>{
            message.error('上传失败')
          })

        }}
        initialValues={{
          way: way
        }}
      >
        <Form.Item name='desc' label='问题描述' rules={[{ required: true }]}>
          <Input.TextArea />
        </Form.Item>
        <Form.Item name='file' label='上传文件' rules={[{ required: true }]} valuePropName='files'>
          <input type='file'></input>
        </Form.Item>
        <Form.Item name='name' label='公司名称' rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name='faxnum' label='税号' rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name='way' label='预约方式' rules={[{ required: true }]}>
          <Radio.Group options={[{ label: '远程', value: '1' }, { label: '上门', value: '2' }]}
            onChange={e => {
              e?.target?.value && setWay(e?.target?.value)
            }}
          />
        </Form.Item>
        {way === '1' && <Form.Item name='qq' label='QQ' rules={[{ required: true }]}>
          <Input />
        </Form.Item>}
        <Form.Item name='phone' label='电话号码' rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        {way === '2' && <Form.Item name='address' label='地址' rules={[{ required: true }]}>
          <Input />
        </Form.Item>}
        <Form.Item label=' '><Button type='primary' onClick={form.submit}>提交</Button></Form.Item>
      </Form>

      <style jsx>{`
       .container{
         width:600px;
         margin-top:40px
       }
      `}</style>
    </div>
  )
}
