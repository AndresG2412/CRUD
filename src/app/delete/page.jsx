"use client";

// el delete que es para eliminar la cuenta del usuario solo se puede hacer un admin 
// manualmente deberia actualizar la contraseña de un usuario en firebase

import React from 'react'

import { useState } from 'react';

export default function page() {

    const [data, setData] = useState({
        correo: "",
    }); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    const verificacion = (e) => {
        e.preventDefault(); // evita que recargue la página
        console.log('Datos del formulario:', data);
    }

    return (
        <div className='w-screen h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500'>
            <form onSubmit={verificacion} className='flex flex-col gap-4 p-4 md:w-1/3 w-3/4 bg-black/40 backdrop-blur-md rounded-lg shadow-lg'>
                <p className='text-3xl tracking-wider font-semibold text-center uppercase'>Eliminar Cuenta</p>

                <div className='flex flex-col gap-1'>
                    <label htmlFor="" className='tracking-wider font-semibold'>Correo Electronico:</label>
                    <input name="correo" value={data.correo} onChange={handleChange} type="email" required className='border-1 border-white rounded pl-2 py-1 text-xl'/>
                </div>

                <button type='submit' className='hover:bg-blue-700 transition-all duration-300 rounded font-semibold tracking-wider text-xl py-2 bg-blue-500 uppercase w-2/3 mx-auto'>
                    Eliminar
                </button>
            
                <div className='flex flex-col gap-2 text-center mt-4'>
                    <p className='font-semibold tracking-wide text-lg hover:text-red-500'><a href="../">¿Ya tienes una cuenta?</a></p>
                    <p className='font-semibold tracking-wide text-lg hover:text-green-500'><a href="../register">¿No tienes una cuenta?</a></p>
                </div>
            </form>
        </div>
    )
}
