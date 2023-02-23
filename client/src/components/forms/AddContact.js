import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { Button, Form, Input } from 'antd'
import { useMutation } from '@apollo/client'
import { ADD_CONTACT, GET_CONTACTS } from '../../queries'

const AddContact = () => {
  const [id] = useState(uuidv4())
  const [addContact] = useMutation(ADD_CONTACT)

  const [form] = Form.useForm()
  const [, forceUpdate] = useState()

  useEffect(() => {
    forceUpdate([])
  }, [])

  const onFinish = values => {
    const { firstName, lastName } = values

    addContact({
      variables: {
        id,
        firstName,
        lastName
      },
      update: (cache, { data: { addContact } }) => {
        const data = cache.readQuery({ query: GET_CONTACTS })
        cache.writeQuery({
          query: GET_CONTACTS,
          data: {
            ...data,
            contacts: [...data.contacts, addContact]
          }
        })
      }
    })
  }

  return (
    <div style={{position: 'relative'}}>
      <h1 style ={{backgroundColor: 'white', position: 'absolute', top: '-20px', left: '45%', padding: '0 .5rem'}}>Add Person</h1>
      <Form
        name='add-contact-form'
        form={form}
        layout='inline'
        onFinish={onFinish}
        size='large'
        style={{ marginBottom: '40px', display: 'flex', justifyContent: 'center', borderTop: '1px solid #f2f2f2', paddingTop: '3rem' }}
      >
        <Form.Item
          label='First Name'
          name='firstName'
          rules={[{ required: true, message: 'Please input your first name!' }]}
        >
          <Input placeholder='FirstName' />
        </Form.Item>
        <Form.Item
          label= 'Last Name'
          name='lastName'
          rules={[{ required: true, message: 'Please input your last name!' }]}
        >
          <Input placeholder='LastName' />
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
              Add Contact
            </Button>
          )}
        </Form.Item>
      </Form>
    </div>
  )
}

export default AddContact