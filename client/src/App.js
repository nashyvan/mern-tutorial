import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [listOfUsers, setListOfUsers] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [username, setUsername] = useState("");

  useEffect(() => {
      axios.get("http://localhost:3001/getUsers")
          .then((response) => {
              setListOfUsers(response.data);
          });
  }, []);

  const createUser = () => {
      axios.post("http://localhost:3001/createUser", {name: name, age: age, username: username})
          .then((response) => {
              setListOfUsers([...listOfUsers, {name:name, age:age, username:username}])
          })
  }

  return (
    <div className="App">
      <div className="usersDisplay">
          {listOfUsers.map((user) => {
              return (
                <div>
                    <h1>Name: {user.name}</h1>
                    <h1>Age: {user.age}</h1>
                    <h1>Username: {user.username}</h1>
                    <hr/>
                </div>
              );
          })}
      </div>
      <div>
          <input type="text" placeholder="name" onChange={(event) => {setName(event.target.value);}} />
          <input type="number" placeholder="age" onChange={(event) => {setAge(event.target.value);}} />
          <input type="text" placeholder="username" onChange={(event) => {setUsername(event.target.value);}}/>
          <button onClick={createUser}>Create User</button>
      </div>
    </div>
  );
}

export default App;
