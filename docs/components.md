# Project File description

An Omen project file is described by the following elements: *v0.1.1*

   * **name** *: the name of the package
   * **version** *: the version of the package
   * **description**: a short description of the package
   * **keywords**: some keywords that help identify your package
   * **homepage**: an URL to the package website
   * **license**: an URL to the license of the package
   * **author**: the author of the package
      * example: {"name": "Gigel", "email": "gigel@dorel.com"}
   * **contributors**: a list with contributors
      * example: [{"name": "Gigel", "email": "gigel@dorel.com"},{"name": "Gigel", "email": "gigel@dorel.com"}]
   * **dependencies**: a list with all the dependencies of the current package
      * example: "pacakge": ">2.3.0"
      * modifiers:
         * "2.3.0" - Exact version
         * ">=2.3.0" - First version available greater or equal than given
         * ">2.3.0" - First version available greater than given
         * "2.\*" - Latest version of (latest sub version of, latest patch of)
         * "<=2.3.0" - First version available less or equal than given
         * "<2.3.0" - First version available less than given
   * **src**: the location of the sources, relative to the project path
      * example: "src" or "source" or "com"
   * **scripts**: a list of scripts to be executed pre/post the execution of a command
      * example: post-install-cmd: ["npm install -g grunt", "rm -rf /"]
      * structure: **post/pre** - &lt;command&gt; - **cmd**
         * examples: post-install-cmd, pre-update-cmd, post-eclipse-cmd


```javascript
{
    "name": "spark-omen",
    "version": "1.0.3",
    "description": "Sample package",
    "keywords": [ "sample", "package", "omen" ],
    "homepage": "http://omen.duricu.ro",
    "license": "http://asd.omen.duricu.ro",
    "src": "sources",
    "author": {
        "name": "Gigel Frone",
        "email": "gigel@duricu.ro"
    },
    "contributors": [
        {"name": "Gigel", "email": "gigel@dorel.com"},
        {"name": "Dorel", "email": "dorel@dorel.com"}
    ],
    "dependencies": {
        "auth": "1.0.1",
        "session": "1.0.3"
    },
    "scripts": {
        "post-install-cmd": [
            "echo 'aaa'"
        ]
    }
}
```