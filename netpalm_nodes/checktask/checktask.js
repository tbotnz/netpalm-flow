module.exports = function (RED) {
  function checkTaskNode(config) {
    RED.nodes.createNode(this, config);
    var node = this;
    node.on('input', function (msg) {
      function checktask(request, reply) {
        const poll_interval = 1000;
        let state = null;
        let result = null;

        return new Promise((resolve, reject) => {
          var config = require('./config_loader');
          console.log(config);
          var url = config.netpalm_server.transport+"://"+config.netpalm_server.ip+":"+config.netpalm_server.port.toString()+"/task/" + msg.payload.data.task_id;
          var headers = {
            'x-api-key': config.netpalm_server.key,
            'Content-Type': 'application/json'
          };
          console.log(url);
          function poll() {
            var request = require('request');
            console.log("Polling...")
            request.get(url, {
              headers: headers
            }, (error, response) => {
              if (error)
                reject(error);
              else {
                state = JSON.parse(response.body).data.task_status;
                result = JSON.parse(response.body).data.task_result;
                checkresult();
              }
            });
          };

          function checkresult() {
            if (state !== "finished" && state !== "failed") {
              setTimeout(poll, poll_interval);
            }
            else if (state == "failed"){
              resolve(state);
              resolve(result);
              node.error("task failed" + result.toString())
            }
            else {
              resolve(state);
              resolve(result);
              msg.payload = result;
              node.send(msg)
            };
          };
          checkresult();
        });
      };
      checktask();
    });
  };
  RED.nodes.registerType("checktask", checkTaskNode);
};