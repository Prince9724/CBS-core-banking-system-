import React from 'react'
import ReportsHeader from './ReportsHeader'
import BranchPerformanceSummary from './BranchPerformanceSummary'
import TopBranchesDeposits from './TopBranchesDeposits'
import PortfolioCard from './PortfolioCard'
import Searchfilter from './Searchfilter'

export default function Reports() {
  return (
    <>
       <div>
           <div>
            <ReportsHeader/>
           </div>
           <div>
            <Searchfilter/>
           </div>
           <div>
            <BranchPerformanceSummary/>
           </div>
           <div>
            <TopBranchesDeposits/>
           </div>
           <div>
            <PortfolioCard/>
           </div>
       </div>
    </>
  )
}
