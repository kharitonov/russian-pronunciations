# russian-pronunciations

demo using GH pages and heroku for the server/api: https://kharitonov.github.io/russian-pronunciations/


enter a russian word, get a list of declensions/conjugations and audio pronunciations

![alt text](https://github.com/kharitonov/russian-pronunciations/blob/master/screenshot.png)

copy and paste these for test words if you'd like: перевод, учить, огромный, ебать

a root word has to be used to get results. also there's no visual to indicate loading/pending request at the moment, but it can take like 8 seconds to render the results

built using create-react-app
 
using: cheerio, express, requests, node, react


it parses the wiktionary page for the root word, and then gets a list of pronunciations from forvo. it might be buggy due to the parsing
