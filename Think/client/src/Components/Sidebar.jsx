import React, { useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import moment from 'moment'
// import { Navigate } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.svg';



const Sidebar = ({ isMenuOpen, setIsMenuOpen }) => {

  const navigate = useNavigate();
  const { chats, setSelectedchat, theme, setTheme, user } = useAppContext()
  // console.log("Chats from context:", chats);

  const [search, setSearch] = useState("")

  return (
    <div
      className={`flex flex-col min-w-72 p-5 
    dark:bg-gradient-to-b from-[#242124]/30 to-[#000000]/30 
    border-r border-[#80609F]/30 backdrop-blue-3xl 
    transition-all duration-500 max-md:absolute left-0 z-10 
    ${!isMenuOpen && 'max-md:-translate-x-full'}
    h-screen overflow-y-auto`}>


     <div className="flex items-center gap-2 text-white text-4xl font-bold py-2 px-3 rounded-lg shadow-lg transition duration-300 hover:shadow-blue-500/50">

  <img
    src={logo}
    alt="Logo"
    className="w-10 h-10" // adjust size as needed
  />
  <span>THING</span>
</div>


      {/* button*/}

      <button className='flex justify-center items-center w-full py-2 mt-10 text-white bg-gradient-to-r from-[#A456F7] to-[#3D81F6] text-sm rounded-md cursor-pointer'>
        <span className='mr-2 text-xl '> + </span>New Chat
      </button>


      {/* search Converstion*/}
      <div className='flex items-center gap-2 p-3 mt-4 border border-gray-400 dark:border-white/20 rounded-md'>
        <img src={assets.search_icon} className="w-4 dark:invert" alt="" />
        <input onChange={(e) => setSearch(e.target.value)} value={search} type=" text" placeholder='Search chats... ' className='text-xs placeholder:text-gray-400 outline-none' />

      </div>

      {  /* recent chat*/}
      {chats.length > 0 && <p className='mt-4 text-sm'>Recent Chats</p>}

      <div className='space-y-2 mt-2' >
        {chats
          .filter((chat) => {
            if (!chat) return false;

            const searchText = search.toLowerCase();

            if (chat.messages?.[0]?.content) {
              return chat.messages[0].content.toLowerCase().includes(searchText);
            }

            return chat.name?.toLowerCase().includes(searchText);
          })
          .map((chat) => (
            <div onClick={() => { navigate('/'); setSelectedchat(chat); setIsMenuOpen(false) }}
              key={chat._id} className='p-2 px-4 dark:bg-[#57317C]/10 border border-gray-300 dark:border-[#80609F]/15 rounded-md cursor-pointer flex justify-between group'
            >
              <div className='w-full'>
                <p className='truncate w-full'>
                  {chat.messages?.length > 0
                    ? chat.messages[0].content.slice(0, 23)
                    : chat.name}
                </p>
                <p className='text-xs text-gray-500 dark:text-[#B1A6C0]'>
                  {moment(chat.updatedAt).fromNow()}
                </p>
              </div>
              <img
                src={assets.bin_icon}
                className='hidden group-hover:block w-4 cursor-pointer light:invert'
                alt="Delete"
              />
            </div>
          ))}
      </div>

      {/* community Images */}

      <div onClick={() => { navigate("/community"); setIsMenuOpen(false) }} className='flex items-center gap-2 p-3 mt-20 border border-gray-300 dark:border-white rounded-md cursor-pointer hover:scale-105 transition-all'>
        <img src={assets.gallery_icon} className='w-4.5 light:invert' alt="" />
        <div className='flex flex-col text-sm'>
          <p>Community Image</p>
        </div>
      </div>

      {/* Credit puschase option */}

      <div onClick={() => { navigate("/credits"); setIsMenuOpen(false) }} className='flex items-center gap-2 p-3 mt-4 border border-gray-300 dark:border-white/15 rounded-md cursor-pointer hover:scale-105 transition-all'>
        <img src={assets.diamond_icon} className='w-4.5 dark:invert' alt="" />
        <div className='flex flex-col text-sm'>
          <p>Credits : {user?.credits}</p>
          <p className=' text-xs text-gray-400'>Purchase credits to use Thing</p>
        </div>
      </div>

    

      {/*  user account */}

      <div className='flex items-center gap-3 p-3 mt-4 border border-gray-300 dark:border-white rounded-md cursor-pointer group'>
        <img src={assets.user_icon} className='w-7 rounded-full' alt="" />
        <p className='flex-1 text-sm dark:text-primary truncate'> {user ? user.name : ' login your account '}</p>
        {user && <img src={assets.logout_icon} className=' h-5 cursor-pointer hidden  light:invert group-hover:block' />}
      </div>


      <img onClick={() => setIsMenuOpen(false)} src={assets.close_icon} className='absolute top-3 right-3 w-5 h-5  cursor-pointer md:hidden light:invert' alt="" />



    </div>

  )
}



export default Sidebar


