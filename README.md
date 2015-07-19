# Omen | Spark
[![Build Status](https://travis-ci.org/thg2oo6/spark-omen.svg?branch=master)](https://travis-ci.org/thg2oo6/spark-omen)

Dependency manager for OpenEdge applications.

**Stable Version**: 0.1.5

**Unstable Version**: 0.2.1

## About

Omen is a Dependency manager for OpenEdge applications. Based on the configuration attached to it,
Omen can work with either public or private dependency repositories.

To use a private Omen Repository, have a look at [Omen Repo](http://github.com/thg2oo6/spark-omenrepo).

### What does Omen want to achieve?

Omen was designed as a solution to help developers install and manage packages/components inside an OpenEdge project.
Reusing components that have been proven to work will help the development teams achieve the desired result faster
and with less bugs. Also, if bugs are found in one of the packages, the maintainer can be notified and the bug fixed
not for just one project, but for every project that uses it.

## Windows Development

If development is being done on an Windows Machine, please adjust the windows.start.sample file and bin/omen.sample.
Rename them to have cmd extension and then run them.

## Install

To install Omen just simply type into a console:
```
npm -g install spark-omen
```

Omen will be installed globally, such that whenever you need it, you can use it.

## Usage

The following commands are available to the end user:

   * **[omen about](#omen-about)**
   * **[omen appserver](#omen-appserver)**
   * **[omen check](#omen-check)**
   * **[omen create](#omen-create)**
   * **[omen eclipse](#omen-eclipse)**
   * **[omen init](#omen-init)**
   * **[omen install](#omen-install)**
   * **[omen pack](#omen-pack)**
   * **[omen propath](#omen-propath)**
   * **[omen publish](#omen-publish)**
   * **[omen template](#omen-template)**
   * **[omen unpublish](#omen-unpublish)**
   * **[omen update](#omen-update)**
   * **[omen version](#omen-version)**

---
### <a name="omen-about"></a>omen about
Displays information about the current package.

**Command:**
```
omen about
```

### <a name="omen-appserver"></a>omen appserver
Creates the appserver configuration for the current project. It will ask the user to fill a port
and an operating mode (Stateless, state-free, state-reset, state-aware)

**Command:**
```
omen appserver (create|template)
```

**Arguments:**
   *  **template**
      * **description**: Generates the appserver folder and appserver ubroker.properties configuration.
      * **mandatory**: Yes
   *  **create**
      * **description**: Generates the appserver folder, appserver ubroker.properties configuration
      and tries to update the ubroker.properties file.
      * **mandatory**: Yes
      

### <a name="omen-check"></a>omen check
Checks the current project.json to be valid.

**Command:**
```
omen check [<type>]
```

**Arguments:**
   *  ***&lt;type&gt;***
      * **description**: Specifies the type of check to be done.
      * **mandatory**: No
      * **default value**: *information*
      * **posible values**:
         * *information* - Validates the project.json information.
         * *dependencies* - Checks the dependencies against the repository.
         * *all* - Checks both the filled information and the dependencies.

### <a name="omen-create"></a>omen create
Creates a new project with the given name

**Command:**
```
omen create <project-name> [--eclipse]
```

**Arguments:**
   * **&lt;project-name&gt;**
      * **description**: Specifies the name of the project.
      * **mandatory**: Yes
      * **default value**: none   
      
**Options:**
   * ***--eclipse/-e***
      * **description**: Triggers the eclipse components creation.
      * **mandatory**: No
      
### <a name="omen-eclipse"></a>omen eclipse
Initializes or updates eclipse components for the current project

**Command:**
```
omen eclipse (init | update)
```

**Arguments:**
  * **init**
     * **description**: Initializes the eclipse project components for the project, such that it could
be imported into Developer Studio.
     * **mandatory**: Yes    
  * **update**
     * **description**: Updates the eclipse project components for the project, such that it could
be imported into Developer Studio.
     * **mandatory**: Yes
     
### <a name="omen-init"></a>omen init
Init a project.json file in an existing location.

**Command:**
```
omen init <project-name> [--eclipse]
```

**Arguments:**
  * **&lt;project-name&gt;**
     * **description**: Specifies the name of the project.
     * **mandatory**: Yes
     * **default value**: none
     
**Options:**
   * ***--eclipse/-e***
      * **description**: Triggers the eclipse components creation.
      * **mandatory**: No

### <a name="omen-install"></a>omen install
Installs the dependencies defined in the project.json file. If a package is
specified then it will install the given package alongside the existing ones.

**Command:**
```
omen install [(--save) <package-name> <package-name> ...]
```

**Arguments:**
   * ***&lt;package-name&gt;***
      * **description**: Specifies the name of the package to be installed.
Can be repeated.
      * **mandatory**: No
      * **default value**: none

**Options:**
   * ***--save/-s***
      * **description**: Stores the new packages into the project.json file.
      * **mandatory**: No

### <a name="omen-pack"></a>omen pack
Packs the current project into a tar.gz archive.

**Command:**
```
omen pack
```

### <a name="omen-propath"></a>omen propath
Builds a correct PROPATH string to be used either in a .p file or in
appserver configuration.

**Command:**
```
omen propath [<type>]
```

**Arguments:**
   *  ***&lt;type&gt;***
      * **description**: Specifies the type of result to be displayed.
      * **mandatory**: No
      * **default value**: *full*
      * **posible values**:
         * *shell* - Builds the PROPATH string to be used in a SHELL script.
         * *appserver* - Builds the PROPATH string to be used in an AppServer configuration.
         * *full* - Builds the PROPATH string to be used in a .p file.

### <a name="omen-publish"></a>omen publish
Publishes the current project to the defined repository.

**Command:**
```
omen publish
```

### <a name="omen-template"></a>omen template
Generates a file based on the given template. If no template is given then
it uses a default sample template. To see all the available templates use
the "list" argument.

**Command:**
```
omen template [list | <template-name>]
```

**Arguments:**
   *  ***list***
      * **description**: Display a list with all the available templates.
      * **mandatory**: No
   *  ***&lt;template-name&gt;***
      * **description**: The name of the template to be generated.
      * **mandatory**: No
      * **default value**: sample
      
### <a name="omen-unpublish"></a>omen unpublish
Generates a file based on the given template. If no template is given then
it uses a default sample template. To see all the available templates use
the "list" argument.

**Command:**
```
omen unpublish (project | version [<version-name>])
```

**Arguments:**
   *  **project**
      * **description**: Unpublish the current project from the repository.
      * **mandatory**: Yes
   *  **version**
      * **description**: Unpublish the version from the repository.
      * **mandatory**: Yes
      * **options**:
         * ***&lt;version-name&gt;***
         * **description**: The version to unpublish
         * **mandatory**: No
         * **default-value**: The version specified in the project.json file

### <a name="omen-update"></a>omen update
Updates the installed dependencies based on the project.json and omen.lock
files. Works only if the omen.lock file has been created (dependencies
were installed).

**Command:**
```
omen update
```

### <a name="omen-version"></a>omen version
Displays information about the version of Omen.

**Command:**
```
omen version
```
