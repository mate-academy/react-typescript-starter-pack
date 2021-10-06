/// <reference types="react-scripts" />

interface Article {
  id?: string;
  webPublicationDate: string;
  webTitle?: string;
  fields?: Fields;
}

interface Fields {
  bodyText?: string;
  main?: string;
}
