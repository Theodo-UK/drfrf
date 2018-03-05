import { SubmissionError, reduxForm } from 'redux-form'

const buildFetcher = (endpoint, method) => values => fetch(
  endpoint,
  {
    body: JSON.stringify(values),
    headers: {
      'content-type': 'application/json'
    },
    method
  }
)

const buildAsyncValidator = (endpoint, method) => {
  const fetcher = buildFetcher(endpoint, method)

  return values => fetcher(values).then(res => res.json())
}

const buildOnSubmit = (endpoint, method) => {
  const fetcher = buildFetcher(endpoint, method)

  return values => fetcher(values)
    .then(response => response.ok
      ? {}
      : response.json().then(errors => {
          throw new SubmissionError(errors)
        })
    )
}

const drfrfWrapper = config => {
  const {
    drfrf: {
      submitEndpoint,
      submitMethod = 'POST',
      validationEndpoint,
      validationMethod = 'POST'
    },
    ...rest
  } = config

  return reduxForm({
    asyncValidate: buildAsyncValidator(validationEndpoint, validationMethod),
    onSubmit: buildOnSubmit(submitEndpoint, submitMethod),
    ...rest
  })
}

export default drfrfWrapper
