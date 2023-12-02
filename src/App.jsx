import './App.css'
import Customerlist from './components/Customerlist'
import Traininglist from './components/Traininglist'
import { useState } from 'react'
import { Tab, Tabs } from '@mui/material'


function App() {

  const [value, setValue] = useState('Customers');

  const handleChange = (event, value) => {
    setValue(value)
  }

  return (
    <>
    <div>
      <Tabs value={value} onChange={handleChange}>
        <Tab value='Customers' label='Customers' />
        <Tab value='Trainings' label='Trainings' />
      </Tabs>
  </div>
  {value === 'Customers' && <div><Customerlist /></div>}
  {value === 'Trainings' && <div><Traininglist /></div>}
    </>
  )
}

export default App
