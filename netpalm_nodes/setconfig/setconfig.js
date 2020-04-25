var request = require('request');

module.exports = function (RED) {
  function setConfigNode(config) {
    RED.nodes.createNode(this, config);
    var node = this;
    node.on('input', function (msg) {
      var config = require('./config_loader');
      var headers = {
        'x-api-key': config.netpalm_server.key,
        'Content-Type': 'application/json'
      };
      //console.log(JSON.stringify(msg.payload));
      var payl = JSON.stringify(msg.payload);
      var url = config.netpalm_server.transport+"://"+config.netpalm_server.ip+":"+config.netpalm_server.port.toString()+"/setconfig";
      request.post(url, {
        body: payl,
        headers: headers
      }, (error, res, body) => {
        if (error) {
          node.error("error connecting to netpalm gateway" + error.toString())
          return
        }
        //console.log(`statusCode: ${res.statusCode}`)
        if (res.statusCode !== 201) {
          node.error("unable to post data to netpalm gateway" + res.statusCode.toString())
          return
        } else {
          var npresponse = JSON.parse(res.body);
          if (npresponse["data"]) {
            // task found, begin checking task
            msg.payload = npresponse;
            node.send(msg);
          } else {
            node.error("unable to get task result" + npresponse.toString())
            return
          }
        }
      })
      
    });
  }
  RED.nodes.registerType("setconfig", setConfigNode);
}