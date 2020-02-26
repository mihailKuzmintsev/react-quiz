import React from "react";
import classes from "./AnswersList.module.scss";
import AnswerItem from "./AnswerItem/AnswerItem";

export default function AnswersList(props) {
    return (
        <ul className={classes.AnswersList}>
            {props.answers.map(answer => (
                <AnswerItem
                    answer={answer}
                    key={answer.id}
                    onAnswerClick={props.onAnswerClick}
                    state={props.state ? props.state[answer.id] : null}
                ></AnswerItem>
            ))}
        </ul>
    );
}
