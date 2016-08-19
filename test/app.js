import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import App from 'app.jsx'
import Header from 'components/header.jsx'
import Footer from 'components/footer.jsx'

describe('Main App', () => {
    const wrapper = shallow(<App />)

    it("contains header element", function() {
        expect(wrapper.contains([<Header />])).to.equal(true)
    })

    it("contains footer element", function() {
        expect(wrapper.contains([<Footer />])).to.equal(true)
    })
})