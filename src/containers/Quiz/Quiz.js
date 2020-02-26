import React, { Component } from "react";
import classes from "./Quiz.module.scss";
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import Loader from "../../components/UI/Loader/Loader";
import { connect } from "react-redux";
import { fetchQuizById, quizAnswerClick, retryQuiz } from "../../store/actions/quiz";

class Quiz extends Component {
    componentDidMount() {
        this.props.fetchQuizById(this.props.match.params.id);
    }

    componentWillUnmount() {
        this.props.retryQuiz();
    }

    render() {
        const { quiz, activeQuestion, results } = this.props;

        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Ответьте на все вопросы</h1>
                    {this.props.loading || !this.props.quiz ? (
                        <Loader />
                    ) : this.props.isFinished ? (
                        <FinishedQuiz
                            results={results}
                            quiz={quiz}
                            onRetryClick={this.props.retryQuiz}
                        ></FinishedQuiz>
                    ) : (
                        <ActiveQuiz
                            question={quiz[activeQuestion].question}
                            answers={quiz[activeQuestion].answers}
                            onAnswerClick={this.props.quizAnswerClick}
                            quizLength={quiz.length}
                            answerNumber={activeQuestion + 1}
                            state={this.props.answerState}
                        ></ActiveQuiz>
                    )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    results: state.quiz.results,
    isFinished: state.quiz.isFinished,
    activeQuestion: state.quiz.activeQuestion,
    answerState: state.quiz.answerState,
    quiz: state.quiz.quiz,
    loading: state.quiz.loading,
});

const mapDispatchToProps = {
    fetchQuizById,
    quizAnswerClick,
    retryQuiz,
};

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
