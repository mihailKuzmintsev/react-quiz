import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import classes from "./QuizList.module.scss";
import Loader from "../../components/UI/Loader/Loader";
import { connect } from "react-redux";
import { fetchQuizes } from "../../store/actions/quiz";

class QuizList extends Component {
    renderQuizes = () => {
        return this.props.quizes.map((quiz, index) => {
            return (
                <li key={quiz.id}>
                    <NavLink to={"/quiz/" + quiz.id}>{quiz.name}</NavLink>
                </li>
            );
        });
    };

    componentDidMount() {
        this.props.fetchQuizes();
    }

    render() {
        return (
            <div className={classes.QuizList}>
                <div>
                    <h1>Список тестов</h1>

                    {this.props.loading && this.props.quizes.length !== 0 ? (
                        <Loader />
                    ) : (
                        <ul>{this.renderQuizes()}</ul>
                    )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    quizes: state.quiz.quizes,
    loading: state.quiz.loading,
});

const mapDispatchToProps = {
    fetchQuizes,
};

export default connect(mapStateToProps, mapDispatchToProps)(QuizList);
