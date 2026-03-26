import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Signin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    async function handleSignin() {
        try {
            const response = await axios.post('http://localhost:3000/api/v1/user/signin', {
                username,
                password,
            });
            localStorage.setItem('token', response.data.token);
            console.log(response.data.token);
            navigate('/dashboard');
        } catch (err) {
            console.error('Signin error:', err);
            alert('Signin failed — check your inputs ');
        }
    }

    return (
        <div className='flex justify-center items-center min-h-screen bg-gray-900'>
            <div className='bg-gray-800 rounded-lg p-8 w-96 shadow-lg'>
                <h1 className='text-2xl font-bold text-white text-center mb-2'>Sign In</h1>
                <p className='text-gray-400 text-center text-sm mb-6'>
                    Enter your information to log into existing account
                </p>

                <label className='block text-gray-300 text-sm mb-1'>Email</label>
                <input
                    className='w-full p-2 mb-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500'
                    type='text'
                    placeholder='john@email.com'
                    onChange={(e) => setUsername(e.target.value)}
                />

                <label className='block text-gray-300 text-sm mb-1'>Password</label>
                <input
                    className='w-full p-2 mb-6 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500'
                    type='password'
                    placeholder='••••••'
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    onClick={handleSignin}
                    className='w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition-colors'
                >
                    Sign In
                </button>

                <p className='text-gray-400 text-sm text-center mt-4'>
                    Dont have an Account ?{' '}
                    <span
                        className='text-blue-400 cursor-pointer hover:underline'
                        onClick={() => navigate('/signup')}
                    >
                        Sign in
                    </span>
                </p>
            </div>
        </div>
    );
}
