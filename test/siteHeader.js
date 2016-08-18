import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import Header from 'components/header.jsx'

describe('Site Header', () => {
    it("contains contains primary div", function() {
        const wrapper = shallow(<Header />)
        expect(wrapper.find('.primary')).to.have.length(1)
    })

it("contains contains secondary div", function() {
    const wrapper = shallow(<Header />)
    expect(wrapper.find('.secondary')).to.have.length(1)
})
})