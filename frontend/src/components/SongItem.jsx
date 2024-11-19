import React, { useContext } from 'react'
import { PlayerContext } from '../context/PlayerContext'

const SongItem = ({name,image,desc,id}) => {

    const {playWithId} = useContext(PlayerContext)

  return (
    <div onClick={()=>playWithId(id)} className='w-[200px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]'>
      <img className='rounded-3xl w-[97%] p-2 ' src={image} alt="" />
      <p className='font-bold text-xl mt-2 mb-1 text-center'>{name}</p>
      <p className='text-slate-200 text-sm text-center'>{desc}</p>
    </div>
  )
}

export default SongItem
