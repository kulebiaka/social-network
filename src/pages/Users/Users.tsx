import React, { useEffect, useLayoutEffect } from "react";
import UserItem from "./UserItem/UserItem";
import s from "./Users.module.css"
import { setCurrentPage, resetUsers, getUsers, setFilter } from "../../redux/usersReducer";
import Preloader from "../../components/Preloader/Preloader";
import Paginator from "./../../components/Paginator";
import { useAppDispatch, useAppSelector } from "../../redux";
import { useSearchParams } from "react-router-dom";
import { SearchForm } from "./UsersSearchForm";

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

    return () => { dispatch(resetUsers()) }
  }, [])

  useEffect(() => {
    setSearchParams({ page: currentPage.toString(), term: searchFilter.term, friend: searchFilter.friend?.toString() ?? 'null' })
  }, [searchFilter, currentPage])

  const usersComponents = users.map(user => (<UserItem inFollowingProgress={inFollowingProgress} user={user} key={user.id} />))

  return (
    <div className={s.container + ' app-content-container'}>
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

export default Users;