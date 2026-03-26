import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Card from '../components/Card'
import InputField from '../components/InputField'
import Button from '../components/Button'

export default function Signin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  async function handleSignin() {
    try {
      const response = await axios.post('http://localhost:3000/api/v1/user/signin', {
        username, password,
      })
      localStorage.setItem('token', response.data.token)
      navigate('/dashboard')
    } catch (_err) {
      alert('Signin failed — check your inputs')
    }
  }

  return (
    <Card title="Sign In" subtitle="Enter your credentials to access your account">
      <InputField label="Email" placeholder="john@email.com" onChange={(e) => setUsername(e.target.value)} />
      <InputField label="Password" type="password" placeholder="••••••" onChange={(e) => setPassword(e.target.value)} />
      <div className="mt-3">
        <Button text="Sign In" onClick={handleSignin} />
      </div>
      <p className="text-gray-400 text-sm text-center mt-4">
        Don't have an account?{' '}
        <span className="text-blue-400 cursor-pointer hover:underline" onClick={() => navigate('/signup')}>
          Sign up
        </span>
      </p>
    </Card>
  )
}
