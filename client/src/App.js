import './App.css';
import Header from './components/Header';
import React from "react";
import Footer from './components/Footer';
import Login from './pages/Login';
import { Switch, Route, Redirect } from 'react-router-dom';
import Register from './pages/Register';
import TaskList from './pages/TaskList';
import CreateTask from './pages/CreateTask';
import TaskViewEdit from './pages/TaskViewEdit';


function App() {

  return (
    <div>
      <Header/>
      <div className="main-body">
        <div className="container">
          <Switch>
            <Route exact path={'/login'} component={Login}/>
            <Route exact path={'/register'} component={Register}/>
            <Route exact path={'/'} component={TaskList}/>
            <Route exact path={'/task/new'} component={CreateTask}/>
            <Route exact path={'/task/:id'} component={TaskViewEdit}/>
            <Redirect to={'/'} from={'**'}/>
            <Route exact path={'*'}>
              <TaskList/>
            </Route>
          </Switch>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
