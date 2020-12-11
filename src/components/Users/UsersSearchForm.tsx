import React from "react";
import { Formik, Form, Field } from "formik";
import { FilterType } from "../../redux/users-reducer";

type PropsType = {
  onFilterChange: (filter: FilterType) => void;
}

type FormType = {
    term: string,
    friend: 'null' | 'true' | 'false'
}

const usersSearchFormValidate = (values: any) => {
  const errors = {};
  return errors;
}

const UsersSearchForm: React.FC<PropsType> = React.memo((props) => {
  const submit = (values: FormType, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
      const filter: FilterType = {
        term: values.term,
        friend: values.friend === 'null' ? null : values.friend === 'true' ? true : false
      } 
      props.onFilterChange(filter)
  }

  return (
    <div>
      <Formik
        initialValues={{ term: "", friend: 'null' }}
        validate={usersSearchFormValidate}
        onSubmit={submit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field name='friend' as='select'>
                <option value='null'>All</option>
                <option value='true'>Only followed</option>
                <option value='false'>Only unfollowed</option>
            </Field>  
            <Field type="text" name="term" />
            <button type="submit" disabled={isSubmitting}>
              Find
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
})

export default UsersSearchForm;
