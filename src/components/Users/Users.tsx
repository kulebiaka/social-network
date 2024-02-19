import React, { useEffect, useLayoutEffect } from "react";
import UserItem from "./UserItem/UserItem";
import s from "./Users.module.css"
import { setCurrentPage, resetUsers, getUsers, setFilter, SearchFilterType } from "../../redux/usersReducer";
import Preloader from "../common/Preloader";
import Paginator from "../common/Paginator";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { useSearchParams } from "react-router-dom";

const Users = () => {

  const dispatch = useAppDispatch()

  const users = useAppSelector(state => state.usersPage.users)
  const currentPage = useAppSelector(state => state.usersPage.currentPage)
  const pageSize = useAppSelector(state => state.usersPage.pageSize)
  const searchFilter = useAppSelector(state => state.usersPage.searchFilter)
  const isFetching = useAppSelector(state => state.usersPage.isFetching)
  const inFollowingProgress = useAppSelector(state => state.usersPage.inFollowingProgress)
  const usersCount = useAppSelector(state => state.usersPage.usersCount)

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    let actualPage = Number(searchParams.get('page') ?? currentPage)
    let term = searchParams.get('term') ?? searchFilter.term
    let friend = searchParams.get('friend') ?? searchFilter.friend


    if (actualPage !== currentPage) dispatch(setCurrentPage(actualPage))
    if ((term !== searchFilter.term) || (friend !== searchFilter.friend)) {
      dispatch(setFilter({ term, friend }))
    }

    dispatch(getUsers(actualPage, pageSize, term, friend))

    // return () => { dispatch(resetUsers()) }
  }, [])

  useEffect(() => {
    setSearchParams({ page: currentPage.toString(), term: searchFilter.term, friend: searchFilter.friend?.toString() ?? 'null' })
  }, [searchFilter, currentPage])

  const usersComponents = users.map(user => (<UserItem inFollowingProgress={inFollowingProgress} user={user} key={user.id} />))

  return (
    <div className={s.container}>
      <h4>Users</h4>
      <SearchForm pageSize={pageSize} term={searchFilter.term} friend={searchFilter.friend} />
      <Paginator elementsCount={usersCount} pageSize={pageSize}
        currentPage={currentPage} setCurrentPage={(p) => {
          dispatch(setCurrentPage(p))
          dispatch(getUsers(p, pageSize, searchFilter.term, searchFilter.friend))
        }}
        portionSize={10} />
      {isFetching ? <Preloader /> : <div className={s.users}>{usersComponents}</div>}
    </div>
  )
}

const SearchForm = ({ pageSize, friend, term }: any) => {

  const dispatch = useAppDispatch()

  const initialValues: SearchFilterType = { term: term, friend: friend, }

  const submit = async (values: SearchFilterType, actions: FormikHelpers<SearchFilterType>) => {
    actions.setSubmitting(true)
    dispatch(setFilter(values))
    dispatch(setCurrentPage(1))
    const res = await dispatch(getUsers(1, pageSize, values.term, values.friend))
    actions.setSubmitting(false)
  }

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
  </div>)
}

export default Users;