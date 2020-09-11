import React, {useState, useEffect, ChangeEvent} from 'react';

type PropsType = {
    status: string
    updateStatus: (newStatus: string) => void
}

type StateType ={
    editMode: boolean
    status: string
}

type Type = PropsType & StateType

const ProfileStatus: React.FC<Type> = (props) => {

    const [editMode, setEditMode] = useState(false);
    const [status, setStatus] = useState(props.status);

    useEffect( () => {
        setStatus(props.status)
    }, [props.status] )

    const activateEditMode = () => {
        setEditMode(true);
    }
    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status);
    }
    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }

    return (
        <div>
            {!editMode &&
                <div>
                    <b>Status</b><span onClick={activateEditMode} >{props.status || "No status"}</span>
                </div>
            }
            {editMode &&
                <div>
                    <input autoFocus={true} onBlur={deactivateEditMode} onChange={onStatusChange} value={status} />
                </div>
            }
        </div>
    )
}

export default ProfileStatus;
