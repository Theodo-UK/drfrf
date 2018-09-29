# drfrf

[![CircleCI](https://circleci.com/gh/Theodo-UK/drfrf.svg?style=svg)](https://circleci.com/gh/Theodo-UK/drfrf)
[![npm](https://badgen.net/badge/npm/v/drfrf)](https://www.npmjs.com/package/drfrf)

Django REST framework - redux-form connector

## Installation

`$ yarn add drfrf`

## Usage

Compose the `drfrf` [higher-order component](https://reactjs.org/docs/higher-order-components.html) with [`reduxForm`](https://redux-form.com/7.4.2/docs/api/reduxform.md/):

```js
import drfrf from "drfrf"
import { connect } from "react-redux"
import { compose } from "recompose"

const App = props => <form>...</form>

export default compose(
  drfrf({
    endpoint: "http://example.com/api/items/validate/",
  }),
  reduxForm({ ... })
)(App)
```

To-daa!
Your form automatically queries the specified endpoint with every onChange and displays errors from the backend! 🎉

Browse the complete example here: https://github.com/Theodo-UK/drfrf/tree/master/example/frontend/src

## API

`drfrf` exposes a single HOC which sets the `asyncValidate` prop for redux-form to use.
This HOC accepts a configuration object with the following properties:

| name | default | description |
| ---- | ------- | ----------- |
| endpoint | *none* | URL to call with every change |
| method | "POST" | HTTP method to use |

## Backend integration

If you're using Django in your backend, check out [drfrf for the backend](../py).
