import Navbar from '../../components/navbar/Navbar.jsx'
import { Outlet } from 'react-router-dom'
import Filters from "../../components/Filters/Filters";



function Root() {
  return (
    <div>
      <Navbar/>
      <Filters/>

      <Outlet/>
    </div>
  )
}

export default Root
