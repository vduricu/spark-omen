# Omen | Spark - CHANGELOG
[![Build Status](https://travis-ci.org/thg2oo6/spark-omen.svg?branch=master)](https://travis-ci.org/thg2oo6/spark-omen)

Dependency manager for OpenEdge applications.

## Version 0.2.x (Latest: 0.2.3)

### Version 0.2.3

Changes performed to the current version:
   * added repository field to the project.json
   * added the adduser command - used to login and create new user
   * modified the protocol to publish/unpublish project - use token based authentication
   * updated OmenAPI to create a config file in the userdir
   * use config file in userdir for various things (authentication token, which config repository to be used)

### Version 0.2.2

Changes performed to the current version:
   * added the commandName property to the CommandOmen base class
   * changed the argument received by the commands to be the list of
   arguments passed in the shell
   * use the filename stored in the base CommandOmen class
   * converted filename and cli to be properties instead of methods
   * code refactoring
   * extracted general functionality into general purpose module
   * Ui display using events - can be easily extended for testing framework
   * extended Exception classes
   * changed from nodeunit to mocha + istanbul for code coverage

### Version 0.2.1

Changes performed to the current version:
   * Added tags to the npm project
   * init command - init a project.json file into an existing folder
   * updated create command to support the creation of eclipse project
   * eclipse command - inits or updates an project with eclipse components
   * various bugfixes
   * unpublish command - unpublishes the project/version from the repository
   * hookup system to be able to run command line commands before/after the
   execution of an omen command
   * appserver command - creates the configuration elements for appserver usage

--- 

## Version 0.1.x (Latest: 0.1.5)
    
Initial version of the application. A features list is shown below:
   * create, install, update, check commands
   * basic unit tests
   * promises
   * list with installed dependencies
   * folder compression and publishing
   * propath, template commands
   * pack and publish commands
   * quick install and update of dependencies