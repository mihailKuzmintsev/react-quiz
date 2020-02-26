import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { logout } from "../../store/actions/auth";

export class Logout extends Component {
    componentDidMount() {
        console.log("logout", logout);
        this.props.logout();
    }

    render() {
        return <Redirect to={"/"} />;
    }
}

const mapDispatchToProps = {
    logout,
};

export default connect(null, mapDispatchToProps)(Logout);
