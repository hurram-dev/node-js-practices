import csv from 'csvtojson';
import fs from 'node:fs'

function exportCsvToTxt(): Promise<boolean> {
    return new Promise((resolve, reject) => {
        const csvReadStream = fs.createReadStream('./src/assets/books.csv');
        const txtWriteStream = fs.createWriteStream('./src/assets/books.txt');
        
        let hasError = false;

        // Handle read stream errors
        csvReadStream.on('error', (err) => {
            hasError = true;
            reject(err);
        });

        // Handle write stream errors
        txtWriteStream.on('error', (err) => {
            hasError = true;
            reject(err);
        });

        csv({ delimiter: ';' })
            .fromStream(csvReadStream)
            .subscribe(
                (jsonObj) => {
                    // Transform: extract only book, author, and price fields
                    const transformedObj = {
                        book: jsonObj.Book,
                        author: jsonObj.Author,
                        price: parseFloat(jsonObj.Price.replace(',', '.')) // Convert comma to dot
                    };

                    txtWriteStream.write(JSON.stringify(transformedObj) + '\n', (err) => {
                        if (err && !hasError) {
                            hasError = true;
                            reject(err);
                        }
                    });
                },
                (err) => {
                    // CSV parsing error
                    if (!hasError) {
                        hasError = true;
                        reject(err);
                    }
                },
                () => {
                    // Stream completed - end write stream and wait for finish
                    txtWriteStream.end(() => {
                        if (!hasError) {
                            resolve(true);
                        }
                    });
                }
            );
    });
}

exportCsvToTxt().then(() => {
    console.log("CSV data exported to TXT successfully.");
}).catch((error) => {
    console.error("Error exporting CSV to TXT:", error);
});