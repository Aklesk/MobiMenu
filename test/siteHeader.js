import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import Header from 'components/header.jsx'

describe('Site Header', () => {
    it("contains contains primary div", function() {
        expect(shallow(<Header />).contains(<div className="primary" />)).to.equal(true);
    })

it("contains contains secondary div", function() {
    expect(shallow(<Header />).contains(<div className="secondary" />)).to.equal(true);
})
})