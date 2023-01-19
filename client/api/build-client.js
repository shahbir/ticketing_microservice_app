import axios from "axios";

export default ({ req }) => {
  if (typeof window === "undefined") {
    // We are on the server

    return axios.create({
      baseURL:
        "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
      // "http://10.102.39.84 ",
      // "http://ingress-nginx-controller.ingress-nginx",
      headers: req.headers,
      // headers: {
      //   Host: "ticketing.dev",
      // },
    });
  } else {
    // We must be on the browser
    return axios.create({
      baseUrl: "/",
    });
  }
};
