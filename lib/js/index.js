import { withProps } from "recompose"

const hoc = ({ endpoint, method = "POST" }) => withProps({
  asyncValidate: values => fetch(
    endpoint,
    {
      body: JSON.stringify(values),
      headers: {
        'content-type': 'application/json'
      },
      method: method
    }
  ).then(res => res.json())
})

export default hoc
