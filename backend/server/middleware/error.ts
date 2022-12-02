import { NextFunction, Request, Response } from "express";
import accepts from "accepts";
import { ResponseGenerator } from "../utils";
import { CommonError } from "../common";

export const errorMiddleware = (
  err: CommonError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accept = accepts(req);
  const type = accept.type("html", "json", "text");
  if (type === "json") {
    res.statusCode = err.status || 200;
    res.json(
      ResponseGenerator.fail({
        ...err,
        message: err.message || err.toString(),
      })
    );
  } else if (type === "text") {
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.end(err.message || err.toString());
  } else {
    const html = `<html>
    <head>
      <meta charset='utf-8'> 
      <title>${err.name}</title>
      <style>
        * {
            margin: 0;
            padding: 0;
            outline: 0;
        }
        body {
            padding: 80px 100px;
            font: 13px "Helvetica Neue", "Lucida Grande", "Arial";
            background: #ECE9E9 -webkit-gradient(linear, 0% 0%, 0% 100%, from(#fff), to(#ECE9E9));
            background: #ECE9E9 -moz-linear-gradient(top, #fff, #ECE9E9);
            background-repeat: no-repeat;
            color: #555;
            -webkit-font-smoothing: antialiased;
        }
        h1, h2 {
            font-size: 22px;
            color: #343434;
        }
        h1 em, h2 em {
            padding: 0 5px;
            font-weight: normal;
        }
        h1 {
            font-size: 60px;
        }
        h2 {
            margin-top: 10px;
        }
        ul li {
            list-style: none;
        }
        #stacktrace {
            margin-left: 60px;
        }
      </style>
    </head>
    <body>
      <div id="wrapper">
        <h1>${err.name}</h1>
        <h2><em>${err.status}</em> ${err.message}</h2>
        <ul id="stacktrace">${err.stack}</ul>
      </div>
    </body>
  </html>`;
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.end(html);
  }
};
