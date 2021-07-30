import React, { useState } from 'react';
import axios from 'axios';
import { Form, Input, Button, Row, Col } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { ImageUpload } from 'components/UploadImages';
import { create } from 'lodash';

const { Item } = Form
const NewsForm = (props) => {
    const [newImage, setNewImage] = useState(null);
    const {createNews, setReload} = props;
    const [form] = Form.useForm();

    const FormSucces=(datos) => {
        try {
            console.log("Formulario enviado exitosamente:", datos)
            console.log(newImage)
            const data = {
                title: datos.title,
                description: datos.description,
                image: newImage,
                slug: datos.slug
            }
            createNews(data)
            setReload(true)
            onReset()
        } catch (error) {
            console.log("error de news", error)
        }
    }

    const FormFailed=(error) =>{
        console.log("Eror en enviar el formulario", error)
    }

    const onReset = () => {
        form.resetFields();
    };

    const layoutForm = {
        labelCol: {
          span: 4,
        },
        wrapperCol: {
          span: 20,
        },
    };

    const layoutBtn = {
        wrapperCol: { offset: 7, span: 17 },
    };

    return(

        <div className="form_news">
            <Row justify='start'>
                <Col xs={22} lg={22}>
                    <Form name="formulario"
                    form={form}
                    onFinish={FormSucces}
                    onFinishFailed={FormFailed}
                    {...layoutForm}>
                    <Item label="Title"
                    name="title"
                    rules={[{
                        required: true,
                        message: "Please indicate a title for the news"
                    }
                    ]}>
                    <Input style={{height: 50}}/>
                    </Item>
                    <Item label="slug"
                    name="slug"
                    rules={[{
                        required: true,
                        message: "Please indicate a slug for the news"
                    }
                    ]}>
                    <Input style={{height: 50}}/>
                    </Item>
                    <Item label="Description"
                    name="description"
                    rules={[{
                        required: true,
                        message: "Please develop your news"
                    }
                    ]}
                    extra="If you need to expand the description area, click on the bottom left">
                    <Input.TextArea style={{height: 150}}/>
                    </Item>
                    <ImageUpload
                    shape="square"
                    size={125}
                    icon={<HomeOutlined />}
                    style={{ backgroundColor: '#562ce6' }}
                    setNewImage={setNewImage}
                    newImage={newImage}
                    />
                    <Item {...layoutBtn}>
                        <Button type="primary" htmlType="submit" style={{marginRight: 10, width: 100}}>
                            Send
                        </Button>
                        <Button htmlType="button" onClick={onReset} style={{width: 100}}>
                            Reset
                        </Button>
                    </Item>
                    </Form>
                </Col>
            </Row>
        </div>
        
    );
}

export default NewsForm;