import axios from "../../axios/axios-quiz";
import { CREATE_QUIZ_QUESTION, RESET_QUIZ_CREATION } from "./actionTypes";

export const createQuizQuestion = questionItem => {
    return {
        type: CREATE_QUIZ_QUESTION,
        questionItem,
    };
};

export const resetQuizCreation = () => {
    return {
        type: RESET_QUIZ_CREATION,
    };
};

export const finishCreateQuiz = () => {
    return async (dispatch, getState) => {
        console.log("getState()", getState());
        await axios.post("quizes.json", getState().create.quiz);
        dispatch(resetQuizCreation());
    };
};
