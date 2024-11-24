import React from 'react'
import { HashLoader } from "react-spinners";


const loading = () => {
  return (
    <div>
       <div className="flex items-center justify-center h-screen bg-secondary">
        <HashLoader color="#facc15" size={60} />
      </div>
    </div>
  )
}

export default loading
