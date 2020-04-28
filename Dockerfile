FROM node:10
ADD . /code
WORKDIR /code
RUN npm install
RUN npm install netpalm_nodes/checktask
RUN npm install netpalm_nodes/execscript
RUN npm install netpalm_nodes/getconfig
RUN npm install netpalm_nodes/service
RUN npm install netpalm_nodes/setconfig
WORKDIR /code
EXPOSE 80
CMD [ "npm", "start" ]