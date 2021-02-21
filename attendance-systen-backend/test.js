const data = [
  {
    data: '1',
  },
  {
    data: '2',
  },
  {
    data: '3',
  },
  {
    data: '4',
  },
  {
    data: '5',
  },
  {
    data: '6',
  },
];

const arr = [...data];

arr.splice(1, arr.length - 2);

console.log(arr);
