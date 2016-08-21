import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import App from 'app.jsx'
import Header from 'components/header.jsx'
import Footer from 'components/footer.jsx'

describe('Main App', () => {
    const wrapper = shallow(<App />)
    const loaded = wrapper.instance()

    it("contains header element", function() {
        expect(wrapper.contains([<Header />])).to.equal(true)
    })

    it("contains footer element", function() {
        expect(wrapper.contains([<Footer />])).to.equal(true)
    })




    // ===================
    // addRecord tests
    // ===================

    it("successfully runs addRecord on menu records", function() {
        expect(loaded.addRecord('menu', {guid: "menutest"})).to.equal(undefined)
    })

    it("succeeded in adding the newly created menu record to recordDict state", function() {
        expect(typeof(loaded.state.recordDict["menutest"])).to.not.equal('undefined')
    })

    it("succeeded in adding the newly created menu record to datObj state", function() {
        expect(loaded.state.dataObj.menus.filter((m) => {return m.guid == "menutest"})).to.have.length(1)
    })

    it("successfully runs addRecord on category records", function() {
        expect(loaded.addRecord('category', {guid: "categorytest"})).to.equal(undefined)
    })

    it("succeeded in adding the newly created category record to datObj state", function() {
        expect(loaded.state.dataObj.categories.filter((m) => {return m.guid == "categorytest"})).to.have.length(1)
    })

    it("succeeded in adding the newly created category record to recordDict state", function() {
        expect(typeof(loaded.state.recordDict["categorytest"])).to.not.equal('undefined')
    })

    it("successfully runs addRecord on product records", function() {
        expect(loaded.addRecord('product', {guid: "producttest"})).to.equal(undefined)
    })

    it("succeeded in adding the newly created product record to recordDict state", function() {
        expect(typeof(loaded.state.recordDict["producttest"])).to.not.equal('undefined')
    })

    it("succeeded in adding the newly created product record to datObj state", function() {
        expect(loaded.state.dataObj.products.filter((m) => {return m.guid == "producttest"})).to.have.length(1)
    })




    // ===================
    // deleteRecord tests
    // ===================

    it("ran a delete operation on previously created menu record successfully", function() {
        expect(loaded.deleteRecord("menutest")).to.equal(undefined)
    })

    it("successfully removed the menu record from recordDict state", function() {
        expect(typeof(loaded.state.recordDict["menutest"])).to.equal('undefined')
    })

    it("successfully removed the menu record from dataObj state", function() {
        expect(loaded.state.dataObj.menus.filter((m) => {return m.guid == "menutest"})).to.be.empty
    })

    it("ran a delete operation on previously created category record successfully", function() {
        expect(loaded.deleteRecord("categorytest")).to.equal(undefined)
    })

    it("successfully removed the category record from recordDict state", function() {
        expect(typeof(loaded.state.recordDict["categorytest"])).to.equal('undefined')
    })

    it("successfully removed the category record from dataObj state", function() {
        expect(loaded.state.dataObj.categories.filter((m) => {return m.guid == "categorytest"})).to.be.empty
    })

    it("ran a delete operation on previously created product record successfully", function() {
        expect(loaded.deleteRecord("producttest")).to.equal(undefined)
    })

    it("successfully removed the product record from recordDict state", function() {
        expect(typeof(loaded.state.recordDict["producttest"])).to.equal('undefined')
    })

    it("successfully removed the product record from dataObj state", function() {
        expect(loaded.state.dataObj.products.filter((m) => {return m.guid == "producttest"})).to.be.empty
    })




    // ===================
    // editing state tests
    // ===================

    loaded.addRecord("menu", {guid: "testRecord", intName: "initial"})

    it("successfully queried blank editing state", function() {
        expect(loaded.editing()).to.deep.equal({rec: "", elem: "", saveFunc: null})
    })

    it("successfully completed a set edit state operation", function() {
        expect(loaded.editing(
            "testRecord",
            "element",
            (r) => {
                r.intName = "changed"
                return r
            }
        )).to.equal(undefined)
    })

    it("successfully completed an onClick function during editing", function() {
        expect(loaded.onClick()).to.equal(undefined)
    })

    it("successfully reset editing state after onClick", function() {
        expect(loaded.editing()).to.deep.equal({rec: "", elem: "", saveFunc: null})
    })

    it("successfully saved edited record after onClick", function() {
        expect(loaded.state.recordDict["testRecord"].intName).to.equal("changed")
    })


})