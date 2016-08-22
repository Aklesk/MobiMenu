import React from 'react'
import { expect } from 'chai'
import { render, shallow } from 'enzyme'
import sinon from 'sinon'
import App from 'app.jsx'
import Header from 'components/header.jsx'
import Footer from 'components/footer.jsx'
import Question from 'components/overlay/question.jsx'
import Alert from 'components/overlay/alert.jsx'
import AddProduct from 'components/overlay/addProduct.jsx'
import AddCategory from 'components/overlay/addCategory.jsx'

describe('Main App', () => {
    const wrapper = shallow(<App />)
    const loaded = wrapper.instance()

    it("contains header element", function() {
        expect(wrapper.containsMatchingElement(<Header />)).to.equal(true)
    })

    it("contains footer element", function() {
        expect(wrapper.containsMatchingElement(<Footer />)).to.equal(true)
    })




    // ===================
    // addRecord tests
    // ===================

    it("ran addRecord on menu, category, and product records", function() {
        expect(loaded.addRecord('menu', {guid: "menutest"})).to.equal(undefined)
        expect(loaded.addRecord('category', {guid: "categorytest"})).to.equal(undefined)
        expect(loaded.addRecord('product', {guid: "producttest"})).to.equal(undefined)
    })

    it("added the newly created record to recordDict and dataObj state", function() {
        expect(typeof(loaded.state.recordDict["menutest"])).to.not.equal('undefined')
        expect(loaded.state.dataObj.menus.filter((m) => {return m.guid == "menutest"})).to.have.length(1)
        expect(typeof(loaded.state.recordDict["categorytest"])).to.not.equal('undefined')
        expect(loaded.state.dataObj.categories.filter((m) => {return m.guid == "categorytest"})).to.have.length(1)
        expect(typeof(loaded.state.recordDict["producttest"])).to.not.equal('undefined')
        expect(loaded.state.dataObj.products.filter((m) => {return m.guid == "producttest"})).to.have.length(1)
    })




    // ===================
    // deleteRecord tests
    // ===================

    it("ran a delete operation on all previously created records", function() {
        expect(loaded.deleteRecord("menutest")).to.equal(undefined)
        expect(loaded.deleteRecord("categorytest")).to.equal(undefined)
        expect(loaded.deleteRecord("producttest")).to.equal(undefined)
    })

    it("properly removed the records from recordDict and dataObj state", function() {
        expect(typeof(loaded.state.recordDict["menutest"])).to.equal('undefined')
        expect(loaded.state.dataObj.menus.filter((m) => {return m.guid == "menutest"})).to.be.empty
        expect(typeof(loaded.state.recordDict["categorytest"])).to.equal('undefined')
        expect(loaded.state.dataObj.categories.filter((m) => {return m.guid == "categorytest"})).to.be.empty
        expect(typeof(loaded.state.recordDict["producttest"])).to.equal('undefined')
        expect(loaded.state.dataObj.products.filter((m) => {return m.guid == "producttest"})).to.be.empty
    })




    // ===================
    // editing state tests
    // ===================

    it("returned correct blank editing state", function() {
        expect(loaded.editing()).to.deep.equal({rec: "", elem: "", saveFunc: null})
    })

    it("set an edit state", function() {
        const saveFunc = (r) => {
            r.intName = "changed"
            return r
        }
        expect(loaded.addRecord("menu", {guid: "testRecord", intName: "initial"})).to.equal(undefined)
        expect(loaded.editing(
            "testRecord",
            "element",
            saveFunc
        )).to.equal(undefined)
        expect(loaded.state.editing).to.deep.equal({
            rec: "testRecord",
            elem: "element",
            saveFunc: saveFunc
        })
    })

    it("changed edit state via editing function, saving previous edit in the process", function() {
        expect(loaded.editing("","",null)).to.equal(undefined)
        expect(loaded.state.recordDict["testRecord"].intName).to.equal("changed")
        expect(loaded.state.editing).to.deep.equal({rec: "", elem: "", saveFunc: null})
    })




    // ===================
    // onClick function tests
    // ===================

    it("completed an onClick function with no edit state", function() {
        expect(loaded.state.editing).to.deep.equal({rec: "", elem: "", saveFunc: null})
        expect(loaded.onClick()).to.equal(undefined)
    })

    it("completed an onClick function with an active edit state", function() {
        expect(loaded.editing(
            "testRecord",
            "element",
            (r) => {
                r.intName = "onClick"
                return r
            }
        )).to.equal(undefined)
        expect(loaded.onClick()).to.equal(undefined)
    })

    it("reset editing state after onClick", function() {
        expect(loaded.editing()).to.deep.equal({rec: "", elem: "", saveFunc: null})
    })

    it("saved edited record to state after onClick was run", function() {
        expect(loaded.state.recordDict["testRecord"].intName).to.equal("onClick")
    })




    // ===================
    // overlay tests
    // ===================

    it("does not contain an any active overlay elements", function() {
        wrapper.update()
        expect(wrapper.containsMatchingElement(<Alert />)).to.equal(false)
        expect(wrapper.containsMatchingElement(<Question />)).to.equal(false)
        expect(wrapper.containsMatchingElement(<AddProduct />)).to.equal(false)
        expect(wrapper.containsMatchingElement(<AddCategory />)).to.equal(false)
    })


    it("set and displayed an Alert overlay", function() {
        expect(loaded.overlay(
            "header",
            "message",
            "alert",
            () => {return}
        )).to.equal(undefined)
        wrapper.update()
        expect(wrapper.containsMatchingElement(<Alert />)).to.equal(true)
        expect(wrapper.containsMatchingElement(<Question />)).to.equal(false)
        expect(wrapper.containsMatchingElement(<AddProduct />)).to.equal(false)
        expect(wrapper.containsMatchingElement(<AddCategory />)).to.equal(false)
    })

    it("set and displayed a Question overlay", function() {
        expect(loaded.overlay(
            "header?",
            "message?",
            "question",
            () => {return}
        )).to.equal(undefined)
         wrapper.update()
         expect(wrapper.containsMatchingElement(<Alert />)).to.equal(false)
         expect(wrapper.containsMatchingElement(<Question />)).to.equal(true)
         expect(wrapper.containsMatchingElement(<AddProduct />)).to.equal(false)
         expect(wrapper.containsMatchingElement(<AddCategory />)).to.equal(false)
    })

    it("set and displayed an Add Product overlay", function() {
        expect(loaded.overlay(
            "header",
            "message",
            "addProduct",
            () => {return}
        )).to.equal(undefined)
        wrapper.update()
        expect(wrapper.containsMatchingElement(<Alert />)).to.equal(false)
        expect(wrapper.containsMatchingElement(<Question />)).to.equal(false)
        expect(wrapper.containsMatchingElement(<AddProduct />)).to.equal(true)
        expect(wrapper.containsMatchingElement(<AddCategory />)).to.equal(false)
    })

    it("set and displayed an Add Category overlay", function() {
        expect(loaded.overlay(
            "header",
            "message",
            "addCategory",
            () => {return}
        )).to.equal(undefined)
        wrapper.update()
        expect(wrapper.containsMatchingElement(<Alert />)).to.equal(false)
        expect(wrapper.containsMatchingElement(<Question />)).to.equal(false)
        expect(wrapper.containsMatchingElement(<AddProduct />)).to.equal(false)
        expect(wrapper.containsMatchingElement(<AddCategory />)).to.equal(true)
    })

    it("cleared overlay state with okayFunc, calling overlay saveFunc once in the process", function() {
        const spy = sinon.spy(() => {return})
        expect(loaded.overlay(
                "header",
                "message",
                "addCategory",
                spy
        )).to.equal(undefined)
        loaded.okayFunc()
        wrapper.update()
        expect(wrapper.containsMatchingElement(<Alert />)).to.equal(false)
        expect(wrapper.containsMatchingElement(<Question />)).to.equal(false)
        expect(wrapper.containsMatchingElement(<AddProduct />)).to.equal(false)
        expect(wrapper.containsMatchingElement(<AddCategory />)).to.equal(false)
        expect(spy.calledOnce).to.equal(true)
    })

})