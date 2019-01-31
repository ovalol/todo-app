FROM node:10.9-alpine as base
ENV BUILD_LOCATION=/usr/local/todo/build
ENV DEPENDENCIES_LOCATION=/usr/local/todo/dependencies
ENV NODE_ENV=prod
ENV LISTENING_PORT=3000

#
# Create a new stage to download dependencies for build and realse stage
#
FROM base as dependencies
WORKDIR $DEPENDENCIES_LOCATION
RUN apk add bash g++ ca-certificates musl-dev make git
RUN apk add --virtual .build-deps gcc zlib-dev libc-dev bsd-compat-headers py-setuptools
COPY package.json package-lock.json $DEPENDENCIES_LOCATION/
RUN npm install -s --only=production
RUN cp -R $DEPENDENCIES_LOCATION/node_modules $DEPENDENCIES_LOCATION/prod/
RUN rm -rf $DEPENDENCIES_LOCATION/node_modules
RUN npm install -s
RUN cp -R $DEPENDENCIES_LOCATION/node_modules $DEPENDENCIES_LOCATION/dev/

#
# Build stage, execute test and compile typescript to javascript
# create a realese directory with all needed to run application
#
FROM base as build
WORKDIR $BUILD_LOCATION
COPY --from=dependencies $DEPENDENCIES_LOCATION/dev $BUILD_LOCATION/node_modules
COPY . $BUILD_LOCATION
RUN node $BUILD_LOCATION/node_modules/.bin/tsc -p $BUILD_LOCATION/tsconfig.json
RUN mkdir $BUILD_LOCATION/release
RUN cp -R $BUILD_LOCATION/dist $BUILD_LOCATION/release/dist/
COPY --from=dependencies $DEPENDENCIES_LOCATION/prod $BUILD_LOCATION/release/node_modules
COPY package.json .env* $BUILD_LOCATION/release/

#
        # Realese stage, just set work directory,
        # copy content of realese directory from build stage and set command
        #
        FROM base as release
        WORKDIR /todo-api
        COPY --from=build $BUILD_LOCATION/release /todo-api
        CMD node dist/main.js
