export type link = {
  url: string;
  modifiedUrl: string;
}

export type user = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export type customLink = {
  originalLink: string;
  customLink: string;
  click: number;
  user: string;
}