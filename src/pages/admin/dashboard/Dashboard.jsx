import React from 'react'
import NavbarA from '../../../components/admin/navbarA/NavbarA'
import Graph from '../../../components/admin/dashboardgraph/Graph'
import Linegraph from '../../../components/admin/dashboardgraph/Linegraph'


function Dashboard() {
  return (
    <div>
      <NavbarA/>
      <Graph />
      <Linegraph/>
    </div>
  )
}

export default Dashboard
