# HNFT Timeline

We decided to open source the HNFT Timeline project to allow the community to contribute to the project.
Anyone can submit a project or event to be added to the timeline.

The timeline holds 2 types of items: projects and events.

Projects are NFT projects that have been launched on a blockchain, eg. CryptoPunks, Etheria, etc.
Events are any relevant events that have happened in the NFT space, eg. Namecoin creation, ERC-721 standard, etc.


## How to contribute

### To add / update a project or event
Update the corresponding metadata.json file in the data folder and submit a pull request.

### To contribute to the app
The primary goal of this project is to open source the HNFT timeline data, but PRs on the app itself are welcome!
The app is built with Nuxt. Refer to the README in the app folder for more information.



## File Structure
```
├── app
└── data
    ├── projects
    |   └── [project_slug]
    |        ├──  metadata.json
    |        └── image.jpg
    └── events
        └── [event_slug]
             ├── metadata.json
             └── image.jpg
```

## Data structures

### Project
#### Project interface
```
Project {
  name: string
  slug: string
  date: string
  description?: string
  creator: string
  links: Link[]
  network: string
}
```

#### Project example
```
{
  "name": "Etheria",
  "slug": "etheria",
  "date": "2015-10-19",
  "description": "In the modern era, Etheria ended up being the first true
  NFT project in history (by more than a year) and tiles are now traded on the Exchange page.",
  "creator": "Cyrus Adkisson",
  "links": [
     {
       "type": "Website",
       "url": "https://etheria.world/"
     },
     {
       "type" : "Twitter",
       "url": "https://twitter.com/etheriaworld",
     }
  ],
  "network": "Ethereum"
}

```
<br />

### Event
#### Event interface
```
{
  name: string
  slug: string
  date: string
}
```
#### Event example
```
{
  "name": "1st ERC-721 token",
  "slug": "1st-erc-721-token",
  "date": "2018-01-23"
}
```
<br />

### Link
#### Link interface
```
Link {
  type: string,
  url: string,
}
```
