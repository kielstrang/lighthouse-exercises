var array = [10, 2, 5, 1, 9];
array.sort(function (a, b) {
  return a - b;
});
console.log('Numeric sorted array: ', array);

var students = [
  { id: 1, name: "bruce",    age: 40 },
  { id: 2, name: "zoidberg", age: 22 },
  { id: 3, name: "alex",     age: 22 },
  { id: 4, name: "alex",     age: 30 }
];

students.sort(function (a, b) {
  if(a.name === b.name) {
    return a.age - b.age;
  } else {
    return a.name > b.name ? 1 : -1;
  }
});
console.log('Sorted students: ', students);