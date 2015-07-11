# Omen | Spark
[![Build Status](https://travis-ci.org/thg2oo6/spark-omen.svg?branch=master)](https://travis-ci.org/thg2oo6/spark-omen)

Dependency manager for OpenEdge applications.

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
   * **[omen check](#omen-check)**
   * **[omen create](#omen-create)**
   * **[omen install](#omen-install)**
   * **[omen pack](#omen-pack)**
   * **[omen propath](#omen-propath)**
   * **[omen publish](#omen-publish)**
   * **[omen template](#omen-template)**
   * **[omen update](#omen-update)**
   * **[omen version](#omen-version)**

---
### <a name="omen-about"></a>omen about
Displays information about the current package.

**Command:**
```
omen about
```

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
Displays information about the current package.

**Command:**
```
omen create <project-name>
```

**Arguments:**
   * **&lt;project-name&gt;**
      * **description**: Specifies the name of the project.
      * **mandatory**: Yes
      * **default value**: none

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
