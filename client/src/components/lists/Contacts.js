import { useQuery } from '@apollo/client'
import { List } from 'antd'
import { GET_CONTACTS } from '../../queries'
import Title from '../layout/Title'
import ContactCard from '../listItems/ContactCard'

const getStyles = () => ({
  list: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: "3rem"
  }
})

const Contacts = () => {
  const styles = getStyles()

  const { loading, error, data } = useQuery(GET_CONTACTS)

  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`

  return (
    <div style={{borderTop: '1px solid #f2f2f2'}}>
      <Title title={'Records'} />
      <List grid={{ gutter: 20, column: 1 }} style={styles.list}>
        {data.contacts.map(({ id, firstName, lastName }) => (
          <List.Item key={id}>
            <ContactCard key={id} id={id} firstName={firstName} lastName={lastName} />
          </List.Item>
        ))}
      </List>
    </div>
  )
}

export default Contacts