import React from 'react'
import { Field } from 'redux-form'

import drfrf from '@drfrf'

console.log(drfrf)

const MyField = props => {
  const {
    input,
    label,
    meta: {
      asyncValidating,
      error,
      touched
    },
    name,
    type,
    ...rest
  } = props

  return <p>
    <label htmlFor={name}>
      {label}
      {asyncValidating && '(loading)'}
    </label>
    <input
      type={type}
      placeholder={label}
      {...input}
    />
    {touched && error &&
      <span style={{background: '#ffdddd', color: 'red'}}>{error}</span>
    }
  </p>
}

const App = props => {
  const { handleSubmit } = props

  return <form onSubmit={handleSubmit}>
    <h1>New M33er</h1>
    <Field name='alias' component={MyField} type='text' label='Alias' />
    <Field name='arrival_date' component={MyField} type='date' label='Arrival date' />
    <Field name='startup' component={MyField} type='text' label='Startup' />
    <button type='submit'>Submit</button>
  </form>
}

export default drfrf({
  form: 'drfrf_test',
  asyncChangeFields: ['alias', 'arrival_date', 'startup'],
  drfrf: {
    submitEndpoint: 'http://localhost:8000/api/m33ers/',
    validationEndpoint: 'http://localhost:8000/api/m33ers/validate/'
  }
})(App)
