const promise = new Promise((resolve, reject) => {
    console.log("1");
    resolve("2");
}).then(result => console.log(result));

console.log("3");