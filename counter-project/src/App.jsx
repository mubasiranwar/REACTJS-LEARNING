
// import { useEffect, useState } from "react";

// function App() {
//   const [count, setCount] = useState(0)
//    console.log("App rendered")
//   return (
//     <>
//       <h1>Value: {count}</h1>

//       <button onClick={() => setCount(prev => prev + 3)}>
//         Increment +3
//       </button>

//       <button onClick={() => setCount(prev => prev + 5)}>
//         Increment +5
//       </button>

//       <button onClick={() => setCount(prev => prev + 10)}>
//         Increment +10
//       </button>

//       <button
//         onClick={() =>
//           setCount(prev => Math.max(0, prev - 1))
//         }
//       >
//         Decrement
//       </button>

//       <button onClick={() => setCount(0)}>
//         Reset
//       </button>
//     </>
//   )
// }

// export default App



// function Header() {
//   console.log("Header rendered")

//   return <h1>My App</h1>
// }

// function Counter() {
//   const [count, setCount] = useState(0)

//   console.log("Counter rendered")

//   return (
//     <>
//       <p>{count}</p>

//       <button onClick={() => setCount(prev => prev + 1)}>
//         +
//       </button>
//     </>
//   )
// }

// function App() {
//   console.log("App rendered")

//   return (
//     <>
//       <Header />
//       <Counter />
//     </>
//   )
// } 

// export default App

// function Greeting({ name }) {
//   return <h1>Hello, {name}!</h1>
// }


// function Usecard({ name, role, experience, handleDelete }) {
//   return (
//     <div>
//       <p>------------------------------</p>
//       <h1>{name}</h1>
//       <p>{role}</p>
//       <p>{experience} years of experience</p>



//       <button onClick={() => handleDelete(name)}>Delete User</button>


//     </div>
//   )
// }

// function InputForm({ onAddUser }) {
//   console.log("InputForm rendered")
//   const [name, setName] = useState("");
//   const [role, setRole] = useState("");
//   const [experience, setExperience] = useState("");




//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onAddUser({ name, role, experience });
//     setName("");
//     setRole("");
//     setExperience("");
//   };


//   return (
//     <form onSubmit={handleSubmit}>
//       <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
//       <input type="text" value={role} onChange={(e) => setRole(e.target.value)} placeholder="Role" />
//       <input type="number" value={experience} onChange={(e) => setExperience(e.target.value)} placeholder="Experience" />
//       <button type="submit">Add User</button>
//     </form>
//   )
// }



// function App() {
//   const [users, setUsers] = useState([
//     { name: "Mubasir Anwar", role: "AI Engineer", experience: 2 },
//     { name: "ALi", role: "Network Engineer", experience: 1 },
//     { name: "Shahab", role: "UX Designer", experience: 3 }
//   ]);

//   useEffect(() => {
//     console.log("Users changed");
//   }, [users]);


// //   useEffect(() => {
// //   // runs after every render
// // });


// // useEffect(() => {
// //   // runs after initial render
// // }, []);


// // useEffect(() => {
// //   // runs when users changes
// // }, [users]);

//   function handleDelete(name) {
//     console.log("User Deleted : " + name)
//     setUsers(prevUsers => prevUsers.filter(user => user.name !== name))
//   }

//   function handleAddUser(user) {
//     console.log("User Added : " + user.name)
//     setUsers(prevUsers => [...prevUsers, user])
//   }



//   return (
//     <>
//       <InputForm onAddUser={handleAddUser} />
//       {users.map((user, index) => (
//         <Usecard
//           key={index}
//           name={user.name}
//           role={user.role}
//           experience={user.experience}
//           handleDelete={handleDelete}
//         />
//       ))}
//     </>
//   )
// }




//----Learning useEffect Hook in React JS----

// function App() {
//   const [count, setCount] = useState(0);
//   const [name, setName] = useState("Mubasir Anwar");

//   useEffect(() => {
//     console.log("Effect ran");
//   },[count]);

//   return (
//     <>
//       <h1>{count}</h1>

//       <button onClick={() => setCount(count + 1)}>
//         +
//       </button>
//       <p>{name}</p>
//     </>
//   );
// }





// ======Featching Data from API using useEffect Hook in React JS======


// function App() {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     async function getUsers() {
//       try {
//         const response = await fetch(
//           "https://jsonplaceholder.typicode.com/users"
//         );

//         if (!response.ok) {
//           throw new Error("Failed to fetch users");
//         }

//         const data = await response.json();

//         setUsers(data);
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     }

//     getUsers();
//   }, []);
//   return (
//     <>
//       {users.map(user => (
//         <p key={user.id} >Name: {user.name}, Email: {user.email}</p>
//       ))}
//     </>
//   );
// }



// =====Broweser Router in React JS using React Router Dom Library=====

import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useParams
} from "react-router-dom";

import { useEffect, useState } from "react";

function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link> |{" "}
      <Link to="/users">Users</Link> |{" "}
      <Link to="/about">About</Link>
    </nav>
  );
}

function Home() {
  return <h1>Home Page</h1>;
}

function Users() {
  return (
    <>
      <h1>Users Page</h1>

      <ul>
        <li>
          <Link to="/users/1">User 1</Link>
        </li>

        <li>
          <Link to="/users/2">User 2</Link>
        </li>

        <li>
          <Link to="/users/3">User 3</Link>
        </li>
      </ul>
    </>
  );
}

function UserDetails() {
  const { id } = useParams();

  const [user, setUser] = useState(null);

  useEffect(() => {
    async function getUser() {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${id}`
      );

      const data = await response.json();

      setUser(data);
    }

    getUser();
  }, [id]);

  if (!user) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <h1>{user.name}</h1>

      <p>Username: {user.username}</p>

      <p>Email: {user.email}</p>

      <p>Phone: {user.phone}</p>

      <p>Website: {user.website}</p>
    </>
  );
}

function About() {
  return <h1>About Page</h1>;
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/users" element={<Users />} />

        <Route path="/users/:id" element={<UserDetails />} />

        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;



