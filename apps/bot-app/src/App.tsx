import { Button } from 'ui'

import { tg } from './constants'

import viteLogo from '/vite.svg'
import './App.css'

export function App() {
  if (!tg) {
    return (
      <div>
        <h1>Telegram is not detected</h1>
      </div>
    )
  }

  tg.BackButton.show()

  return (
    <div>
      <img src={viteLogo} class='logo' alt='Vite logo' />
      <h1>OneSource Mini App</h1>
      <Button onClick={tg.close}>Close</Button>
      <div>api version: {tg.version}</div>
    </div>
  )
}
