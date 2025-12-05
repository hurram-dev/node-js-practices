// The path.basename(path[, ext]) returns the last portion of a specified path. For example
const path = require('path')

const result = path.basename('file-system/index.js')

const result2 = path.basename('file-system/index.js', '.js')

console.log(result, result2)

// dirname() The path.dirname(path) method returns the directory name of a specified path. For example:
const directoryName = path.dirname('file-system/index.js')

console.log(directoryName)

// extname() The path.extname(path) returns extension of the path. For example:

const extenstionName = path.extname('README.md')

console.log(extenstionName)

// format() he path.format(pathObj) method returns a path string from a specified path object.

const pathToFile = path.format({
    dir: 'path',
    base: 'index.js'
})

console.log(pathToFile)

// isAbsolute() The path.isAbsolute(path) returns true if a specified path is an absolute path.

const isAbsolutePath = path.isAbsolute('/file-system')

console.log(isAbsolutePath)