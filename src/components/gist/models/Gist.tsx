export interface GistFile {
  filename: string;
  language: string;
  raw_url: string;
  size: number;
  type: string;
}

export interface Owner {
  id: string;
  login: string;
}

export interface ForkUser {
  id: string;
  owner: Owner;
}

export interface Gist {
  id: string;
  files: { [key: string]: GistFile };
  forks_url: string;
  description: string;
}
