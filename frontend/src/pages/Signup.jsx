import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Card from '../components/Card'
import InputField from '../components/InputField'
import Button from '../components/Button'

export default function Signup() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  async function handleSignup() {
    try {
      const response = await axios.post('http://localhost:3000/api/v1/user/signup', {
        firstName, lastName, username, password,
      })
      localStorage.setItem('token', response.data.token)
      navigate('/dashboard')
    } catch (_err) {
      alert('Signup failed — check your inputs')
    }
  }

  return (
    <Card title="Sign Up" subtitle="Enter your information to create an account">
      <InputField label="First Name" placeholder="John" onChange={(e) => setFirstName(e.target.value)} />
      <InputField label="Last Name" placeholder="Doe" onChange={(e) => setLastName(e.target.value)} />
      <InputField label="Email" placeholder="john@email.com" onChange={(e) => setUsername(e.target.value)} />
      <InputField label="Password" type="password" placeholder="••••••" onChange={(e) => setPassword(e.target.value)} />
      <div className="mt-3">
        <Button text="Sign Up" onClick={handleSignup} />
      </div>
      <p className="text-gray-400 text-sm text-center mt-4">
        Already have an account?{' '}
        <span className="text-blue-400 cursor-pointer hover:underline" onClick={() => navigate('/signin')}>
          Sign in
        </span>
      </p>
    </Card>
  )
}
