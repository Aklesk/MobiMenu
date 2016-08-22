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
    const app = wrapper.instance()

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
        expect(app.addRecord('menu', {guid: "menutest"})).to.equal(undefined)
        expect(app.addRecord('category', {guid: "categorytest"})).to.equal(undefined)
        expect(app.addRecord('product', {guid: "producttest"})).to.equal(undefined)
    })

    it("added the newly created record to recordDict and dataObj state", function() {
        expect(typeof(app.state.recordDict["menutest"])).to.not.equal('undefined')
        expect(app.state.dataObj.menus.filter((m) => {return m.guid == "menutest"})).to.have.length(1)
        expect(typeof(app.state.recordDict["categorytest"])).to.not.equal('undefined')
        expect(app.state.dataObj.categories.filter((m) => {return m.guid == "categorytest"})).to.have.length(1)
        expect(typeof(app.state.recordDict["producttest"])).to.not.equal('undefined')
        expect(app.state.dataObj.products.filter((m) => {return m.guid == "producttest"})).to.have.length(1)
    })

    it("added newRec flag to all newly created records", function() {
        expect(app.state.recordDict["menutest"].newRec).to.equal(true)
        expect(app.state.recordDict["categorytest"].newRec).to.equal(true)
        expect(app.state.recordDict["producttest"].newRec).to.equal(true)
    })




    // ===================
    // deleteRecord tests
    // ===================

    it("ran a delete operation on all previously created records", function() {
        expect(app.deleteRecord("menutest")).to.equal(undefined)
        expect(app.deleteRecord("categorytest")).to.equal(undefined)
        expect(app.deleteRecord("producttest")).to.equal(undefined)
    })

    it("properly removed the records from recordDict and dataObj state", function() {
        expect(typeof(app.state.recordDict["menutest"])).to.equal('undefined')
        expect(app.state.dataObj.menus.filter((m) => {return m.guid == "menutest"})).to.be.empty
        expect(typeof(app.state.recordDict["categorytest"])).to.equal('undefined')
        expect(app.state.dataObj.categories.filter((m) => {return m.guid == "categorytest"})).to.be.empty
        expect(typeof(app.state.recordDict["producttest"])).to.equal('undefined')
        expect(app.state.dataObj.products.filter((m) => {return m.guid == "producttest"})).to.be.empty
    })




    // ===================
    // editing state tests
    // ===================

    const saveFunc = (r) => {
        r.intName = "changed"
        return r
    }
    const editSpy = sinon.spy(saveFunc)

    it("returned correct blank editing state", function() {
        expect(app.editing()).to.deep.equal({rec: "", elem: "", saveFunc: null})
    })

    it("set an edit state", function() {
        expect(app.addRecord("menu", {guid: "testRecord", intName: "initial"})).to.equal(undefined)
        expect(app.editing(
            "testRecord",
            "element",
            editSpy
        )).to.equal(undefined)
        expect(app.state.editing).to.deep.equal({
            rec: "testRecord",
            elem: "element",
            saveFunc: editSpy
        })
    })

    it("changed edit state via editing function, saving previous edit in the process", function() {
        expect(app.editing("","",null)).to.equal(undefined)
        expect(app.state.recordDict["testRecord"].intName).to.equal("changed")
        expect(editSpy.calledOnce).to.equal(true)
        expect(app.state.editing).to.deep.equal({rec: "", elem: "", saveFunc: null})
    })




    // ===================
    // onClick function tests
    // ===================

    it("completed an onClick function with no edit state", function() {
        expect(app.state.editing).to.deep.equal({rec: "", elem: "", saveFunc: null})
        expect(app.onClick()).to.equal(undefined)
    })

    it("completed an onClick function with an active edit state", function() {
        expect(app.editing(
            "testRecord",
            "element",
            (r) => {
            r.intName = "onClick"
        return r
    }
        )).to.equal(undefined)
        expect(app.onClick()).to.equal(undefined)
    })

    it("reset editing state after onClick", function() {
        expect(app.editing()).to.deep.equal({rec: "", elem: "", saveFunc: null})
    })

    it("saved edited record to state after onClick was run", function() {
        expect(app.state.recordDict["testRecord"].intName).to.equal("onClick")
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
        expect(app.overlay(
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
        expect(app.overlay(
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
        expect(app.overlay(
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
        expect(app.overlay(
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
        expect(app.overlay(
            "header",
            "message",
            "addCategory",
            spy
        )).to.equal(undefined)
        app.okayFunc()
        wrapper.update()
        expect(wrapper.containsMatchingElement(<Alert />)).to.equal(false)
        expect(wrapper.containsMatchingElement(<Question />)).to.equal(false)
        expect(wrapper.containsMatchingElement(<AddProduct />)).to.equal(false)
        expect(wrapper.containsMatchingElement(<AddCategory />)).to.equal(false)
        expect(spy.calledOnce).to.equal(true)
    })




    // ===================
    // record tests
    // ===================

    it("correctly threw out updateRecord input which did not already exist in state", function() {
        expect(app.updateRecord({guid: "recTest", intName: "initial"})).to.equal(undefined)
        expect(app.state.recordDict["recTest"]).to.equal(undefined)
    })

    it("Sent an existant record update to state with updateRecord function", function() {
        expect(app.addRecord("menu", {guid: "recTest", intName: "initial"}))
        expect(app.updateRecord({guid: "recTest", intName: "update1"})).to.equal(undefined)
        expect(app.state.recordDict["recTest"]).to.deep.equal({guid: "recTest", intName: "update1"})
    })

    it("stripped off the newRec key during record update with updateRecord", function() {
        expect(app.updateRecord({guid: "recTest", intName: "initial", newRec: true})).to.equal(undefined)
        expect(app.state.recordDict["recTest"]).to.deep.equal({guid: "recTest", intName: "initial"})
    })

    it("correctly threw out updateList input which did not already exist in state", function() {
        expect(app.updateList({guid: "blargh", intName: "blargh"})).to.equal(undefined)
        expect(app.state.recordDict["blargh"]).to.equal(undefined)
    })

    it("updated existant record with updateList command", function() {
        expect(app.updateList({guid: "recTest", intName: "update2"})).to.equal(undefined)
        expect(app.state.recordDict["recTest"]).to.deep.equal({guid: "recTest", intName: "update2"})
    })

})