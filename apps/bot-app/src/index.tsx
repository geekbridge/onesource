/* @refresh reload */
import { render } from 'solid-js/web'
import { Telegram } from '@twa-dev/types'

import { App } from './App'

import './index.css'

declare global {
  interface Window {
    Telegram: Telegram
  }
}

const root = document.getElementById('root')

render(() => <App />, root!)
