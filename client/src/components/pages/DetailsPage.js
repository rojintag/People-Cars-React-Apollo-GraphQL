import { EditOutlined } from "@ant-design/icons"
import { useQuery } from "@apollo/client"
import { Button, Card, List } from "antd"
import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import { DETAILS_PERSON } from "../../queries"
import RemoveContact from "../buttons/RemoveContact"
import UpdateContact from "../forms/UpdateContact"
import CarInfo from "../listItems/CarInfo"

const getStyles = () => ({
  card: {
    width: '500px'
  }
})
const DetailsPage = (props) => {
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

  const { id } = useParams();
  const { data, loading, error } = useQuery(DETAILS_PERSON, {
    variables: { id: id },
  });

  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`


  return (
    <div style={{display: 'flex',flexDirection:'column', alignItems: 'center'}}>
      <h2 style={{fontSize: '3rem', color: '#a9a9a9'}}>{data.contact.firstName}{data.contact.lastName}</h2>
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
          style={{width: "700px", display: "flex", flexDirection: "column", alignItems: "center"}}
          actions={[
            <EditOutlined key='edit' onClick={handleButtonClick} />,
            <RemoveContact id={id} />
          ]}
        >
          {firstName} {lastName}
          <List grid={{ gutter: 20, column: 1 }} style={styles.list}>
      {data?.personCars.map(({ id, year, make, model, price }) => (
        <List.Item key={id}>
          <CarInfo key={id} id={id} year={year} make={make} model={model} price={price} />
        </List.Item>
      ))}
    </List>
        </Card>
      )}
    <Link to="/">
        <Button
          type="primary"
          style={{
            borderRadius: "5px",
            padding: "10px 15px",
            backgroundColor: "black",
            color: "white",
            alignItems: "center",
            justifyContent: "center",
            height: "40px",
            margin: "2rem"
          }}
        >
          Go Back Home
        </Button>
      </Link>
    </div>
  )
}

export default DetailsPage
     