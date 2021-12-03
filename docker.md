## create a docker image

1. docker build -t storyapp . 

## push image ( rakibulranak/storyhub:app ) in dockerhub

1. docker tag storyapp:latest rakibulranak/storyhub:app
2. docker push rakibulranak/storyhub:app 

## pulling and running in any machine

1. docker pull rakibulranak/storyhub:app
2. docker run -it -p 3000:8000 rakibulranak/storyhub/app

## browsing
1. go to http://localhost:3000/

## heroku
1. heroku container:login
2. heroku create mystoryhubapp  
3. heroku container:push web --app mystoryhubapp 
4. heroku container:release web --app mystoryhubapp 
5  heroku logs --tail --app mystoryhubapp  