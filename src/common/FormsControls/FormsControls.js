import React from 'react';
import styles from './FormsControls.module.css'

const FormControl = ({ input, meta, child, ...props }) => {
    const ErrorText = meta.touched && meta.error;
    return (
        <div className={styles.formControl + " " + (ErrorText ? styles.error : "")}>
            <div>
                {props.children}
            </div>
            <div>
                {ErrorText && <span>{meta.error}</span>}
            </div>
        </div>
    )
}

export const Textarea = (props) => {
    const { input, meta, child, ...restProps } = props;
    return <FormControl {...props}><textarea {...input} {...restProps}  /></FormControl>
}

export const Input = (props) => {
    const { input, meta, child, ...restProps } = props;
    return <FormControl {...props}><input  {...input} {...restProps}/></FormControl>
}

