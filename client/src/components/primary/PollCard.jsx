import React from 'react'
import { useNavigate } from 'react-router-dom'

function PollCard({ item }) {
  
  const navigate = useNavigate();

  return (
    <div className='flex cursor-pointer flex-col gap-3 p-5 bg-neutral-200 rounded-xl' onClick={() => {navigate(`/dashboard/polls/${item._id}`) }}>
      <div className='flex gap-5 justify-between'>
        <p className="title text-xl font-bold">{item?.name}</p>
        {/* {item?.creator === U} */}
        {/* <span className='text-sm text-neutral-800 font-semibold'>{item?.createdBy?.name}</span> */}
        {/* Terneary operation in future */}
        <span className='bg-primary px-6 py-2 rounded-md text-sm text-white font-semibold'>My Poll</span>
      </div>
      <div className=''>
        <p className="text-neutral-800 text-md">
          {item?.question}
        </p>
      </div>
      <div className="flex justify-between items-center">
        <span>{item?.votesCount}</span>
        <span>{item?.status}</span>
      </div>

    </div>
  )
}

export default PollCard
