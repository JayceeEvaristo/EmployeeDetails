import React, { use, useEffect } from 'react'
import classes from './Employee.module.css'

const CreateEmployee = ({ setCreateEmployee, setIsCreate, isCreate, setRefresh, id }: {
    setCreateEmployee: React.Dispatch<React.SetStateAction<boolean>>,
    setIsCreate: React.Dispatch<React.SetStateAction<boolean>>,
    isCreate: boolean
    setRefresh: React.Dispatch<React.SetStateAction<boolean>>,
    id: number
}) => {
    interface positionProps {
        id: number,
        position: string
        positionId: string
    }

    const [positions, setPositions] = React.useState([] as positionProps[])
    const [positionId, setPositionId] = React.useState('')
    const [isDelete, setIsDelete] = React.useState(false)


    const [employee, setEmployee] = React.useState({
        id,
        position: '',
        employeeId: '',
        fName: '',
        lName: '',
        mName: '',
        dateOfBirth: '',
        gender: '',
        contactNumber: '',
        email: '',
        address: '',
        dateHired: '',
        status: '',
        salary: 0
    })

    let handleSubmit = () => {
        const confirm = window.confirm(`Are you sure you?`);
        if (!confirm) {
            return;
        }
        if (isCreate) {
            fetch(`/api/employee`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(employee)
            })
                .then(async res => {
                    const contentType = res.headers.get('content-type');

                    if (!res.ok) {
                        if (contentType && contentType.includes('application/json')) {
                            const error = await res.json();
                            throw new Error(error.message || 'Unknown JSON error');
                        } else {
                            const errorText = await res.text();
                            throw new Error(errorText || 'Unknown error');
                        }
                    }
                    if (contentType && contentType.includes('application/json')) {
                        const data = await res.json();
                        console.log('Success:', data);
                        return data;
                    }

                    console.log('Success (no JSON returned)');
                    return null;
                })
                .catch(err => {
                    console.error('Error saving employee:', err.message);
                });
        }
        else if (isDelete) {
            fetch(`/api/employee/${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                })
                .catch(err => console.log(err))
        }
        else {
            fetch(`/api/employee/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(employee)
            }).then(async res => {
                    const contentType = res.headers.get('content-type');

                    if (!res.ok) {
                        if (contentType && contentType.includes('application/json')) {
                            const error = await res.json();
                            throw new Error(error.message || 'Unknown JSON error');
                        } else {
                            const errorText = await res.text();
                            throw new Error(errorText || 'Unknown error');
                        }
                    }
                    if (contentType && contentType.includes('application/json')) {
                        const data = await res.json();
                        console.log('Success:', data);
                        return data;
                    }
                })
                .catch(err => {
                    console.error('Error saving employee:', err.message);
                });
        }

        setRefresh(true)
        setIsDelete(false)
        setCreateEmployee(false)
        
    }

    useEffect(() => {
        console.log(positions.length)
        if (positions.length === 0) {
            fetch(`/api/positions`).then(res => res.json()).then(data => setPositions(data))
        }
        if (!isCreate && id !== 0) {
            fetch(`/api/employee/${id}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    setEmployee(data)
                })
                .catch(err => console.log(err))
        }
    }, [])

    useEffect(() => {
        console.log(positionId)
        if (positionId !== '' && isCreate) {
            fetch(`/api/employee/getEmployeeLastId/${positionId}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    
                    let newId = (Number(data.employeeId.split('-')[1]) + 1).toString().padStart(4, '0')
                    console.log(newId)
                    setEmployee({ ...employee, employeeId: positionId + '-' + newId, position: positionId })
                })
                .catch(err => {
                    console.log(err)
                    setEmployee({ ...employee, employeeId: positionId + '-0001', position: positionId })
                })
        }
    }, [positionId])

    return (
        <>
            <form className={`${classes.modalContainer}`} onSubmit={(e) => { e.preventDefault(); handleSubmit() }}>
                <div className={`${classes.modalContent}`}>
                    <div className={`${classes.formGroup}`}>
                        <div className={`${classes.formGroupHeader}`}>
                            <h1>{isCreate ? 'Create' : 'Update'} Employee</h1>
                            <div className={`${classes.closeModal}`}>
                                <button type="button" onClick={() => {
                                        setIsCreate(false)
                                        setIsDelete(false)
                                        setCreateEmployee(false)
                                        setPositionId('')
                                    }
                                }
                                >X</button>
                            </div>
                        </div>
                        
                        <p>All fields that are marked with <span>*</span> are required</p>
                        <div className={`${classes.formGroupContent}`}>
                            <div className={`${classes.formGroupContentInput}`}>
                                <div>
                                    <label htmlFor="position">Position <span>*</span>:</label>
                                    <select name="position" id="position"
                                        defaultValue=""
                                        value={
                                            isCreate ? positionId : employee.position
                                        }
                                        disabled={!isCreate}
                                        onChange={(e) => setPositionId(e.target.value)}
                                        required
                                    >
                                        
                                        <option value="" disabled selected>Select Position</option>
                                        {
                                            positions.map(position => {
                                                return (
                                                    <option value={position.positionId}>{position.position}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="EmployeeId">Employee ID <span>*</span>:</label>
                                    <input type="text" name="EmployeeId" id="EmployeeId" readOnly
                                        required
                                        value={employee.employeeId} />
                                </div>
                            </div>

                            <div className={`${classes.formGroupContentInput}`}>
                                <div>
                                    <label htmlFor="lName">Last Name <span>*</span>:</label>
                                    <input type="text" name="lName" id="lName"
                                        onChange={(e) => setEmployee({ ...employee, lName: e.target.value })}
                                        value={employee.lName || ""}
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="fName">First Name <span>*</span>:</label>
                                    <input type="text" name="fName" id="fName"
                                        onChange={(e) => setEmployee({ ...employee, fName: e.target.value })}
                                        required
                                        value={employee.fName || ""}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="mName">Middle Name:</label>
                                    <input type="text" name="mName" id="mName"
                                        onChange={(e) => setEmployee({ ...employee, mName: e.target.value })}
                                        value={employee.mName || ""}
                                    />
                                </div>
                            </div>

                            <div className={`${classes.formGroupContentInput}`}>
                                <div>
                                    <label htmlFor="dateOfBirth">Date of Birth<span>*</span>:</label>
                                    <input required type="date" name="dateOfBirth" id="dateOfBirth" style={{ textTransform: 'lowercase' }}
                                        onChange={(e) => setEmployee({ ...employee, dateOfBirth: e.target.value })}
                                        value={employee.dateOfBirth || ""}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="gender">Gender <span>*</span>:</label>
                                    <select name="gender" id="gender" defaultValue=""
                                        required
                                        onChange={(e) => setEmployee({ ...employee, gender: e.target.value })}
                                        value={employee.gender || ""}
                                    >
                                        <option value="" disabled selected>Select Gender</option>
                                        <option value="M">Male</option>
                                        <option value="F">Female</option>
                                    </select>
                                </div>
                            </div>

                            <div className={`${classes.formGroupContentInput}`}>
                                <div>
                                    <label htmlFor="contactNumber">Contact Number <span>*</span>:</label>
                                    <ContactInput employee={employee} setEmployee={setEmployee} isCreate={isCreate} />
                                </div>
                                <div>
                                    <label htmlFor="email">Email <span>*</span>:</label>
                                    <input type="email" name="email" id="email" required style={{ textTransform: 'lowercase' }}
                                        onChange={(e) => setEmployee({ ...employee, email: e.target.value })}
                                        value={employee.email || ""}
                                    />
                                </div>
                            </div>

                            <div className={`${classes.formGroupContentInput}`}>
                                <div>
                                    <label htmlFor="address">Address <span>*</span>:</label>
                                    <input required type="text" name="address" id="address"
                                        value={employee.address || ""}
                                        onChange={(e) => setEmployee({ ...employee, address: e.target.value })} />
                                </div>
                            </div>
                            <div className={`${classes.formGroupContentInput}`}>
                                <div>
                                    <label htmlFor="dateHired">Date Hired <span>*</span>:</label>
                                    <input required type="date" name="dateHired" id="dateHired"
                                        value={employee.dateHired || ""}
                                        onChange={(e) => setEmployee({ ...employee, dateHired: e.target.value })} />
                                </div>
                                <div>
                                    <label htmlFor="eStatus">Employment Status <span>*</span>:</label>
                                    <select required name="eStatus" id="eStatus" defaultValue=""
                                        value={employee.status || ""}
                                        onChange={(e) => setEmployee({ ...employee, status: e.target.value })}>
                                        <option value="" disabled selected>Select Employment Status</option>
                                        <option value="Active">Active</option>
                                        <option value="Resigned">Resigned</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="salary">Salary <span>*</span>:</label>
                                    <input required type="number" name="salary" id="salary"
                                        value={employee.salary || ""}
                                        onChange={(e) => setEmployee({ ...employee, salary: e.target.valueAsNumber })} />
                                </div>
                            </div>
                            <div className={`${classes.formGroupFooter}`}
                                style={isCreate ? { justifyContent: 'flex-end' } : { justifyContent: 'space-between' }}>
                                <button type="submit" className={`${classes.deleteButton}`}
                                    style={isCreate ? { display: 'none' } : { display: 'block' }}
                                    onClick={() => setIsDelete(true)}
                                >Delete</button>
                                <div>
                                    <button type="button" onClick={() => setCreateEmployee(false)}>Cancel</button>
                                    <button type="submit">Save</button>
                                </div>
                            </div>
                        </div>                        
                    </div>      
                </div>
            </form>
        </>
    )
}

const ContactInput = ({ employee, setEmployee, isCreate }: any) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        // Only allow digits
        if (!/^\d*$/.test(value)) return;

        // Prevent input if the first character is not 0
        if (value.length === 1 && value[0] !== '0') return;

        // Limit to 11 characters
        if (value.length > 11) return;

        setEmployee({ ...employee, contactNumber: value });
    };

    return (
        <input
            type="text"
            name="contactNumber"
            id="contactNumber"
            value={employee.contactNumber || ""}
            onChange={handleChange}
            placeholder="09XXXXXXXXX"
            maxLength={11}
            required
        />
    );
};

export default CreateEmployee