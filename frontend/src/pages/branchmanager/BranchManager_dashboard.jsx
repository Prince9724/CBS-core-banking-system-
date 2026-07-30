import BranchManager from "../../branchManager-componet/BranchManager_Sidebar"
import Home from "./Home"
export default function BranchManager_dashboard() {
  return (
    <div className='d-flex'>
        <BranchManager className="sidebar" />
        <div className="right-content mt-4">
            <Home/>
        </div>
    </div>
  )
}
