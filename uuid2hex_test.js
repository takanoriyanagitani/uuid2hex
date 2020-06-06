const { Builder } = require("selenium-webdriver")

const chrome = require("selenium-webdriver/chrome")

require("chromedriver")

const timeout = 65536

const UUID2Hex = require("./uuid2hex")

describe("uuid2hex.js", () => {

  describe("uuid2hex_fromu5", () => {

    const state = { browser: null }

    beforeAll(() => Promise.resolve(new Builder())
      .then(b=>b.forBrowser("chrome"))
      .then(b=>b.setChromeOptions(new chrome.Options().headless()))
      .then(b=>b.build())
      .then(b=>Object.assign(state, {browser: b}))
    , timeout)

    afterAll(() => Promise.resolve(state.browser)
      .then(b=>b.quit())
    , timeout)

    test("37760599063303330123456789abcdef", () => {
      const ab = new ArrayBuffer(16)
      const dv = new DataView(ab)
      dv.setUint32( 0, 0x37760599)
      dv.setUint32( 4, 0x06330333)
      dv.setUint32( 8, 0x01234567)
      dv.setUint32(12, 0x89abcdef)
      const expected = "37760599063303330123456789abcdef"
      const node = UUID2Hex.uuid2hex_fromdv(dv)
      return Promise.resolve(state.browser)
      .then(b=>b.get("https://takanoriyanagitani.github.io/uuid2hex/tests/uuid2hex_fromdv.html"))
      .then(_=>state.browser.getTitle())
      .then(t=>{
	const chrome = t
	expect(node).toBe(expected)
	expect(chrome).toBe(expected)
      })
    }, timeout)

  })

})
