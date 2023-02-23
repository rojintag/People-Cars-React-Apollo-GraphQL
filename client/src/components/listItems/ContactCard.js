import { Card, List } from 'antd'

import { EditOutlined } from '@ant-design/icons'
import RemoveContact from '../buttons/RemoveContact'
import { useState } from 'react'
import UpdateContact from '../forms/UpdateContact'
import CarCard from './CarCard'
import { GET_CARS, PERSON_CARS } from '../../queries'
import { useQuery } from '@apollo/client'

const getStyles = () => ({
  card: {
    width: '500px'
  }
})

const ContactCard = props => {
  const [id] = useState(props.id)
  const [firstName, setFirstName] = useState(props.firstName)
  const [lastName, setLastName] = useState(props.lastName)
  const [editMode, setEditMode] = useState(false)

  const styles = getStyles()

  const handleButtonClick = () => {
    setEditMode(!editMode)
  }

  const updateStateVariable = (variable, value) => {
    switch (variable) {
      case 'firstName':
        setFirstName(value)
        break
      case 'lastName':
        setLastName(value)
        break
      default:
        break
    }
  }
  const { loading, error, data } = useQuery(PERSON_CARS, {
    variables: { personId: id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>`${error.message}`</p>;

  console.log("person cars", data.personCars);

  return (
    <div>
      {editMode ? (
        <UpdateContact
          id={props.id}
          firstName={props.firstName}
          lastName={props.lastName}
          onButtonClick={handleButtonClick}
          updateStateVariable={updateStateVariable}
        />
      ) : (
        <Card
          style={styles.card}
          actions={[
            <EditOutlined key='edit' onClick={handleButtonClick} />,
            <RemoveContact id={id} />
          ]}
        >
          {firstName} {lastName}
          <List grid={{ gutter: 20, column: 1 }} style={styles.list}>
      {data?.personCars.map(({ id, year, make, model, price }) => (
        <List.Item key={id}>
          <CarCard key={id} id={id} year={year} make={make} model={model} price={price} />
        </List.Item>
      ))}
    </List>
        </Card>
      )}
    </div>
  )
}

export default ContactCard