# netpalm-flow

git clone https://github.com/tbotnz/netpalm-flow.git
cd netpalm-flow
sudo docker build --tag netpalm-flow .
sudo docker run --name netpalm-flow -p 80:80 netpalm-flow