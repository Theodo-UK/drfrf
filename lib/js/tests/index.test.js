import React from "react"
import drfrf from "../index"
import { render } from "enzyme"

describe("drfrf HOC", () => {
  it('provides an "asyncValidate" prop', () => {
    const endpoint = "https://bad.horse/validate"

    const Comp = jest.fn(() => <p>Hey</p>)
    const Wrapped = drfrf({ endpoint })(Comp)

    render(<Wrapped />)

    expect(Comp).toHaveBeenCalledTimes(1)
    expect(Comp.mock.calls[0][0]).toEqual({
      asyncValidate: expect.any(Function),
    })
  })
})
