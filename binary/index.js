/* 

What is binary code?
To understand what buffers are and the relationship between computers and binaries, let’s review the general concept of binary code.

For computers to understand, process, and store data, data has to be converted to binary code. This is mainly because the computer processor is made of transistors, electronic machines that are activated by on (1) and off (0) signals.

Every piece of data sent to the computer is first converted to binary by a microprocessor before processing and outputting the result. Therefore, it’s crucial to be able to distinguish between different data types. Through a process called encoding, the computer encodes dissimilar data types differently to tell one type from another.

*/

/*

Buffer.byteLength()
You can check the length of a buffer object with the Buffer.byteLength() method. 
The code below demonstrates how to create a buffer, 
attach a size to it, and check the size of the buffer you just created:

*/

const buff = Buffer.from('6');

console.log(Buffer.byteLength(buff)); // 6

/*

The Buffer.compare() method enables you to compare two buffer objects to check whether they are equal. This method returns -1, 0, or 1, depending on the result of the comparison.

You can compare buffer objects with the Buffer.compare() method as seen below:

*/

const buff2 = Buffer.from('61');

console.log(Buffer.compare(buff, buff2))

/* 

With Buffer.entries(), you can return a loop of indexes and bytes from the content of a buffer object, 
which is used to know the position and size of buffer contents:

*/

const buff3 = Buffer.from('hello');

buff3.entries().forEach((entry) => {
    console.log(entry, 'entry')
})

/* 

The Buffer.fill() method enables you to create a buffer, allocate a size, 
and fill it with a specified value. The expression below shows how to use the Buffer.fill() method:

*/

const buff4 = Buffer.alloc(8).fill('hello');

console.log(buff4); // hello