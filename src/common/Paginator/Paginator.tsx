import React, {useEffect} from 'react';
import {Pagination} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {actions, requestUsers} from "../../redux/users-reducer";
import {getCurrentPage, getUsersFilter} from "../../redux/users-selectors";

type PropsType = {
    totalItemsCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    portionSize?: number
}

let Paginator: React.FC<PropsType> = ({totalItemsCount, pageSize, onPageChanged}) => {

    const dispatch = useDispatch()
    const filter = useSelector(getUsersFilter)
    const currentPage = useSelector(getCurrentPage)
    // const currentPage = useSelector(getCurrentPage)

    const showSizeChange = (currentPage: number, pageSize: number) => {
        dispatch(actions.selectPageSize(pageSize))
        dispatch(requestUsers(currentPage = 1, pageSize, filter))
    }

    return (
        <Pagination current={currentPage}
                    defaultCurrent={1}
                    defaultPageSize={pageSize}
                    total={totalItemsCount}
                    onChange={onPageChanged}
                    onShowSizeChange={showSizeChange}
        />
    )
}

export default Paginator;
