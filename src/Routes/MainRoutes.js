import React from 'react'
import {BrowserRouter as Router , Route, Switch} from 'react-router-dom'
import Home from '../Pages/Home'
import Signup from '../Pages/Signup'
import Login from '../Pages/Login'
import CreatePost from '../Pages/CreatePost'
import ViewPost from '../Pages/ViewPost'
import ViewMore from '../Pages/ViewMore'
import EditPost from '../Pages/EditPost'
import MyPosts from '../Pages/MyPosts'
import NotFound from '../Pages/NotFound'




function MainRoutes() {
    return (
       <Router>
           <Switch>
            <Route exact path="/">
                <Home/>
            </Route>
            <Route path="/signup">
                <Signup/>
            </Route>
            <Route path="/login">
                <Login/>
            </Route>
            <Route path="/create">
                <CreatePost/>
            </Route>
            <Route path="/view">
                <ViewPost/>
            </Route>
            <Route path="/viewmore">
                <ViewMore/>
            </Route>
            <Route path="/edit/:id">
                <EditPost/>
            </Route>
            <Route path="/my-posts">
                <MyPosts/>
            </Route>
            <Route>
                <NotFound/>
            </Route>
           </Switch>
       </Router>
    )
}

export default MainRoutes
