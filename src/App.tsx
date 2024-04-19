
import './App.css'
import React from 'react'
import { AccountInfo } from './components/AccountInfo'
import { useBankAccounts } from './hooks/useBankAccounts'
function App() {

  return (
    <>
      <AccountInfo useBankAccounts={useBankAccounts}/>
    </>
  )
}

export default App
