# Express Analytics

### Express analytics is a npm package that provides express middleware to measure the nature of visits to your website

## Features

- Track total number of hits to your site
- Nature of device from where the traffic is coming from
- Geographic data : country, region, timezone

## Upcoming features

- Is the hit unique?
- Operating system of origin
- Browser of request

## How to use

This is an express middleware. To use the package, your server needs to use express.

To install express, use the command
` npm install express`

Details about express [here](https://www.npmjs.com/package/express)

To install the package, use command 
`npm install express-analytics`

Require the package in your server
`const expressAnalytics = require('express-analytics)`

Add the package as a middleware
`app.use(expressAnalytics(options))`

The function takes an object as it's argument. One of the value in the object is a callback function which gives you access to the details regarding the request.
Example code below:

```
const getAnalytics = (hit, deviceType, country, region, timeZone)=>{
//do stuff with data here

}

let options = {
cb : getAnalytics
}

app.use(expressAnalytics(options))

```

### Definitions
- hit -> is always 1
- deviceType -> gives you the device type where the request was sent from (mobile, desktop or tablet)
- country ->  country where the request came from
- region ->  region/state from where the request came from
- timeZone -> time zone of origin of request

### What to do inside the function?
The ideal use case is to write to a database ( table based is better ) or write to a file. 

### I will keep updating this package to support more and more features. If you'd like to contribute, please get in touch : fawazsullia@gmail.com


## Note: The package has not been tested. Please use at your own risk
