import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import Card from '../components/Card'
import InputField from '../components/InputField'
import Button from '../components/Button'

export default function SendMoney() {
  const [searchParams] = useSearchParams()
  const id = searchParams.get('id')
  const name = searchParams.get('name')
  const [amount, setAmount] = useState(0)
  const navigate = useNavigate()

  async function handleSendMoney() {
    try {
      await axios.post(
        'http://localhost:3000/api/v1/account/transfer',
        { amount, to: id },
        { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } }
      )
      alert('Transfer successful!')
      navigate('/dashboard')
    } catch (_err) {
      alert('Transfer failed — check your balance')
    }
  }

  return (
    <Card title="Send Money">
      <div className="flex items-center gap-3 justify-center mb-6">
        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
          {name[0]}
        </div>
        <span className="text-white text-lg">{name}</span>
      </div>
      <InputField label="Amount" type="number" placeholder="Enter amount" onChange={(e) => setAmount(Number(e.target.value))} />
      <div className="mt-3">
        <Button text="Transfer" onClick={handleSendMoney} />
      </div>
    </Card>
  )
}
