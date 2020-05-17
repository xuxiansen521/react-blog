import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom"
import Index from "./index";
import List from "./list";
import Detailed from "./detailed";
import Record from "./record";

function Main() {
    return (
        <Router>
            <Route path="/" exact component={Index}></Route>
            <Route path="/list/:type" component={List}></Route>
            <Route path="/detailed/:id" component={Detailed}></Route>
            <Route path="/record" component={Record}></Route>
        </Router>
    )
}

export default Main