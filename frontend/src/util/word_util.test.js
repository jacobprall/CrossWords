const word_util = require("./word_util")
// @ponicode
describe("word_util.getClueAnswer", () => {
    test("0", () => {
        let callFunction = () => {
            word_util.getClueAnswer(0)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            word_util.getClueAnswer(false)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            word_util.getClueAnswer("gunner")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            word_util.getClueAnswer("aleen")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            word_util.getClueAnswer("claudie")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            word_util.getClueAnswer(-Infinity)
        }
    
        expect(callFunction).not.toThrow()
    })
})
