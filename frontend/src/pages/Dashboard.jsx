import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const [balance, setBalance] = useState(0);
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get('http://localhost:3000/api/v1/account/balance', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                },
            })
            .then((response) => {
                setBalance(response.data.balance);
            });
    }, []);

    useEffect(() => {
        axios
            .get('http://localhost:3000/api/v1/user/bulk?filter=' + filter, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                },
            })
            .then((response) => {
                setUsers(response.data.user);
            });
    }, [filter]);

    return (
        <div className='min-h-screen bg-gray-900 p-6'>
            {/* Header */}
            <div className='flex justify-between items-center mb-8'>
                <h1 className='text-2xl font-bold text-white'>Dashboard</h1>
                <button onClick={f} className='text-gray-400 hover:text-red-400 text-sm transition-colors'>
                    Update Profile
                </button>
                <button
                    onClick={() => {
                        localStorage.removeItem('token');
                        navigate('/signin');
                    }}
                    className='text-gray-400 hover:text-red-400 text-sm transition-colors'
                >
                    Logout
                </button>
            </div>

            {/* Balance Card */}
            <div className='bg-gray-800 rounded-lg p-6 mb-8 shadow-lg'>
                <div>
                    <h1 className='text-2xl font-bold text-white'>Welcome Back!</h1>
                    <p className='text-gray-400'>
                        Here's your current account balance and recent activity.
                    </p>
                </div>
                <p className='text-gray-400 text-sm mb-1'>Your Balance</p>
                <h2 className='text-3xl font-bold text-white'>${balance.toLocaleString()}</h2>
            </div>

            {/* Search */}
            <input
                className='w-full p-3 mb-6 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500'
                placeholder='Search users...'
                onChange={(e) => setFilter(e.target.value)}
            />

            {/* User List */}
            <div className='flex flex-col gap-3'>
                {users.map((user) => (
                    <div
                        key={user._id}
                        className='flex justify-between items-center bg-gray-800 rounded-lg p-4'
                    >
                        <div className='flex items-center gap-3'>
                            <div className='w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold'>
                                {user.firstName[0]}
                            </div>
                            <span className='text-white'>
                                {user.firstName} {user.lastName}
                            </span>
                        </div>
                        <button
                            onClick={() =>
                                navigate('/send?id=' + user._id + '&name=' + user.firstName)
                            }
                            className='bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded transition-colors'
                        >
                            Send Money
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
