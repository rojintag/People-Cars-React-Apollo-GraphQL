import AddCar from "../forms/AddCar"
import AddContact from "../forms/AddContact"
import Contacts from "../lists/Contacts"

const HomePage = () => {
return(
  <div>
     <h1 style={{margin: '2rem', borderBottom: '1px solid #f2f2f2', paddingBottom: '1rem'}}>PEOPLE AND THEIR CARS</h1>
        <AddContact />
        <AddCar />
        <Contacts />
  </div>
)
}

export default HomePage