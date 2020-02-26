import React from "react";
import classes from "./Backdrop.module.scss";

export default function Backdrop(props) {
    return <div className={classes.Backdrop} onClick={props.onClose}></div>;
}
