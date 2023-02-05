import React from 'react'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useNavigate } from "react-router-dom";
import styles from './BackButton.module.css'

function BackButton() {

    const navigate = useNavigate()

    const handleClick = () => {
        navigate(-1)
    }

    return (
        <div 
            onClick={handleClick}
            className={styles.container}
        >
            <ArrowBackIcon/>
        </div>
    )
}

export default BackButton
