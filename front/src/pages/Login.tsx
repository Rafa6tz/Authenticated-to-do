import React from 'react'

const Login = () => {
  return (
    <div>
        <form>
            <div>
            <label>E-mail: </label>
            <input type='email'/>
            </div>
            <div>
            <label>Password: </label>
            <input type='password'/>
            </div>
        </form>
    </div>
  )
}

export default Login