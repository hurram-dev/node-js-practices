import { exec } from 'child_process';
import { appendFile, appendFileSync, existsSync, readdirSync, readFileSync } from 'fs';
import { createHash } from 'crypto';
// TODO
// #1: get args while running scripts
// #2: backup generation
// #3: check changes in the source directory if change detected then only create backup, if not, skip backup creation
// #4 create backup log file for tracking the process
const calculateDirectoryChecksum = async (str: string): Promise<string> => createHash('sha256').update(str, 'utf8').digest('hex');
const args = process.argv.slice(2);

const sourceDir = args[0] as string;
const destinationDir = args[1] as string;

const executeBackupCommand = async (src: string, dest: string) => {
    const backupFilePath = `${dest}/backup-${new Date().toISOString()}.tar.gz`;
    const command = `tar -czf ${backupFilePath} -C ${src} .`;

    const srcDirectoryContents = readdirSync(sourceDir, { withFileTypes: true }).map(dirent => dirent.name).join(',');

    const hash = await calculateDirectoryChecksum(srcDirectoryContents);
    const logFilePath = `${dest}/backup-log.txt`;
    let readPrevHash: string | undefined;
    if (existsSync(logFilePath)) {
        const logContent = readFileSync(logFilePath, 'utf-8');
        const lastHashLine = logContent.split('\n').reverse().find(line => line.includes('HASH: '));
        readPrevHash = lastHashLine?.split('HASH: ').pop()?.trim();
    }

    if (readPrevHash === hash) {
        console.log("No changes detected in source directory. Skipping backup creation.");
        return;
    }



    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing backup command: ${error.message}`);
            appendFileSync(logFilePath, `${new Date().toISOString()}: ERROR: ${error.message}\n`);
            return;
        }
        appendFile(logFilePath, `${new Date().toISOString()}: SUCCESS: Backup created at ${backupFilePath}, HASH: ${hash}\n`, (err) => {
            if (err) {
                console.error("Error writing to log file:", err);
            }
        })

        console.log("Backup created successfully:", stdout);
        console.log("stderr:", stderr);
    })
}


executeBackupCommand(sourceDir, destinationDir);



console.log(args)

