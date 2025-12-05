/*
The child_process module enables us to access 
Operating System functionalities by running any system command 
inside a child process. Hence, everything you can launch in shell 
you can run in a child process.
*/

/*
exec()
This method will spawn a subshell and execute the command 
in that shell and buffer generated data. It is useful 
when you want to invoke a command, and you only care about the final result, not 
about accessing the data from a child’s stdio streams as they come.
*/

const child_process = require('child_process')

const executeShellCommand = (command) => {
    child_process.exec(command, (error, stdout, stdin) => {
        console.log('output: ', stdout)
        console.log('input', stdin)
    })
}

executeShellCommand('ping epam.com')

/* 

execFile()
If you need to execute a file without using a shell, 
the execFile() function is what you need. It behaves exactly like the exec() function 
but does not use a shell, which makes it a bit more efficient.

*/

const executeFile = (command, args) => {
    child_process.execFile(command, args, (error, stdout, stdin) => {
        console.log('output', stdout)

        if(error) {
            console.log('error', error)
        }
    })
}

executeFile('node', ['../path/index.js'])