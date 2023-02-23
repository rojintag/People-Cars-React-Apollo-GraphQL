
import { Card } from 'antd'

import { EditOutlined } from '@ant-design/icons'
import RemoveCar from '../buttons/RemoveCar'
import { useState } from 'react'
import UpdateCar from '../forms/UpdateCar'

const getStyles = () => ({
  card: {
    width: '500px'
  }
})

const CarCard = props => {
  const [id] = useState(props.id)
  const [year, setYear] = useState(props.year)
  const [make, setMake] = useState(props.make)
  const [model, setModel] = useState(props.model)
  const [price, setPrice] = useState(props.price)
  const [personId, setPersonId] = useState(props.personId)
  const [editMode, setEditMode] = useState(false)

  const styles = getStyles()

  const handleButtonClick = () => {
    setEditMode(!editMode)
  }

  const updateStateVariable = (variable, value) => {
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
    <div>
      {editMode ? (
        <UpdateCar
        id={props.id}
        year={props.year}
        make={props.make}
        model={props.model}
        price={props.price}
        personId={props.personId}
          onButtonClick={handleButtonClick}
          updateStateVariable={updateStateVariable}
        />
      ) : (
        <Card
          style={styles.card}
          actions={[
            <EditOutlined key='edit' onClick={handleButtonClick} />,
            <RemoveCar id={id} />
          ]}
        >
          {year} {make} {model} {price}
        </Card>
      )}
    </div>
  )
}

export default CarCard