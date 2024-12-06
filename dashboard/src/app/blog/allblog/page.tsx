import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'
import DefaultLayout from '@/components/Layouts/DefaultLayout'
import TableOne from '@/components/Tables/TableOne'
import TableThree from '@/components/Tables/TableThree'
import TableTwo from '@/components/Tables/TableTwo'
import React from 'react'

const page = () => {
  return (
    <DefaultLayout>
    <Breadcrumb pageName="Tables" />

    <div className="flex flex-col gap-10">
      <TableOne />
      {/* <TableTwo /> */}
      {/* <TableThree /> */}
    </div>
  </DefaultLayout>
  )
}

export default page
