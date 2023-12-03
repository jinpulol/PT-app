import './App.css'
import Customerlist from './components/Customerlist'
import Traininglist from './components/Traininglist'
import Calendar from './components/Calendar'
import { useState } from 'react'
import { Tab, Tabs } from '@mui/material'


function App() {

  const [value, setValue] = useState('Customers');

  const handleChange = (event, value) => {
    setValue(value)
  }

  return (
    <>
    <h1>PERTSAN PUNTTI</h1>
    <div>
      <Tabs value={value} onChange={handleChange}>
        <Tab value='Customers' label='Customers' />
        <Tab value='Trainings' label='Trainings' />
        <Tab value='Calendar' label='Calendar' />
      </Tabs>
  </div>
  {value === 'Customers' && <div><Customerlist /></div>}
  {value === 'Trainings' && <div><Traininglist /></div>}
  {value === 'Calendar' && <div><Calendar /></div>}
    </>
  )
}

export default App
