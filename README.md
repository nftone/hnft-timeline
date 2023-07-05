

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
