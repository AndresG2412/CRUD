"use client";

import React from 'react'

//capturar los datos del formulario y registrar el usuario
import { useState } from 'react';
// 1. creamos un estado donde guardaremos los datos del formulario y las variables que capturaremos
// 2. creamos una funcion donde capturaremos los datos del formulario llamada "handleChange"
// 3. verificamos los datos, en este caso se llama "verificacion" con "e.preventDefault()" evitando que recargue la pagina
// 4. creamos los input con el "name" y "onChange" para capturar los datos del formulario
// 5. le asignamos al boton su tipo "submit" 
// 6. al formulario le asignamos la funcion "verificacion" para que se ejecute al hacer click en el boton

//importaciones para reistrar usuario, documentacion: https://firebase.google.com/docs/auth/web/password-auth?hl=es-419#web
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { db } from '@/libs/firebase';

export default function page() {

    const auth = getAuth();

    const [data, setData] = useState({
        nombre: "",
        correo: "",
        contraseña: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
        ...prevData,
        [name]: value,
        }));
    };

    const verificacion = (e) => {
        e.preventDefault(); // evita que recargue la página
        console.log('Datos del formulario:', data);

        createUserWithEmailAndPassword(auth, data.correo, data.contraseña)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log('Usuario registrado:', user);
                alert('Usuario registrado exitosamente');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error('Error al registrar usuario:', errorCode, errorMessage);
                alert('Error al registrar usuario: ' + errorMessage);
            });
    };

    return (
        <div className='w-screen h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500'>
            <form onSubmit={verificacion} action="" className='flex flex-col gap-4 p-4 md:w-1/3 w-3/4 bg-black/40 backdrop-blur-md rounded-lg shadow-lg'>
                <p className='text-3xl tracking-wider font-semibold text-center uppercase'>Registrar Cuenta</p>
                <div className='flex flex-col gap-1'>
                    <label htmlFor="" className='tracking-wider font-semibold'>Nombre Completo:</label>
                    <input type="text" name='nombre' value={data.nombre} onChange={handleChange} required className='border-1 border-white rounded pl-2 py-1 text-xl'/>
                </div>

                <div className='flex flex-col gap-1'>
                    <label htmlFor="" className='tracking-wider font-semibold'>Correo Electronico:</label>
                    <input type="email" name='correo' value={data.correo} onChange={handleChange} required className='border-1 border-white rounded pl-2 py-1 text-xl'/>
                </div>
                
                <div className='flex flex-col gap-1'>
                    <label htmlFor="" className='tracking-wider font-semibold'>Contraseña:</label>
                    <input type="password" name='contraseña' value={data.contraseña} onChange={handleChange} required className='border-1 border-white rounded pl-2 py-1 text-xl'/>
                </div>

                <button type="submit" className='hover:bg-blue-700 transition-all duration-300 rounded font-semibold tracking-wider text-xl py-2 bg-blue-500 uppercase w-2/3 mx-auto'>
                    Registrar
                </button>

                <div className='flex flex-col gap-2 text-center mt-4'>
                    <p className='font-semibold tracking-wide text-lg hover:text-red-500'><a href="../">¿Ya tienes una cuenta?</a></p>
                    <p className='font-semibold tracking-wide text-lg hover:text-green-500'><a href="../update">¿No recuerdas tu contraseña?</a></p>
                </div>
            </form>
        </div>
    )
}
