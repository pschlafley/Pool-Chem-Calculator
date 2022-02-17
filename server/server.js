import express from "express";
import fs from 'fs';
import path from 'path';

import React from '../client/node_modules/react';
import reactDomServer from '../client/node_modules/react-dom/server';
import { StaticRouter } from '../client/node_modules/react-router-dom/server';
import App from '../client/src/App';

import StyleContext from 'isomorphic-style-loader/StyleContext'

const PORT = process.env.PORT || 3001;

const app = express();

app.use('^/$', (req, res, next) => {
    const css = new Set() // CSS for all rendered React Components
    const insertCss = (...styles) => styles.forEach(style => css.add(style._getCss()))

    const body = reactDomServer.renderToString(
        <StaticRouter location={req.url}>
            <StyleContext.Provider value={insertCss}>
                <App />
            </StyleContext.Provider>
        </StaticRouter>);

    fs.readFile(path.resolve('../client/build/index.html'), 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).send('an error occured');
        };

        return res.send(data.replace(
            '<div id="root"></div>',
            `
            <!DOCTYPE html>
            <html lang="en">
                <head>
		            <meta charset="utf-8" />
		            <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
		            <meta name="viewport" content="width=device-width, initial-scale=1" />
		            <meta name="theme-color" content="#000000" />
		            <meta
			            name="description"
			            content="Web site created using create-react-app"
		            />

		            <meta name="author" content="Peyton Schlafley, Tom Chestnut" />
                    <meta property="og:description" content="Pool Calculator" />
                    <meta property="og:url" content="" />
                    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />

                    <style>${[...css].join('')}</style>
                    <title>Pool Calculator</title>
	            </head>
                <body>
                    <div id="root">${body}</div>
                    <script src="bundle.js"></script>
                </body>
            </html>
            `
        ))
    })
})

app.use(express.static(path.resolve(__dirname, "..", 'build')));

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));