import React, { Component } from "react";
import classes from "./QuizCreator.module.scss";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import { createControl, validate, validateForm } from "../../form/formFramework";
import Auxillary from "../../hoc/Auxillary/Auxillary";
import Select from "../../components/UI/Select/Select";
import { connect } from "react-redux";
import { createQuizQuestion, finishCreateQuiz } from "../../store/actions/create";

const createOptionControl = number => {
    return createControl(
        {
            label: `Вариант ${number}`,
            errorMessage: "Значение не может быть пустым",
            id: number,
        },
        { required: true }
    );
};

const createFormControls = () => {
    return {
        question: createControl(
            {
                label: "Введите вопрос",
                errorMessage: "Вопрос не может быть пустым",
            },
            { required: true }
        ),
        option1: createOptionControl(1),
        option2: createOptionControl(2),
        option3: createOptionControl(3),
        option4: createOptionControl(4),
    };
};

class QuizCreator extends Component {
    state = {
        isFormValid: false,
        rightAnswerId: 1,
        formControls: createFormControls(),
    };

    resetState = () => {
        this.setState({
            isFormValid: false,
            rightAnswerId: 1,
            formControls: createFormControls(),
        });
    };

    submitHandler = event => {
        event.preventDefault();
    };

    addQuestionHandler = event => {
        event.preventDefault();

        const { formControls, rightAnswerId } = this.state;

        const index = this.props.quiz.length + 1;
        const { question, option1, option2, option3, option4 } = formControls;

        const questionItem = {
            question: question.value,
            rightAnswerId: rightAnswerId,
            id: index,
            answers: [
                { text: option1.value, id: option1.id },
                { text: option2.value, id: option2.id },
                { text: option3.value, id: option3.id },
                { text: option4.value, id: option4.id },
            ],
        };

        this.props.createQuizQuestion(questionItem);

        this.setState({
            isFormValid: false,
            rightAnswerId: 1,
            formControls: createFormControls(),
        });
    };

    createQuizHandler = event => {
        event.preventDefault();

        this.resetState();
        this.props.finishCreateQuiz();
    };

    changeHandler = (value, controlName) => {
        const formControls = { ...this.state.formControls };
        const control = { ...formControls[controlName] };

        control.value = value;
        control.touched = true;
        control.valid = validate(control.value, control.validation);

        formControls[controlName] = control;

        this.setState({ formControls, isFormValid: validateForm(formControls) });
    };

    selectChangeHandler = event => {
        this.setState({
            rightAnswerId: +event.target.value,
        });
    };

    renderControls = () => {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName];

            return (
                <Auxillary key={controlName + index}>
                    <Input
                        label={control.label}
                        value={control.value}
                        valid={control.valid}
                        touched={control.touched}
                        errorMessage={control.errorMessage}
                        shouldValidate={!!control.validation}
                        onChange={event => {
                            this.changeHandler(event.target.value, controlName);
                        }}
                    ></Input>
                    {index === 0 ? <hr /> : null}
                </Auxillary>
            );
        });
    };

    render() {
        const select = (
            <Select
                label='Выбеоите правильный ответ'
                value={this.state.rightAnswerId}
                onChange={this.selectChangeHandler}
                options={[
                    { text: 1, value: 1 },
                    { text: 2, value: 2 },
                    { text: 3, value: 3 },
                    { text: 4, value: 4 },
                ]}
            />
        );
        return (
            <div className={classes.QuizCreator}>
                <div>
                    <h1>Создание теста</h1>

                    <form onSubmit={this.submitHandler}>
                        {this.renderControls()}

                        {select}

                        <Button
                            type='primary'
                            onClick={this.addQuestionHandler}
                            disabled={!this.state.isFormValid}
                        >
                            Добавить вопрос
                        </Button>

                        <Button
                            type='success'
                            onClick={this.createQuizHandler}
                            disabled={this.props.quiz.length === 0}
                        >
                            Создать тест
                        </Button>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    quiz: state.create.quiz,
});

const mapDispatchToProps = {
    createQuizQuestion,
    finishCreateQuiz,
};

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator);
