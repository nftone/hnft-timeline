interface Link {
  name: string;
  image: string;
}

interface Network {
  name: string;
  image: string;
}

interface Taxonomy {
  linkTypes: Link[];
  networks: Network[];
}
