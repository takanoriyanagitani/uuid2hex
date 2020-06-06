const UUID2Hex = require("./uuid2hex")

describe("uuid2hex.js", () => {

  describe("uuid2hex_fromu5", () => {

    test("37760599063303330123456789abcdef", () => {
      const ab = new ArrayBuffer(16)
      const dv = new DataView(ab)
      dv.setUint32( 0, 0x37760599)
      dv.setUint32( 4, 0x06330333)
      dv.setUint32( 8, 0x01234567)
      dv.setUint32(12, 0x89abcdef)
      expect(UUID2Hex.uuid2hex_fromdv(dv)).toBe("37760599063303330123456789abcdef")
    })

  })

})
