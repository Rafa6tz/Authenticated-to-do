// src/pages/Login.tsx
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/login', form);
      localStorage.setItem('token', res.data.token);
      alert('Login bem-sucedido!');
      navigate('/');
    } catch (err) {
      alert('Erro no login');
    }
  };

  return (
    <div className='flex justify-center items-center w-full h-screen'>
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-90 mx-auto mt-10 bg-gray-100 rounded-2xl p-4">
      <div className='flex flex-col m-1'>
      <label className='text-lg' htmlFor='email'>E-mail: </label>
      <input name="email" placeholder="Email" className="border p-2 rounded-xl border-gray-600" onChange={handleChange} required/>
      </div>
      <div className='flex flex-col m-1'>
      <label className='text-lg' htmlFor='password'>Senha:</label>
      <input type="password" name="password" placeholder="Senha" className="border p-2 rounded-xl border-gray-600" required onChange={handleChange} />
      </div>
      <button className="bg-gray-500 cursor-pointer rounded-3xl hover:bg-gray-700 text-white py-2">Entrar</button>
    </form>
    </div>
  );
}
