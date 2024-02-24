import React from 'react'
import ReactDOM from 'react-dom/client'
import { HomePage, } from './pages/home-page'
import './app/styles/global.css'
import { Provider, } from 'react-redux'
import { store, } from './app/store'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <HomePage />
    </Provider>
  </React.StrictMode>
)
