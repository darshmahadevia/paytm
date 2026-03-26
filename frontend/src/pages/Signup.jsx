import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Signup() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    async function handleSignup() {
        try {
            const response = await axios.post('http://localhost:3000/api/v1/user/signup', {
                firstName,
                lastName,
                username,
                password,
            });

            localStorage.setItem('token', response.data.token);
            navigate('/dashboard');
        } catch (err) {
            alert('Signup failed — check your inputs '
            );
        }
    }

    return (
        <div className='flex justify-center items-center min-h-screen bg-gray-900'>
            <div className='bg-gray-800 rounded-lg p-8 w-96 shadow-lg'>
                <h1 className='text-2xl font-bold text-white text-center mb-2'>Sign Up</h1>
                <p className='text-gray-400 text-center text-sm mb-6'>
                    Enter your information to create an account
                </p>

                <label className='block text-gray-300 text-sm mb-1'>First Name</label>
                <input
                    className='w-full p-2 mb-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500'
                    type='text'
                    placeholder='John'
                    onChange={(e) => setFirstName(e.target.value)}
                />

                <label className='block text-gray-300 text-sm mb-1'>Last Name</label>
                <input
                    className='w-full p-2 mb-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500'
                    type='text'
                    placeholder='Doe'
                    onChange={(e) => setLastName(e.target.value)}
                />

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
                    onClick={handleSignup}
                    className='w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition-colors'
                >
                    Sign Up
                </button>

                <p className='text-gray-400 text-sm text-center mt-4'>
                    Already have an account?{' '}
                    <span
                        className='text-blue-400 cursor-pointer hover:underline'
                        onClick={() => navigate('/signin')}
                    >
                        Sign in
                    </span>
                </p>
            </div>
        </div>
    );
}
