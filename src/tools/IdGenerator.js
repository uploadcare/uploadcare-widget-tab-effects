'use strict'

export default {
  Generate: function() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
         + Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
  },
}
