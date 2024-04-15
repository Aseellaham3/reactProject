import React from 'react'
import Navbar from '../../components/navbar/Navbar.jsx'

import { Outlet } from 'react-router-dom'



function Root() {
  return (
    <div>
      <Navbar/>
      <Outlet/>
    </div>
  )
}

export default Root
