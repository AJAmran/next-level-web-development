console.log("1 start");

setTimeout(() => {
  console.log(" 2. time shes (macro-task");
}, 0);

Promise.resolve().then(() => {
  console.log("3. Promise solved (Micro-task");
});


console.log(" 4 shes")