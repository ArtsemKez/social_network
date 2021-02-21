import React from 'react';
import {Pagination} from 'antd';
import {useDispatch} from "react-redux";
import {actions} from "../../redux/users-reducer";

type PropsType = {
    totalItemsCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    portionSize?: number
}

let Paginator: React.FC<PropsType> = ({totalItemsCount, pageSize, onPageChanged}) => {

    const dispatch = useDispatch()

    const showSizeChange = (currentPage: number, pageSize: number) => {
        dispatch(actions.selectPageSize(pageSize))
        dispatch(actions.setCurrentPage(currentPage))
    }



    return (
        <Pagination defaultCurrent={1}
                    defaultPageSize={pageSize}
                    total={totalItemsCount}
                    onChange={onPageChanged}
                    onShowSizeChange={showSizeChange}
        />
    )
}

export default Paginator;
