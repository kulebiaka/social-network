import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { AnyAction } from 'redux'

type PropsType = {
  elementsCount: number,
  pageSize: number,
  currentPage: number,
  portionSize: number,
  setCurrentPage: (a: number) => AnyAction
}

const Paginator = ({elementsCount, pageSize, currentPage, setCurrentPage, portionSize} : PropsType) => {

  let dispatch = useDispatch()

  let pagesCount = Math.ceil(elementsCount / pageSize)
  
  let portionCount = Math.ceil(pagesCount / portionSize)
  let [currentPortion, setCurrentPortion] = useState(1)
  
  let pages = []
  for(let i = (currentPortion-1) * portionSize + 1 ; (i <= currentPortion * portionSize) && (i <= pagesCount); i++){
    pages.push(i)
  }

  let pagesComponents = pages.map(p => (<button disabled={p===currentPage}onClick={(e) => {dispatch(setCurrentPage(p))}}>{p}</button>))

  return(<div>
    <button disabled={currentPortion === 1} onClick={() => {setCurrentPortion(n => n-1)}}>Prev</button>
    <div>
      {pagesComponents}
    </div>
    <button disabled={currentPortion === portionCount} onClick={() => {setCurrentPortion(n => n+1)}}>Next</button>
  </div>)
}

export default Paginator