import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import Header from 'components/header.jsx'

describe('Site Header', () => {
    const wrapper = shallow(<Header />)

    it("contains primary div", function() {
        expect(wrapper.find('.primary')).to.have.length(1)
    })

    it("contains secondary div", function() {
        expect(wrapper.find('.secondary')).to.have.length(1)
    })

    it("contains main logo image", function() {
        expect(wrapper.find('.logo')).to.have.length(1)
    })

    it("contains text below main logo", function() {
        expect(wrapper.find('.logo-text')).to.have.length(1)
    })

    it("contains breadcrumbs", function() {
        expect(wrapper.find('.breadcrumbs')).to.have.length(1)
    })

    it("contains two blocks of links", function() {
        expect(wrapper.find('.links')).to.have.length(2)
    })
})