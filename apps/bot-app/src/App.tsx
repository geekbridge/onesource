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
  tg.BackButton.onClick(tg.close)

  return (
    <div>
      <img src={viteLogo} class='logo' alt='Vite logo' />
      <h1>OneSource Mini App</h1>
      <button onClick={() => tg.close()}>Close</button>
      <div>api version: {tg.version}</div>
    </div>
  )
}
