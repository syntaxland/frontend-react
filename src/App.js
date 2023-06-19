import "./App.css";
import { Container } from "react-bootstrap";
// This is a react-router-dom@5.3.4 app
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./components/screens/HomeScreen";
import ProductScreen from "./components/screens/ProductScreen";
import CartScreen from "./components/screens/CartScreen";
import LoginScreen from "./components/screens/LoginScreen";
import RegisterScreen from "./components/screens/RegisterScreen";

function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container fluid>
          <Route exact path="/" component={HomeScreen} />
          <Route path="/product/:id" component={ProductScreen} exact />
          <Route path="/login" component={LoginScreen} exact />
          <Route path="/register" component={RegisterScreen} exact />
          <Route path="/cart/:id?" component={CartScreen} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;

// Notes
// // This is a React Router v5 app npm i react-router-dom@5.3.4 app
// import {
//   BrowserRouter,
//   Switch,
//   Route,
//   Link,
//   useRouteMatch,
// } from "react-router-dom";

// function App() {
//   return (
//     <BrowserRouter>
//       <Switch>
//         <Route exact path="/">
//           <Home />
//         </Route>
//         <Route path="/users">
//           <Users />
//         </Route>
//       </Switch>
//     </BrowserRouter>
//   );
// }

// // This is a React Router v6 app
// import {
//   BrowserRouter,
//   Routes,
//   Route,
//   Link,
// } from "react-router-dom";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="users/*" element={<Users />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }
