import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Logout from './../Logout'

const Account = () => {
  const [user, setUser] = useState(localStorage.user)
  const history = useHistory()
  useEffect(() => {
    if (!user) {
      history.push('/')
    }
  }, [user])
  return (
    <div>
      Account Page
      <Logout />
    </div>
  )
}

export default Account
