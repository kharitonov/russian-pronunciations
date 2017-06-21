# russian-pronunciations
enter a russian word, get a list of declensions/conjugations and audio pronunciations

![alt text](https://github.com/kharitonov/russian-pronunciations/blob/master/screenshot.png)

demo using GH pages and heroku for the server/api: https://kharitonov.github.io/russian-pronunciations/

copy and paste these for test words if you'd like: перевод, учить, огромный, ебать

a root word has to be used to get results

built using create-react-app
 
using: cheerio, express, requests, node, react


it parses the wiktionary page for the root word, and then gets a list of pronunciations from forvo. it might be buggy due to the parsing




<br/><br/>
<b>to do:</b>

better formatting for longer results

remove useless entries from the returned results, ie: будем знать 

add option to clear previous results on new search

change the search to find the root word if a conjugation / declension is searched

add a 'no results found' visual

add a root word definition somewhere

allow it to parse other languages

lower the volume