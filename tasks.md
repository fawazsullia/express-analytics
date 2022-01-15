Recording what I need to create in this

Headers I have access to in the request object:
-> Date and time
-> User Agent
-> Cookies
-> request.socket.remoteAddress gives the ip address

Things I want to do:
-> Measure the total number of hits to the website
-> Measure the unique hits from the website, this can be from any page. As long as the api is getting a hit, it records
-> Understand where the traffic is coming from-> mobile or desktop
-> Understand the country where request is coming from
-> 

I can let the user do anything with the data by giving back a callback and running it from insdie the options object
Use https://ip-api.com/docs/api:json API to get the request country details
