console.log('m4는 주로 Core Module들이 사용하는 전형적인 exports Pattern');

var exportObject = {
  createServer: function(requestListener) {
      // ...
      // Receive Client's Request Message
      // Parse Client's Request
      requestListener({}, {});
  },
  readFile: function(filename, fileReadCallback) {
    // Read File Request to FileSystem
    fileReadCallback("Default Error Message", "Data Contents");
  },
  join: function(p1, p2, p3) {
    return p1 + '\\' + p2 + '\\' + p3;
  }
};

module.exports = exportObject;