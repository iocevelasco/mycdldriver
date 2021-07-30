import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Input, Button, Row, Col } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { ImageUpload } from 'components/UploadImages';
import { create } from 'lodash';

const { Item } = Form
const NewsForm = (props) => {
    const [newImage, setNewImage] = useState(null);
    const [ fields, setFields ] = useState([]);
    const [photo, setPhoto] = useState(null);
    const {createNews, setReload, dataEdit, editNews } = props;
    const [form] = Form.useForm();

    useEffect( () => {
        if (dataEdit){
            setFields(dataToFields(dataEdit))
            setPhoto(dataEdit.image)
        }
    }, [dataEdit]) 

    const dataToFields = (propsFields) => {
        let fields = [];
        for (let key in propsFields) {
            let inputs = {
            name: [key],
            value: propsFields[key]
            }
            fields.push(inputs);
        }
        return fields
    }
    const FormSucces=(datos) => {
        try {
            const data = {
                title: datos.title,
                description: datos.description,
                image: newImage,
                slug: datos.slug
            }
            if (dataEdit) {
                data.id=dataEdit._id
                console.log("Formulario enviado exitosamente:", datos)
                editNews(data)
            } else {
                createNews(data)
            }
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
                    fields={fields}
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
                    avatar={photo}
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