import React, { Component } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import Layout from "./hoc/Layout/Layout";
import Quiz from "./containers/Quiz/Quiz";
import QuizCreator from "./containers/QuizCreator/QuizCreator";
import QuizList from "./containers/QuizList/QuizList";
import Auth from "./containers/Auth/Auth";
import { connect } from "react-redux";
import { Logout } from "./components/Logout/Logout";
import { autoLogin } from "./store/actions/auth";

class App extends Component {
    componentDidMount() {
        this.props.autoLogin();
    }

    render() {
        let routes = (
            <Switch>
                <Route path='/auth' component={Auth}></Route>
                <Route path='/quiz/:id' component={Quiz}></Route>
                <Route path='/' component={QuizList}></Route>
                <Redirect to='/'></Redirect>
            </Switch>
        );

        if (this.props.isAuthenticated) {
            routes = (
                <Switch>
                    <Route path='/quiz-creator' component={QuizCreator}></Route>
                    <Route path='/quiz/:id' component={Quiz}></Route>
                    <Route path='/logout' component={Logout}></Route>
                    <Route path='/' component={QuizList}></Route>
                    <Redirect to='/'></Redirect>
                </Switch>
            );
        }

        return <Layout>{routes}</Layout>;
    }
}

function mapStateToProps(state) {
    return {
        isAuthenticated: !!state.auth.token,
    };
}

const mapDispatchToProps = {
    autoLogin,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
