'use client'
import { useState } from 'react'
import { UserIcon, UserGroupIcon } from '@heroicons/react/24/solid';
import emailjs from '@emailjs/browser';


export default function PreRegisterForm() {
    const open = true

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        identification: '',
        gender: '',
        schoolLevel: 'Maktab',
        parentName: '',
        parentLastName: '',
        parentIdentification: '',
        parentEmail: '',
        parentCellphone: '',
        attachment: null,
    })

    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')

    const handleChange = (e) => {

        const { name, value, files } = e.target

        setFormData({
            ...formData,
            [name]: files ? files[0] : value,
        })

    }

    const handleSubmit = async (e) => {

        e.preventDefault()
        setLoading(true)
        setMessage('')

        const formDataToSend = new FormData();
        Object.keys(formData).forEach((key) => {
            if (key === 'attachment' && !formData.attachment) {
                // Skip appending the attachment field if no file is provided
                return;
            }
            formDataToSend.append(key, formData[key]);
        });

        // Validate the form data
        // const { error, value } = formSchema.validate(formData, { abortEarly: false });
        // if (error) {
        //     setMessage(error.details.map(e => e.message).join(', '));
        //     setLoading(false);
        //     return;
        // }

        try {

            //  option 2

            const response = await fetch('/api/preRegister', {
                method: 'POST',
                body: formDataToSend,
            });

            const result = await response.json();
            if (response.ok) {

                // enviar correo con notificacion de registro
                const templateParams = {
                    from_name: `${formData.firstName} ${formData.lastName}`,
                    from_email: formData.parentEmail,
                    message: `
                            Nueva Matrícula Registrada en el Sistema:

                            📌 Datos del Estudiante:
                            - Nombre: ${formData.firstName} ${formData.lastName}
                            - Identificación: ${formData.identification}
                            - Sexo: ${formData.gender}
                            - Nivel Escolaridad 2025: ${formData.schoolLevel}

                            👨‍👩‍👧 Datos del Acudiente:
                            - Nombre: ${formData.parentName} ${formData.parentLastName}
                            - Identificación: ${formData.parentIdentification}
                            - Email: ${formData.parentEmail}
                            - Celular: ${formData.parentCellphone}
                            `,
                }
                const serviceID = 'service_t9lsqik';
                const templateID = 'template_7frcfrh';
                const userID = 'etnkFFSzzkczK63iL';

                await emailjs.send(serviceID, templateID, templateParams, userID);

                // reestablecer formulario
                setFormData({
                    firstName: '',
                    lastName: '',
                    identification: '',
                    gender: 'Masculino',
                    schoolLevel: 'Maktab',
                    parentName: '',
                    parentLastName: '',
                    parentIdentification: '',
                    parentEmail: '',
                    parentCellphone: '',
                    attachment: null, // change to see if eliminate the attahcment after it is sent
                });

                document.getElementById('fileInput').value = ''; // Reset file input
                setMessage('Formulario Registrado Exitosamente!!');


            } else {
                setMessage(result.message || 'Error al registrar');
            }


        } catch (error) {
            console.error(error)
            setMessage('Error al registrar')
        }

        setLoading(false)
    }


    return (
        <div className="max-w-7xl mx-auto px-4 mt-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto p-3 rounded-xl bg-white bg-clip-border shadow-md border-slate-300 border-2">
                {message && (
                    <p className={`mt-2 text-center ${message.includes('Exitosamente') ? 'text-black bg-green-500 p-2 rounded-2xl' : 'text-black bg-red-300 p-2 rounded-2xl'}`}>
                        {message}
                    </p>
                )}
                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <label htmlFor="firstName" className="block dark:text-white text-sm font-medium text-gray-700"><UserIcon className='h-4 w-4 inline-block mx-2 text-gray-400' />Primer Nombre</label>
                            <input disabled={!open} type="text" placeholder="Primer Nombre" name="firstName" id="firstName" value={formData.firstName} onChange={handleChange} required className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm p-2 border-2 border-gray-300 rounded-md" />
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="lastName" className="block dark:text-white text-sm font-medium text-gray-700"><UserIcon className='h-4 w-4 inline-block mx-2 text-gray-400' />Apellido</label>
                            <input disabled={!open} type="text" placeholder="Primer Nombre" name="lastName" id="lastName" value={formData.lastName} onChange={handleChange} required className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm p-2 border-2 border-gray-300 rounded-md" />
                        </div>

                        <div className="sm:col-span-6">
                            <label htmlFor="identification" className="block dark:text-white text-sm font-medium text-gray-700"><UserIcon className='h-4 w-4 inline-block mx-2 text-gray-400' />Identificación o Cédula</label>
                            <input disabled={!open} type="text" placeholder="Identificación o Cédula" name="identification" id="identification" value={formData.identification} onChange={handleChange} required className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm p-2 border-2 border-gray-300 rounded-md" />
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="gender" className="block dark:text-white text-sm font-medium text-gray-700"><UserIcon className='h-4 w-4 inline-block mx-2 text-gray-400' />Sexo</label>
                            <select disabled={!open} id="gender" name="gender" placeholder="Sexo" value={formData.gender} onChange={handleChange} required className="mt-1 block w-full py-2 px-3 border dark:bg-black border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500  sm:text-sm" >
                                <option disabled defaultValue value="">Masculino</option>
                                <option value="Masculino">Masculino</option>
                            </select>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="schoolLevel" className="block dark:text-white text-sm font-medium text-gray-700"><UserIcon className='h-4 w-4 inline-block mx-2 text-gray-400' />Nivel de Escolaridad 2025</label>
                            <select disabled={!open} id="schoolLevel" name="schoolLevel" placeholder="Nivel de Escolaridad 2025" value={formData.schoolLevel} onChange={handleChange} required className="mt-1 dark:bg-black block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                                <option value="Maktab" defaultValue>Maktab</option>
                                <option value="Hifz"> Hifz</option>
                                <option value="Alimiyyah">Alimiyyah</option>
                            </select>
                        </div>
                        <div className="sm:col-span-6 border-slate-800 border-1">
                            <hr />
                        </div>
                        <div className="sm:col-span-3">
                            <label htmlFor="parentName" className="block dark:text-white text-sm font-medium text-gray-700"> <UserGroupIcon className='h-4 w-4 inline-block mx-2 text-gray-400' /> Nombre del Acudiente</label>
                            <input disabled={!open} type="text" name="parentName" id="parentName" placeholder="Nombre de Acudiente" value={formData.parentName} onChange={handleChange} required className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm p-2 border-2 border-gray-300 rounded-md" />
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="parentLastName" className="block dark:text-white text-sm font-medium text-gray-700"><UserGroupIcon className='h-4 w-4 inline-block mx-2 text-gray-400' /> Apellido del Acudiente</label>
                            <input disabled={!open} type="text" name="parentLastName" id="parentLastName" placeholder="Apellido del Acudiente" value={formData.parentLastName} onChange={handleChange} required className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm p-2 border-2 border-gray-300 rounded-md" />
                        </div>

                        <div className="sm:col-span-6">
                            <label htmlFor="parentIdentification" className="block dark:text-white text-sm font-medium text-gray-700"><UserGroupIcon className='h-4 w-4 inline-block mx-2 text-gray-400' /> Identificación del Acudiente</label>
                            <input disabled={!open} type="text" name="parentIdentification" id="parentIdentification" placeholder="identificación del Acudiente" value={formData.parentIdentification} onChange={handleChange} required className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm p-2 border-2 border-gray-300 rounded-md" />
                        </div>

                        <div className="sm:col-span-6">
                            <label htmlFor="parentEmail" className="block text-sm dark:text-white font-medium text-gray-700"><UserGroupIcon className='h-4 w-4 inline-block mx-2 text-gray-400' /> Email del Acudiente</label>
                            <input disabled={!open} type="email" name="parentEmail" id="parentEmail" placeholder="Email del Acudiente" value={formData.parentEmail} onChange={handleChange} required className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm p-2 border-2 border-gray-300 rounded-md" />
                        </div>

                        <div className="sm:col-span-6">
                            <label htmlFor="parentCellphone" className="block text-sm  dark:text-white font-medium text-gray-700"><UserGroupIcon className='h-4 w-4 inline-block mx-2 text-gray-400' /> Celular del Acudiente</label>
                            <input disabled={!open} type="text" name="parentCellphone" id="parentCellphone" placeholder="Celular del Acudiente" value={formData.parentCellphone} onChange={handleChange} required className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm p-2 border-2 border-gray-300 rounded-md" />
                        </div>
                        <div className="sm:col-span-6">
                            <label htmlFor="attachment" className="block text-sm  dark:text-white font-medium text-gray-700">Adjunto</label>
                            <input id="fileInput" disabled={!open} type="file" name="attachment" onChange={handleChange} />
                        </div>
                        <div className="sm:col-span-6">
                            <button type="submit" disabled={loading || !open} className="w-full bg-blue-500 text-white py-2 px-4 rounded-md">
                                {loading ? 'Submitting...' : 'Submit'}
                            </button>
                        </div>
                    </div>
                    {message && (
                        <p className={`mt-2 text-center ${message.includes('Exitosamente') ? 'text-black bg-green-500 p-2 rounded-2xl' : 'text-black bg-red-300 p-2 rounded-2xl'}`}>
                            {message}
                        </p>
                    )}
                </form >
            </div>
        </div>
    )
}


