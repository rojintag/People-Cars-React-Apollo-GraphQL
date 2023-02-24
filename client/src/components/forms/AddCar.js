import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { Button, Form, Input, InputNumber, Select } from 'antd'
import { useMutation, useQuery } from '@apollo/client'
import { ADD_CAR, GET_CARS, GET_CONTACTS, PERSON_CARS} from '../../queries'
import Title from '../layout/Title'

const { Option } = Select;

const AddCar = () => {
  const [id, setId] = useState(uuidv4())
  const [addCar] = useMutation(ADD_CAR)
  const { data } = useQuery(GET_CONTACTS);

  const [form] = Form.useForm()
  const [, forceUpdate] = useState()

  useEffect(() => {
    forceUpdate([])
  }, [])

  const onFinish = (values) => {
    let { year, make, model, price, personId } = values;
    year = parseInt(year);
    price = parseInt(price);

    addCar({
      variables: {
        id,
        year,
        make,
        model,
        price,
        personId,
      },
      update: (cache, { data: { addCar } }) => {
        const data = cache.readQuery({ query: GET_CARS });
        if (data) {
          cache.writeQuery({
            query: GET_CARS,
            data: {
              cars: [...data.cars, addCar],
            },
          });
        }
      },
      awaitRefetchQueries: true,
      refetchQueries: [
        { query: PERSON_CARS, variables: { personId: personId } },
      ],
    });

    setId(uuidv4());
  };

  // console.log('length',data.contacts.length);
  
  return (
    <div>
      <Title title={'Add Car'} />
      <Form
        name='add-car-form'
        form={form}
        layout='inline'
        onFinish={onFinish}
        size='large'
        style={{ marginBottom: '40px', display: 'flex', justifyContent: 'center', borderTop: '1px solid #f2f2f2', paddingTop: '3rem' }}
      >
        <Form.Item
          label='Year'
          name='year'
          rules={[{ required: true, message: 'Please input the year!' }]}
        >
          <Input placeholder='Year' />
        </Form.Item>
        <Form.Item
          label='Make'
          name='make'
          rules={[{ required: true, message: 'Please input the make!' }]}
        >
          <Input placeholder='Make' />
        </Form.Item>
        <Form.Item
          label='Model'
          name='model'
          rules={[{ required: true, message: 'Please input the model!' }]}
        >
          <Input placeholder='Model' />
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

          />
        </Form.Item>
        <Form.Item
          label='PersonId'
          name='personId'
          rules={[{ required: true, message: 'Please select the person!' }]}
        >
        <Select placeholder="Select a person">
            {data
              ? data.contacts.map((person) => (
                  <Option key={person.id} value={String(person.id)}>
                    {person.firstName} {person.lastName}
                  </Option>
                ))
              : null}
          </Select>
        </Form.Item>

        <Form.Item shouldUpdate={true}>
          {() => (
            <Button
              type='primary'
              htmlType='submit'
              disabled={
                !form.isFieldsTouched(true) ||
                form.getFieldsError().filter(({ errors }) => errors.length).length
              }
            >
              Add Car
            </Button>
          )}
        </Form.Item>
      </Form>
    </div>
  )

}

export default AddCar