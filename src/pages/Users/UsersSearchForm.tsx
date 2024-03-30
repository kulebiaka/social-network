import React from "react";
import { setCurrentPage, getUsers, setFilter, SearchFilterType } from "../../redux/usersReducer";
import { useAppDispatch } from "../../redux";
import { Field, Form, Formik, FormikHelpers } from "formik";

export const SearchForm = ({ pageSize, friend, term }: any) => {

  const dispatch = useAppDispatch();

  const initialValues: SearchFilterType = { term, friend };

  const submit = async (values: SearchFilterType, actions: FormikHelpers<SearchFilterType>) => {
    actions.setSubmitting(true);
    dispatch(setFilter(values));
    dispatch(setCurrentPage(1));
    const res = await dispatch(getUsers(1, pageSize, values.term, values.friend));
    actions.setSubmitting(false);
  };

  return (<div>
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={submit}
    >
      {({ isSubmitting, values, setValues }) => (
        <Form>
          <Field type="text" name="term" />
          <Field component="select" name="friend">
            <option value="null">All</option>
            <option value="true">Only friends</option>
            <option value="false">Not friends</option>
          </Field>
          <button type="submit" disabled={isSubmitting}>Find</button>
        </Form>
      )}
    </Formik>
  </div>);
};
