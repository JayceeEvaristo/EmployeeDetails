import { use, useEffect, useState } from 'react'

import classes from '../Employee/Employee.module.css';

const PositionList = ({ setCreatePosition }: {
    setCreatePosition: React.Dispatch<React.SetStateAction<boolean>>
}) => {

    interface dataProps {
        id: number,
        position: string,
        positionId: string
    }

    interface insertProps {
        position: string,
        positionId: string
    }

    const [data, setData] = useState([] as dataProps[])
    const [insertData, setInsertData] = useState({} as insertProps)

    const [create, setCreate] = useState(false)
    const [refresh, setRefresh] = useState(false)

    const [isUpdate, setIsUpdate] = useState(false)
    const [id, setId] = useState(0)

    useEffect(() => {
        if (data.length === 0) {
            fetch('/api/positions')
            .then(res => res.json())
            .then(data => setData(data))
        }
    }, [])

    useEffect(() => {
        console.log(insertData)
    }, [insertData])

    useEffect(() => {
        if (refresh) {
            fetch('/api/positions')
            .then(res => res.json())
            .then(data => setData(data))
            setRefresh(false)
        }
        }, [refresh])

    const handleConfirm = () => {
        if (!isUpdate) {
            if (insertData.position !== '' && insertData.positionId !== '' &&
                insertData.position !== undefined && insertData.positionId !== undefined &&
                insertData.position !== null && insertData.positionId !== null &&
                insertData !== undefined
            ) {
                fetch(`/api/positions`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(insertData)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                        setRefresh(true)
                    })
            }
            else {
                alert('Please fill all the fields')
            }
            
        }
    }

    return (
        <>
            <div className={classes.modalContainer}>
                <div className={classes.modalContent}>
                    <div className={classes.formGroup}
                        style={{ width: '80%', height: '50%' }}>
                        <div className={classes.formGroupHeader}>
                            <h1>Position List</h1>
                            <div className={classes.closeModal}>
                                <button onClick={() => setCreatePosition(false)}>X</button>
                            </div>
                        </div>
                        <div className={classes.tableContainer}>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Position</th>
                                        <th>ID</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data.map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{item.position}</td>
                                                    <td>{item.positionId}</td>
                                                    <td style={{
                                                        display: 'flex', flexDirection: 'row', gap: '15px',
                                                        justifyContent: 'center', alignItems: 'center'
                                                    }}>
                                                        <button className={classes.updateButton}>Update</button>
                                                        <button className={classes.cancelButton}>Delete</button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                            <div className={classes.addPos}>
                                {create ? (
                                    <>
                                        <div>
                                            <label>
                                                Position:
                                            </label>
                                            <input type="text" placeholder='Position'
                                                value={insertData.position || ''}
                                                onChange={(e) => setInsertData({ ...insertData, position: e.target.value.toUpperCase() })} />
                                        </div>
                                        <div>
                                            <label>
                                                Position ID:
                                            </label>
                                            <input type="text" placeholder='Position ID'
                                                value={insertData.positionId || ''}
                                                onChange={(e) => setInsertData({ ...insertData, positionId: e.target.value.toUpperCase()})}
                                            />
                                        </div>
                                        <div>
                                            <button className={classes.createButton} onClick={handleConfirm}>Confirm</button>
                                            <button className={classes.cancelButton} onClick={() => setCreate(!create)}>Cancel</button>
                                        </div>
                                    </>
                                ) : (
                                        <button className={classes.createButton} onClick={() => setCreate(!create)}>Add Position</button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
    
    
}

export default PositionList;