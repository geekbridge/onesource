import { Button } from 'ui'

import viteLogo from '/vite.svg'
import './App.css'

export function App() {
  return (
    <div>
      <img src={viteLogo} class='logo' alt='Vite logo' />
      <h1>OneSource Mini App</h1>
      <Button preset='styled'>UI Button</Button>
    </div>
  )
}
