import React, { useEffect } from 'react'
import NavbarA from '../../../components/admin/navbarA/NavbarA'
import Graph from '../../../components/admin/dashboardgraph/Graph'
import Linegraph from '../../../components/admin/dashboardgraph/Linegraph'


function Dashboard() {
  useEffect(() => {
    
    document.title = "Dashboard | Talki";
  }, []);
  return (
    <div>
      <NavbarA/>
      <Graph />
      <Linegraph/>
    </div>
  )
}

export default Dashboard
