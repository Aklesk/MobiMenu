import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import Footer from 'components/footer.jsx'

describe('Site Footer', () => {
    const wrapper = shallow(<Footer />)

    it("contains footer element", function() {
        expect(wrapper.find('footer')).to.have.length(1)
    })

    it("contains Terms of Service anchor", function() {
        expect(wrapper.findWhere((a) => {return a.matchesElement(<a>Terms of Service</a>)})).to.have.length(1)
    })

    it("contains Privacy Policy anchor", function() {
        expect(wrapper.findWhere((a) => {return a.matchesElement(<a>Privacy Policy</a>)})).to.have.length(1)
    })


})