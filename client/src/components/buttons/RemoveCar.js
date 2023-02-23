import { DeleteOutlined } from '@ant-design/icons'
import { useMutation } from '@apollo/client'
import { PERSON_CARS, REMOVE_CAR } from '../../queries'

import filter from 'lodash.filter'

const RemoveCar = ({ id }) => {
  const [removeCar] = useMutation(REMOVE_CAR, {
    update(cache, { data: { removeCar } }) {
      const { cars } = cache.readQuery({ query: PERSON_CARS })
      cache.writeQuery({
        query: PERSON_CARS,
        data: {
          contacts: filter(cars, c => {
            return c.id !== removeCar.id
          })
        }
      })
    }
  })

  const handleButtonClick = () => {
    let result = window.confirm('Are you sure you want to delete this car?')

    if (result) {
      removeCar({
        variables: {
          id
        }
      })
    }
  }

  return <DeleteOutlined key='delete' style={{ color: 'red' }} onClick={handleButtonClick} />
}

export default RemoveCar