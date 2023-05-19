import React from 'react'
import TableHeading from '../../HOC/TableHeading/TableHeading'
import Table from './Table/Table'
import styles from './styles.module.scss'

const TableList = () => {
  return (
    <div className={styles.TableList}>
        <TableHeading />
        <Table />
    </div>
  )
}

export default TableList