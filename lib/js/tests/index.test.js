import React from "react"
import drfrf from "../index"
import { mount } from "enzyme"

describe("drfrf HOC", () => {
  let endpoint
  let Comp
  let Wrapped

  beforeEach(() => {
    endpoint = "https://bad.horse/validate"
    Comp = jest.fn(() => <p>Hey</p>)
    Wrapped = drfrf({ endpoint })(Comp)
  })

  it('provides an "asyncValidate" prop', () => {
    mount(<Wrapped />)

    expect(Comp).toHaveBeenCalledTimes(1)
    expect(Comp.mock.calls[0][0]).toEqual({
      asyncValidate: expect.any(Function),
    })
  })

  describe("asyncValidate prop", () => {
    const responseData = { field: ["error1", "error2"] }
    let wrapper
    let asyncValidate

    beforeEach(() => {
      fetch.resetMocks()
      fetch.mockResponseOnce(JSON.stringify({}))
      wrapper = mount(<Wrapped />)
      asyncValidate = wrapper.childAt(0).props().asyncValidate
    })

    it("returns undefined on success", async () => {
      const promise = asyncValidate()
      expect(promise).toBeInstanceOf(Promise)
      expect(await promise).toBe(undefined)
    })

    it("rejects an error object on failure", async () => {
      expect.assertions(2)

      fetch.resetMocks()
      fetch.mockResponseOnce(JSON.stringify(responseData), { status: 400 })

      const promise = asyncValidate()
      expect(promise).toBeInstanceOf(Promise)

      try {
        await promise
      } catch (error) {
        expect(error).toEqual(responseData)
      }
    })

    it("calls the provided endpoint", async () => {
      const requestData = { a: 1 }

      await asyncValidate(requestData)
      expect(fetch.mock.calls.length).toEqual(1)
      expect(fetch.mock.calls[0][0]).toEqual(endpoint)
      expect(fetch.mock.calls[0][1]).toEqual({
        body: JSON.stringify(requestData),
        headers: {
          "content-type": "application/json",
        },
        method: "POST",
      })
    })

    it("uses POST by default", async () => {
      const requestData = { a: 1 }

      await asyncValidate(requestData)
      expect(fetch.mock.calls.length).toEqual(1)
      expect(fetch.mock.calls[0][1].method).toBe("POST")
    })

    it("uses the provided method", async () => {
      const method = "PUT"
      const Wrapped = drfrf({ endpoint, method })(Comp)
      const wrapper = mount(<Wrapped />)
      const { asyncValidate } = wrapper.childAt(0).props()
      const requestData = { a: 1 }

      await asyncValidate(requestData)
      expect(fetch.mock.calls.length).toEqual(1)
      expect(fetch.mock.calls[0][1].method).toBe(method)
    })
  })
})
