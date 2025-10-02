import React from 'react'
import Button from '../components/elements/Button'
import { useNavigate } from 'react-router-dom'
import { useNotification } from '../contexts/NotificationContext';
import { useSocket } from '../contexts/SocketAuth';
export default function HomePage() {
  const navigate = useNavigate();
  const { showNotification } = useNotification();

  const { socket } = useSocket();
  
  // Everything OK Now it's time to API
  return (
    <div className='flex h-screen w-full items-center justify-center'>
      <div className="flex flex-col items-center w-[80%] justify-center gap-8">
        <p className="title font-bold text-7xl text-center">Where Conversations Become Decisions</p>
        <p className="description text-neutral-800 text-lg text-center">Empower your audience with interactive polls that capture voices, spark discussions, and deliver live results—together, in one place.</p>

        <div className="controls flex gap-10 items-center">
          <Button text={"Get Started"} onClick={() => { navigate("/login") }} />
          <Button text={"Explore More"} secondary onClick={() => { }} />
        </div>
      </div>
    </div>
  )
}