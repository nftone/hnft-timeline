

## Project File Structure
```
├── ...
 └── data
     └── projects
          └── projects_slug
              └── metadata.json
```

## Interface Project
```
Link [{
  	description: string,
  	url: lien
}]

{
  id: number;
  name: string;
  date: string;
  description: string;
  creator: string;
  Link[]: {
      description : “Official”,
      url : string,
      logo : “icone”
  },
  {
      description : “Twitter”,
      url: string,
      logo : “icone”
  },
  {
      description : “Discord”,
      url: string,
      logo : “icone”
  },
  {
      description : “Instagram”,
      url: string,
      logo : “icone”
  }
  network: string;
  slug: string;
}

```

## Event File Structure
```
├── ...
 └── data
     └── events
          └── events_slug
              └── metadata.json
```


## Interface Event
```
{
  id: number;
  name: string;
  date: string;
  description: string;
  creator: string;
  Link[]: {
      description : “Official”,
      url : string,
      logo : “icone”
  },
  {
      description : “Twitter”,
      url: string,
      logo : “icone”
  },
  {
      description : “Discord”,
      url: string,
      logo : “icone”
  },
  {
      description : “Instagram”,
      url: string,
      logo : “icone”
  }
  network: string;
  slug: string;
}
```

## Here an example
```
name: "Etheria World";
date: "2015-10-19";
description: "In the modern era, Etheria ended up being the first true
NFT project in history (by more than a year) and tiles are now traded on the Exchange page.";
creator: "Cyrus Adkisson";
Link[]: {
    description : “Official”,
    url : "https://etheria.world/",
    logo : “ ”
},
{
    description : “Twitter”,
    url: "https://twitter.com/etheriaworld",
    logo : " "
},
{
    description : “Discord”,
    url: "https://discord.com/invite/etheriaworld",
    logo : " "
},
{
    description : “Instagram”,
    url: "https://instagram.com/etheriawordl",
    logo : " "
}
network: "Ethereum";
slug: "etheria world";
```
