'use client'
import { useRouter } from 'next/navigation';
import React from 'react';
import Form from './form';
import BackButton from '@/components/auth/backbutton';

const Register: React.FC = () => {
     const router = useRouter()

     const handleBackClick = () => {
      router.push('/')
     }

  return (
    <div className='bgimage '>
      <BackButton
        onClick={handleBackClick}
        className="text-white font-extrabold"
      />
      <div className='flex justify-center items-center mt-[40%] md:mt-[14%] '>
        <Form />
      </div>
    </div>
  );
};

export default Register;
