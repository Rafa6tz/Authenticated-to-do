import React from 'react'

const Register = () => {
  return (
    <div>
        <form>
            <div>
            <label>Nome: </label>
            <input type='text'/>
            </div>
            <div>
            <label>E-mail: </label>
            <input type='email'/>
            </div>
            <div>
            <label>Senha: </label>
            <input type='password'/>
            </div>
        </form>
    </div>
  )
}

export default Register