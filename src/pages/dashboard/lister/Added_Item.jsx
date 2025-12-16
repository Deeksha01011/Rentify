import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Added_Item = () => {

    const{user} = useSelector((state)=>state.profile)
  return (
    <div className='mt-5'>
        {
            user?.listed?.length ? (<div></div>):(<Link className='text-gray-200 bg-gray-800 mt-2 p-2 border rounded-md' to={"/dashboard/listitems"}>
            Add item <i class="ri-add-fill"></i>
            </Link>)
        }
      
    </div>
  )
}

export default Added_Item
