import React, {useState} from 'react'
import styles from './Home.module.css'
import { useNavigate } from "react-router-dom"
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';

function Home() {
    const [ searchValue, setSearchValue ] = useState("")
    
    const navigate = useNavigate()

    const handleChange = (e) => {
        setSearchValue(e.target.value)
    }

    const handleSearch = () => {
        navigate(`/movies/${searchValue}`)
    }

    
    return (
        <div
            className={styles.container}
        >
           <div>
                <Paper component="form" className={styles.paper}>
                    <InputBase
                        className={styles.input}
                        placeholder="Search Movies"
                        inputProps={{ 'aria-label': 'search movies' }}
                        onChange={handleChange}
                    />
                    <IconButton onClick={handleSearch} type="submit" className={styles.iconButton} aria-label="search">
                        <SearchIcon  />
                    </IconButton>
                    
                </Paper>
            </div>
        </div>
    )
}

export default Home

