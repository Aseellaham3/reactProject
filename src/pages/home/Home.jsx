import React from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import style from "../../components/categories/Categories.module.css";
import Categories from '../../components/categories/Categories.jsx'

function home() {
  
  return (
    <>
      <Categories />

      </>

  )
}

export default home
