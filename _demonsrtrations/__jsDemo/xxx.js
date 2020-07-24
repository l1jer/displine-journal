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

app.get("/api/customers", (req, res) => {
  const customers = [
    { id: 1, firstName: "John", lastName: "Doe" },
    { id: 2, firstName: "Jenny", lastName: "Joe" },
    { id: 3, firstName: "Danis", lastName: "Marry" },
  ];
  res.json(customers);
});

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
