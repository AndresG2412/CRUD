"use client";

import React from 'react';

import { useState } from 'react';

//llamado de la base de datos y autenticacion e inicio de seccion en firebase
//createUserWithEmailAndPassword ya es una funcion, va en verificacion
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"; 
import { db } from "@/libs/firebase";

//redireccionar a la pagina de inicio de seccion
import { useRouter } from 'next/navigation';

export default function Home() { //Read component of CRUD
    
    //redireccionar a la pagina de inicio de seccion
    const router = useRouter();

    const auth = getAuth();

    const [data, setData] = useState({
        correo: "",
        contraseña: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const verificacion = (e) => {
        e.preventDefault(); // evita que recargue la página
        setErrorMsg(""); // Limpiar error anterior
        console.log('Datos del formulario:', data);

        signInWithEmailAndPassword(auth, data.correo, data.contraseña)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log('Usuario autenticado:', user);
                router.push("/home");
                alert('Inicio de sesión exitoso');
                // Aquí puedes redirigir al usuario a otra página o realizar otras acciones
            })
            .catch((error) => {
                const errorCode = error.code;

                if (errorCode === "auth/user-not-found") {
                    setErrorMsg("El correo no está registrado.");
                } else if (errorCode === "auth/wrong-password") {
                    setErrorMsg("La contraseña es incorrecta.");
                } else {
                    setErrorMsg("Ocurrió un error. Intenta nuevamente.");
                }

                console.log(`Error ${errorCode}: ${error.message}`);
            });
    };

    return (
        <div className='w-screen h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500'>
            <form onSubmit={verificacion} className='flex flex-col gap-4 p-4 md:w-1/3 w-3/4 bg-black/40 backdrop-blur-md rounded-lg shadow-lg'>
                <p className='text-3xl tracking-wider font-semibold text-center uppercase'>Iniciar Seccion</p>
                <div className='flex flex-col gap-1'>
                    <label htmlFor="" className='tracking-wider font-semibold'>Correo Electronico:</label>
                    <input name='correo' value={data.correo} onChange={handleChange} type="email" required className='border-1 border-white rounded pl-2 py-1 text-xl'/>
                </div>
                
                <div className='flex flex-col gap-1'>
                    <label className='tracking-wider font-semibold'>Contraseña:</label>
                    <div className='relative'>
                        <input
                            name='contraseña'
                            value={data.contraseña}
                            onChange={handleChange}
                            type={showPassword ? "text" : "password"}
                            required
                            className='border-1 border-white rounded pl-2 py-1 text-xl w-full'
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className='absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-blue-200 hover:text-white'
                        >
                            {showPassword ? "Ocultar" : "Mostrar"}
                        </button>
                    </div>
                </div>

                {errorMsg && (
                    <p className='text-red-400 text-center text-sm font-semibold'>{errorMsg}</p>
                )}

                <button type='submit' className='hover:bg-blue-700 transition-all duration-300 rounded font-semibold tracking-wider text-xl py-2 bg-blue-500 uppercase w-2/3 mx-auto'>Ingresar</button>
            
                <div className='flex flex-col gap-2 text-center mt-4'>
                    <p className='font-semibold tracking-wide text-lg hover:text-red-500'><a href="./register">¿No tienes una cuenta?</a></p>
                </div>
            </form>
        </div>
    );
}
