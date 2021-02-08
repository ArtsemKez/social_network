import React from "react";
import { Formik, Form, Field } from "formik";
import { FilterType } from "../../redux/users-reducer";
import { useSelector } from "react-redux";
import { getUsersFilter } from "../../redux/users-selectors";

type FriendFormType = 'true' | 'false' | 'null'

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

export const UsersSearchForm: React.FC<PropsType> = React.memo((props) => {
  const filter = useSelector(getUsersFilter)
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
        enableReinitialize
        initialValues={{term: filter.term, friend: String(filter.friend) as FriendFormType}}
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
