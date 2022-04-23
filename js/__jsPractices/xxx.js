// npm i express concurrently

//package.json
// "script":{
//    "client install":"cd client && npm install",
//     "start":"node server.js",
//     "server":"nodemon server.js"
//     "client":"npm start --prefix client"
//      "dev":"concurrently \"npm run server\" \"npm run client\""
// }

// touch server.js (app.js)
// code server.js

// app.get("/api/customers", (req, res) => {
//   const customers = [
//     { id: 1, firstName: "John", lastName: "Doe" },
//     { id: 2, firstName: "Jenny", lastName: "Joe" },
//     { id: 3, firstName: "Danis", lastName: "Marry" },
//   ];
//   res.json(customers);
// });

//define url in package.json
//"proxy":"http://localhost:5000"

// component file
// customer.js
/*
 class Customers extends Component{
     constructor(){
         super();
         this.state={
             customers:[]
         }
     }

     componentDidMount(){
         fetch('/api/customers')
         .then(res=>res.json())
         .then(customers => this.setState({customers}, ()=>console.log('Customer Fetched...', customers)));
     }

     render(){
         return(
             <div>
                <h2>customers</h2>
                <ul>
                {this.state.customers.map(customer => <li key={customer.id}> {customer.firstName} {customer.lastName}</li>)}
             </div>
         )
     }
 }
*/
// let letters = ["A", "B", "C", "D", "E"];

// for (let i = 0; i < letters.length; i += 1) {
//   let currentLetters = letters[i];
//   console.log(i, currentLetters);
// }

// function logLetter(currentLetters, index) {
//   console.log(index, currentLetters);
// }

// letters.forEach(logLetter);

// let n = [1, 2, 3, 4, 5, 6];

// function isEven(num) {
//   //   console.log(num % 2);
//   let result = num % 2 === 0;
//   return result;
// }

// function evenNums() {
//   let evenNums = n.filter(isEven);
//   console.log(evenNums);
// }

// evenNums();

// let names = [
//   "rob",
//   "manijeh",
//   "rich",
//   "haden",
//   "ben",
//   "jiarui",
//   "matt",
//   "emma",
// ];

// function filterNames(currentName) {
//   let search = "r";
//   let result = currentName.startsWith(search);
//   return result;
// }

// let namesStartWithR = names.filter(filterNames);
// console.log(namesStartWithR);

// function getNames(searchTerm) {
//   function filterNames(currentName) {
//     let result = currentName.startsWith(searchTerm);
//     return result;
//   }
// }

// getNames("m");

// let scores = [0.5, 0.88, 0.91, 0.55, 0.64];

// function toPercentage(num) {
//   let res = num * 100;
//   return res + "%";
// }

// let percentages = scores.map(toPercentage);
// console.log(percentages);

let todos = ["Learn .forEach", "Learn .filter", "Learn .map", "Learn .reduce"];

function toListItem(task) {
  let li = document.createElement("li");
  li.innerText = task;
  return li;
}

let todoDomNodes = todos.map(toListItem);
let list = document.querySelector("ul");

function appendToList(node) {
  list.appendChild(node);
}
todoDomNodes.forEach(appendToList);
