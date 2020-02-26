import React from "react";
import classes from "./FinishedQuiz.module.scss";
import Button from "../UI/Button/Button";
import { Link } from "react-router-dom";

export default function FinishedQuiz(props) {
    const successCount = Object.values(props.results).reduce((acc, value) => {
        if (value === "success") {
            acc++;
        }
        return acc;
    }, 0);
    return (
        <div className={classes.FinishedQuiz}>
            <ul>
                {props.quiz.map((quizItem, index) => {
                    const cls = [
                        "fa",
                        props.results[quizItem.id] === "error" ? "fa-times" : "fa-check",
                        classes[props.results[quizItem.id]],
                    ];

                    return (
                        <li>
                            <strong>{index + 1}</strong>.&nbsp;
                            {quizItem.question}
                            <i className={cls.join(" ")}></i>
                        </li>
                    );
                })}
            </ul>

            <p>
                Правильно {successCount} из {props.quiz.length}
            </p>

            <div>
                <Button onClick={props.onRetryClick} type='primary'>
                    Повторить
                </Button>
                <Link to='/'>
                    <Button type='success'>Перети в список тестов</Button>
                </Link>
            </div>
        </div>
    );
}
