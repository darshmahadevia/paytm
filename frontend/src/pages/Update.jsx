import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Card from '../components/Card'
import InputField from '../components/InputField'
import Button from '../components/Button'

export default function Update() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  async function handleUpdate() {
    const body = {}
    if (firstName) body.firstName = firstName
    if (lastName) body.lastName = lastName
    if (password) body.password = password

    await axios.put(
      'http://localhost:3000/api/v1/user/',
      body,
      { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } }
    )
    alert('Updated successfully!')
    navigate('/dashboard')
  }

  return (
    <Card title="Update Profile" subtitle="Update any fields you want to change">
      <InputField label="First Name" placeholder="New first name" onChange={(e) => setFirstName(e.target.value)} />
      <InputField label="Last Name" placeholder="New last name" onChange={(e) => setLastName(e.target.value)} />
      <InputField label="Password" type="password" placeholder="New password" onChange={(e) => setPassword(e.target.value)} />
      <div className="mt-3">
        <Button text="Update" onClick={handleUpdate} />
      </div>
      <p className="text-gray-400 text-sm text-center mt-4">
        <span className="text-blue-400 cursor-pointer hover:underline" onClick={() => navigate('/dashboard')}>
          Back to Dashboard
        </span>
      </p>
    </Card>
  )
}
