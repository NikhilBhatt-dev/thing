import React, { useEffect, useState } from 'react'
import { dummyChats, dummyPlans } from '../assets/assets'
import Loading from './Loading'

const Credit = () => {
  const [plans, setPlans] = useState ([])
  const[loading, setLoading] = useState(true)

  const fetchplans =async function () => {
    setPlans(dummyPlans)
    setLoading(false)
    
  }
  useEffect(()=>{
    fetchplans()
  },[])
  if(loading) return <Loading />

  return (
    <div className='max-w-7xl h-sceen overflow-y-scroll mx-auto px-4 sm:px-6 lg:px-8 py-12'>
      <h2 className='text-3xl font-semibold text-center mb-10 xl:mt-30 text-gray-800 dark:text-white'>
        Credit Plans</h2>
        <div>
          {plans}
        </div>
        </div>
  )
}






  ////////////////////////1:59



export default Credit