FROM node:10

# Copy over the source code files
RUN mkdir /ivt
COPY app.js ivt/app.js
COPY package.json ivt/package.json
COPY startup.sh ivt/startup.sh

WORKDIR /ivt
# install node modules
RUN npm install

# Set execute permissions for all on the startup shell script (CHECK is this really needed?)
RUN chmod a+x startup.sh

# To ensure container runs as non root (which is security requirement in many K8S setups)
RUN useradd -m -o -u 1000 ivt && chown ivt:ivt /ivt
USER 1000

# Think this is needed when running directly in Docker but it is ignored in K8s
# where the values are instead got from deployment.yaml targetPort etc values
EXPOSE 8080

# script that runs at container start and invokes npm start (which in turn runs 'node app.js')
ENTRYPOINT ["./startup.sh"]
