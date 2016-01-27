# Speech Recognition Service
A very simple interface for speech recognition. This first version just uses [Wit.ai](https://wit.ai) as a backend.

# Requirements
- Docker environment running

# Instructions
- Use `./service` to build and run a container with the app
  - Create a file named `local.json` with the values for the Wit.ai access token and docker registry to use, such as:
  ```
  {
    "witAccessToken" : "XXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "dockerRegistry" : "myuser/speech"
  }
  ```


# Tips
## Record audio using the console
`sox -d -b 16 -c 1 -r 16k amy_short.wav` just press `CTRL-C` when done

## HTTP Requests
Look at [httpie](https://github.com/jkbrzt/httpie) as a replacement of curl to maintain your sanity.

# API
## Speech
```
> http "http://$(docker-machine ip dev):3000/v1/speech" < data/amy_short.wav

HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 227
Content-Type: application/json; charset=utf-8
Date: Sun, 24 Jan 2016 11:06:09 GMT
ETag: W/"e3-ex14DLM3GovwJx0RhA39vw"
X-Powered-By: Express

{
    "_text": "where is amy",
    "msg_id": "ac7e9608-bad1-4ffa-a146-742595e82514",
    "outcomes": [
        {
            "_text": "where is amy",
            "confidence": 0.551,
            "entities": {
                "contact": [
                    {
                        "suggested": true,
                        "type": "value",
                        "value": "amy"
                    }
                ]
            },
            "intent": "locate_people"
        }
    ]
}
```

## Text
```
> http "http://$(docker-machine ip dev):3000/v1/text?q=Where is Jennifer?"
HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 244
Content-Type: application/json; charset=utf-8
Date: Sun, 24 Jan 2016 11:09:17 GMT
ETag: W/"f4-esag/jfwHvN63/YypjT85g"
X-Powered-By: Express

{
    "_text": "Where is Jennifer?",
    "msg_id": "fb8053fd-6897-44c0-ba97-be62cf10df3b",
    "outcomes": [
        {
            "_text": "Where is Jennifer?",
            "confidence": 0.551,
            "entities": {
                "contact": [
                    {
                        "suggested": true,
                        "type": "value",
                        "value": "Jennifer"
                    }
                ]
            },
            "intent": "locate_people"
        }
    ]
}
```
