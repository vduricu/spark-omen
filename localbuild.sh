rm -rf ./docs/api
jsdoc --verbose -d ./docs/api -r -R README.md engine
npm test
