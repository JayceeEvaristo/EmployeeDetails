import React, { useEffect } from 'react'
import classes from './Employee.module.css'

import CreateEmployee from './CreateEmployee'
import PositionList from '../Position/PositionList'

const EmployeeList = () => {

    interface dataProps {
        id: number,
        employeeId: string,
        fName: string,
        lName: string,
        mName: string,
        position: number
        salary: number

    }

    const [id, setId] = React.useState(0)

    const [data, setData] = React.useState([] as dataProps[])

    const [createEmployee, setCreateEmployee] = React.useState(false)
    //const [createPosition, setCreatePosition] = React.useState(false)
    const [isCreate, setIsCreate] = React.useState(false)
    const [refresh, setRefresh] = React.useState(true)

    useEffect(() => {
        setRefresh(true)
    }, [])

    useEffect(() => {
        if (data.length === 0 || refresh) {
            fetch('/api/employee')
                .then(res => res.json())
                .then(data => {
                    setData(data)
                    setRefresh(false)
                })
                .catch(err => console.log(err))
        }
    }, [])

    useEffect(() => {
        if (refresh) {
            fetch('/api/employee')
                .then(res => res.json())
                .then(data => {
                    setData(data)
                    setRefresh(false)
                })
                .catch(err => console.log(err))
        }
    }, [refresh])

    return (
        <div className={`${classes.container}`}>
            <div className={`${classes.header}`}>
                <h1>Manage Employee</h1>
                {/*<button onClick={() => setCreatePosition(true)}>Add Position</button>*/}
            </div>
            <div className={`${classes.content}`}>
                <div className={`${classes.tableGroup}`}>
                    <div className={`${classes.tableHeader}`}>
                        <h2>Employee List</h2>
                        <button onClick={() => {
                            setCreateEmployee(true)
                            setIsCreate(true)
                        }}>Add Employee</button>
                    </div>
                    <div className={`${classes.tableContainer}`}>
                        <table>
                            <thead>
                                <tr>
                                    <th>Employee ID</th>
                                    <th>Employee Name</th>
                                    <th>Position</th>
                                    <th>Salary</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    Array.isArray(data) && data.length > 0 ? (
                                        data.map((item) => (
                                            <tr key={item.id}
                                                onClick={() => {
                                                    setId(item.id)
                                                    setCreateEmployee(true)
                                                    setIsCreate(false)
                                                }}
                                            >
                                                <td>{item.employeeId}</td>
                                                <td>{item.fName} {item.mName} {item.lName}</td>
                                                <td>{item.position}</td>
                                                <td>{item.salary}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={4}>No data available</td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {
                createEmployee ? (
                    <CreateEmployee setCreateEmployee={setCreateEmployee} setIsCreate={setIsCreate} isCreate={isCreate} setRefresh={setRefresh} id={id} />
                ) : null
            }
        </div>
    )

}

export default EmployeeList