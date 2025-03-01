export type Request = {
  data: any;
  url: string;
};

export type Response = {
  data: any;
  request: {
    responseURL: string;
    url: string;
  };
  url: string;
};
