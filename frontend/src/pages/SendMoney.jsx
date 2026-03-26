import axios from 'axios';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function SendMoney() {
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');
    const name = searchParams.get('name');
    const [amount, setAmount] = useState(0);
    const navigate = useNavigate();

    async function handleSendMoney() {
        try {
            await axios.post(
                'http://localhost:3000/api/v1/account/transfer',
                { amount, to: id },
                {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token'),
                    },
                }
            );
            alert('Transfer successful!');
            navigate('/dashboard');
        } catch (_err) {
            alert('Transfer failed — check your balance');
        }
    }

    return (
        <div className='flex justify-center items-center min-h-screen bg-gray-900'>
            <div className='bg-gray-800 rounded-lg p-8 w-96 shadow-lg'>
                <h1 className='text-2xl font-bold text-white text-center mb-2'>Send Money</h1>
                <div className='flex items-center gap-3 justify-center mb-6'>
                    <div className='w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold'>
                        {name[0]}
                    </div>
                    <span className='text-white text-lg'>{name}</span>
                </div>

                <label className='block text-gray-300 text-sm mb-1'>Amount</label>
                <input
                    className='w-full p-2 mb-6 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500'
                    type='number'
                    placeholder='Enter amount'
                    onChange={(e) => setAmount(Number(e.target.value))}
                />

                <button
                    onClick={handleSendMoney}
                    className='w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition-colors'
                >
                    Transfer
                </button>
            </div>
        </div>
    );
}
