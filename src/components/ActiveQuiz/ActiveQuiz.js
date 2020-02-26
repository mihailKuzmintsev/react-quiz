import React from "react";
import classes from "./ActiveQuiz.module.scss";
import AnswersList from "./AnswersList/AnswersList";

export default function ActiveQuiz(props) {
    return (
        <div className={classes.ActiveQuiz}>
            <p className={classes.Question}>
                <span>
                    <strong>{props.answerNumber}.</strong>&nbsp;
                    {props.question}
                </span>

                <small>
                    {props.answerNumber} из {props.quizLength}
                </small>
            </p>

            <AnswersList
                onAnswerClick={props.onAnswerClick}
                answers={props.answers}
                state={props.state}
            ></AnswersList>
        </div>
    );
}
