import { Outlet } from "react-router-dom"
import TellerSlideBar from "../teller-componet/TellerSlidebar"

export default function TellerLayout() {
  return (
    <div className="layout">
      <TellerSlideBar /> 
      
      <div className="right-content">
        <Outlet />
      </div>
    </div>
  )
}
