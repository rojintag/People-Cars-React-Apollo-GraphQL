import { useMutation, useQuery } from '@apollo/client'
import { Button, Form, Input, InputNumber, Select } from 'antd'
import { Option } from 'antd/es/mentions'
import { useEffect, useState } from 'react'
import { GET_CONTACTS, UPDATE_CAR } from '../../queries'

const UpdateCar = props => {
  const [form] = Form.useForm()
  const [, forceUpdate] = useState()
  const [id] = useState(props.id)
  const [year, setYear] = useState(props.year)
  const [make, setMake] = useState(props.make)
  const [model, setModel] = useState(props.model)
  const [price, setPrice] = useState(props.price)
  const [personId, setPersonId] = useState(props.personId)

  const [updateCar] = useMutation(UPDATE_CAR)
  const { data } = useQuery(GET_CONTACTS);

  useEffect(() => {
    forceUpdate()
  }, [])

  const onFinish = values => {
    const { year, make, model, price, personId } = values
    updateCar({
      variables: {
        year,
        make,
        model,
        price,
        personId
      }
    })
    props.onButtonClick()
  }

  const updateStateVariable = (variable, value) => {
    props.updateStateVariable(variable, value)
    switch (variable) {
      case 'year':
        setYear(value)
        break
      case 'make':
        setMake(value)
        break
      case 'model':
        setModel(value)
        break
      case 'price':
        setPrice(value)
        break
      case 'person':
        setPersonId(value)
        break
      default:
        break
    }
  }

  return (
    <Form
      form={form}
      name='update-contact-form'
      layout='inline'
      onFinish={onFinish}
      size='large'
      initialValues={{
        year: year,
        make: make,
        model: model,
        price: price,
        personId: personId
      }}
    >
      <Form.Item
      label= 'Year'
      name='year'
      rules={[{ required: true, message: 'Please input your first name!' }]}
      >
        <Input
          placeholder='Year'
          onChange={e => updateStateVariable('year', e.target.value)}
        />
      </Form.Item>
      <Form.Item
        label= 'Make'
        name='make'
        rules={[{ required: true, message: 'Please input your last name!' }]}
      >
        <Input
          placeholder='Make'
          onChange={e => updateStateVariable('make', e.target.value)}
        />
      </Form.Item>
      <Form.Item
          label='Model'
          name='model'
          rules={[{ required: true, message: 'Please input the model!' }]}
        >
          <Input placeholder='Model'
          onChange={e => updateStateVariable('model', e.target.value)} />
        </Form.Item>
        <Form.Item
          label='Price'
          name='price'
          rules={[{ required: true, message: 'Please input the price!' }]}
        >
          <InputNumber
          min={0}
            formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
            onChange={e => updateStateVariable('price', e.target.value)}
          />
        </Form.Item>
        <Form.Item
          label='Person'
          name='person'
          rules={[{ required: true, message: 'Please select the person!' }]}
        >
          <Select placeholder="Select a person">
            {data? data.contacts.map((person) => (
                  <Option key={person.id} value={String(person.id)}>
                    {person.firstName} {person.lastName}
                  </Option>
                ))
              : null}
              onChange={e => updateStateVariable('person', e.target.value)}
          </Select>
        </Form.Item>
      <Form.Item shouldUpdate={true}>
        {() => (
          <Button
            type='primary'
            htmlType='submit'
            disabled={
              (!form.isFieldTouched('firstName') && !form.isFieldTouched('lastName')) ||
              form.getFieldsError().filter(({ errors }) => errors.length).length
            }
          >
            Update Contact
          </Button>
        )}
      </Form.Item>
      <Button onClick={props.onButtonClick}>Cancel</Button>
    </Form>
  )
}

export default UpdateCar