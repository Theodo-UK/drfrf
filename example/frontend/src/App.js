import React, { PureComponent } from "react"
import { Field, reduxForm, getFormAsyncErrors } from "redux-form"
import { compose } from "recompose"
import { connect } from "react-redux"

import drfrf from "@drfrf"

const Input = ({ input, meta, label, ...rest }) => {
  return (
    <div className={`${meta.error && "error"} field`}>
      <label>{label}</label>
      <input {...input} {...rest} />
    </div>
  )
}

class App extends PureComponent {
  basePrice = 2
  onChange = (event, amount) => this.props.change("price", this.basePrice * amount + "€")

  render() {
    const { invalid, errors } = this.props

    return (
      <main className={`ui form container card ${invalid && "error"}`}>
        <div className="content">
          <div className="header">Product</div>
          <p className="meta">
            {this.basePrice}
            €/unit
          </p>

          <Field
            component={Input}
            label="Quantity"
            placeholder="1"
            name="amount"
            type="number"
            onChange={this.onChange}
          />
          <Field
            component={Input}
            label="Price"
            placeholder={`${this.basePrice}€`}
            name="price"
            type="text"
            disabled
          />

          {errors && (
            <div className="ui error message">
              {Object.keys(errors).map(input =>
                errors[input].map((error, i) => <p key={`${input}-${i}`}>{error}</p>),
              )}
            </div>
          )}
        </div>
        <div className="extra content">
          <button className="ui yellow fluid labeled icon button" type="submit">
            <i className="cart icon" />
            Add to cart
          </button>
        </div>
      </main>
    )
  }
}

export default compose(
  drfrf({
    endpoint: "http://localhost:8000/api/items/validate/",
  }),
  reduxForm({
    form: "drfrf_example",
  }),
  connect(state => ({
    errors: getFormAsyncErrors("drfrf_example")(state),
  })),
)(App)
