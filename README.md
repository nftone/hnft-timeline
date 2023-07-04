TODOS
Instructions for the community


Nouvelle interface :

Link [{
  	description: string,
  	url: lien
}]

interface Project {
    date: string;
    id: number;
    name: string;
    creator: string;
    image: string;
    description: string;
    (category : (Art, Gaming, Music…); à mettre en place plus tard)
    Link[]: {
        	description : “Official”,
        	url :
        	logo : “icone”
  	     },
        	description : “Twitter”,
        	url:
          logo : “icone”
        },
        {
        	description : “Discord”,
        	url:
        	logo : “icone”
        },
        {
        	description : “Instagram”,
        	url:
        	logo : “icone”
        },
        };
   	network: string;
    slug: string;
}


Ancienne interface
Interface actuelle pour les projets (actuellement timeline items)

```
interface Project {
date: string;
 	id: number;
image: string;
links: Link[];
 	name: string;
network: string; ?
slug: string; ?
}
