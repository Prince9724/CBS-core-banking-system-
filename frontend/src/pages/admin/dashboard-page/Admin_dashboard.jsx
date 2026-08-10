import React from 'react'
import Admin_Sidebar from '../../../Admin-component/Admin_Sidebar'
import "./admin_dashboard.css"
import Home from './Home'
import Branch from '../branch-page/Branch'
export default function Admin_dashboard() {
  return (
    <>
        <div className='d-flex layout'>
            <Admin_Sidebar className="sidebar" />
            <div className='right-content mt-4 pe-3'>
              <Home/>
              {/* <Branch/> */}
            </div>
        </div>
    </>
  )
}