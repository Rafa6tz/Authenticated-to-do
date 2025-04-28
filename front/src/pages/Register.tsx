// src/pages/Register.tsx
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/register', form);
      navigate('/login')
      alert('Usuário cadastrado com sucesso!');
    } catch (err) {
      alert('Erro ao cadastrar');
    }
  };

  return (
    <div className='flex justify-center items-center w-full h-screen'>
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-90 mx-auto mt-10 bg-gray-100 rounded-2xl p-4">
      <div className='flex flex-col m-1'>
        <label className='text-lg' htmlFor='name'>Nome: </label>
        <input name="name" placeholder="Nome" className="border p-2 rounded-xl border-gray-600" onChange={handleChange} required/>
      </div>
      <div className='flex flex-col m-1'>
        <label className='text-lg' htmlFor='email'>E-mail: </label>
        <input name="email" placeholder="Email" className="border p-2 rounded-xl border-gray-600" onChange={handleChange} required/>
      </div>
      <div className='flex flex-col m-1'>
        <label className='text-lg' htmlFor='password'>Senha: </label>
        <input type="password" name="password" placeholder="Senha" className="border p-2 rounded-xl border-gray-600" onChange={handleChange} required/>
      </div>
      <button className="bg-green-500 cursor-pointer rounded-3xl hover:bg-green-700 text-white py-2">Cadastrar</button>
    </form>
    </div>
  );
}
