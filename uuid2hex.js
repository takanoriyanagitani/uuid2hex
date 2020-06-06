(function(g,f){

  const n = [ typeof module ]
    .filter(function(t){ return "object" === t })
    .map(function(_){ return typeof module.exports })
    .filter(function(t){ return "object" === t })
    .map(function(_){ return f(module.exports) })

  const b = [ typeof module ]
    .filter(function(t){ return "object" != t })
    .map(function(_){
      g.UUID2Hex = {}
      return f(g.UUID2Hex)
    })

})(this, function(e){

  const bsmap = new Array(256)
  for(let i=0; i<bsmap.length; i++){
    const j = i + 0x100
    const s = j.toString(16)
    bsmap[i] = s.substring(1)
  }

  const u3h = function(u3){ return bsmap[u3] }

  const u4h = function(u4){ return u3h(u4 >>> 8) + u3h(u4 & 0xff) }

  const u5h = function(u5){ return u4h(u5 >>> 16) + u4h(u5 & 0xffff) }

  const u6h = function(u5a, u5b){ return u5h(u5a) + u5h(u5b) }

  const u7h = function(u5a, u5b, u5c, u5d){ return u5h(u5a) + u5h(u5b) + u5h(u5c) + u5h(u5d) }

  e.uuid2hex_fromu5 = u7h

  const a2d = function(buffer, byteOffset, byteLength){ return new DataView(buffer, byteOffset, byteLength) }

  e.buffer2arrayBuffer = function(buffer){ return buffer.buffer }

  e.uuid2hex_fromdv = function(dv, byteOffset, littleEndian){
    const bo = byteOffset || 0
    const u5a = dv.getUint32(bo+ 0, littleEndian)
    const u5b = dv.getUint32(bo+ 4, littleEndian)
    const u5c = dv.getUint32(bo+ 8, littleEndian)
    const u5d = dv.getUint32(bo+12, littleEndian)
    return e.uuid2hex_fromu5(u5a, u5b, u5c, u5d)
  }

})
