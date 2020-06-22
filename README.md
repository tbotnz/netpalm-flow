# netpalm-flow

#### Installing
```
git clone https://github.com/tbotnz/netpalm-flow.git
cd netpalm-flow
sudo docker build --tag netpalm-flow .
sudo docker run --name netpalm-flow -p 80:80 netpalm-flow
```

#### Sample Flow
```
[{"id":"7675e715.964ba8","type":"tab","label":"netpalm demo","disabled":false,"info":""},{"id":"35b924d7.851c2c","type":"inject","z":"7675e715.964ba8","name":"","topic":"","payload":"","payloadType":"date","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":120,"y":60,"wires":[["3d7ec6fe.26cada"]]},{"id":"3d7ec6fe.26cada","type":"function","z":"7675e715.964ba8","name":"create payload","func":"msg.payload = {\n    \"library\": \"napalm\",\n    \"connection_args\":{\n    \t\"device_type\":\"cisco_ios\", \"host\":\"10.0.2.30\", \"username\":\"admin\", \"password\":\"admin\"\n    },\n    \"command\": \"show run | i hostname\"\n};\nreturn msg;","outputs":1,"noerr":0,"x":400,"y":140,"wires":[["61f18e6d.c4126"]]},{"id":"ccefce67.de10e8","type":"debug","z":"7675e715.964ba8","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","x":1110,"y":220,"wires":[]},{"id":"73a65e59.167508","type":"checktask","z":"7675e715.964ba8","name":"","x":900,"y":180,"wires":[["ccefce67.de10e8"]]},{"id":"61f18e6d.c4126","type":"getconfig","z":"7675e715.964ba8","name":"","returnconfig":"","x":660,"y":220,"wires":[["73a65e59.167508"]]}]
```
