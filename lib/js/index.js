import { withProps } from "recompose"

const hoc = ({ endpoint, method = "POST" }) =>
  withProps({
    asyncValidate: values =>
      fetch(endpoint, {
        body: JSON.stringify(values),
        headers: {
          "content-type": "application/json",
        },
        method: method,
      }).then(res => {
        if (res.status < 400) return
        else return res.json().then(errors => Promise.reject(errors))
      }),
  })

export default hoc
