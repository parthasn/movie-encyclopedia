import React, {useEffect, useState} from 'react'
import axios from 'axios'
import styles from './MovieList.module.css'
import { useNavigate, useParams} from "react-router-dom"
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import BackButton from './BackButton';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import CircularProgress from '@material-ui/core/CircularProgress';



function MovieList() {

    const [ responseData, setResponseData ] = useState("")
    const [ isApiData, setIsApiData ] = useState(false)
    const [sortValue, setSortValue] = useState('None');
    const [ showLoader, setShowLoader ] = useState(false);

    const navigate = useNavigate()
    const params = useParams()


    useEffect(() => {
        setShowLoader(true)
        console.log({params})
        let config = {
            method: 'get',
            url: `http://www.omdbapi.com/?s=${params.id}&apikey=35b9963c`,
            headers: { }
          };
          
          axios(config)
          .then(function (response) {
            setShowLoader(false)
            console.log(response.data);
            setResponseData(response.data.Search);
            if(response.data.Response === "True"){
                setIsApiData(true)
            }
            
          })
          .catch(function (error) {
            setShowLoader(false)
            console.log(error);
          });
    }, [])

    const handleClick = (id) => {
        // console.log('clicked', title)
        navigate(`/movie/${id}`)
       
    }

    const handleBack = () => {
        navigate(-1)
    }


    const handleChange = (event) => {
        setSortValue(event.target.value);
        let sortedData;
        if(event.target.value === 'ascending'){
            sortedData = responseData?.sort((a,b) => {
                return (a.Year - b.Year)
            })
        }
        else {
            sortedData = responseData?.sort((a,b) => {
                return (b.Year - a.Year)
            })
        }
        console.log(sortedData)
            setResponseData(sortedData)
      };

    return (
        <div>
            {
                showLoader ? (
                    <div className={styles.mainContainer}>
                        <CircularProgress/>
                    </div>
                ) : (
                    <div>
                        <div className={styles.backButtonContainer} >
                            <div className={styles.backButton}>
                                <BackButton />
                                <div>
                                {isApiData ? (
                                    <FormControl variant="outlined" className={styles.formControl}>
                                        <InputLabel id="demo-simple-select-outlined-label">Sort</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-outlined-label"
                                            id="demo-simple-select-outlined"
                                            value={sortValue}
                                            onChange={handleChange}
                                            label="Sort"
                                        >
                                        <MenuItem value={'ascending'}>Ascending</MenuItem>
                                        <MenuItem value={'descending'}>Descending</MenuItem>
                                        </Select>
                                    </FormControl>
                                ) : null}
                                </div>
                            </div>
                
                        </div>
                        {
                            isApiData ? (
                                <Grid container className={styles.gridRoot} spacing={2}>
                                    <Grid item xs={12}>
                                        <Grid container justifyContent="center" spacing={2}>
                                            {responseData && responseData.map((elem, id) => (
                                                <Grid key={id} item>
                                                    <CardActionArea>
                                                        <Card 
                                                            className={styles.cardRoot}
                                                            onClick={() => handleClick(elem.imdbID)}
                                                        >
                                                            <div className={styles.imageDiv}>
                                                                <img
                                                                    className={styles.media}
                                                                    src={elem.Poster}
                                                                    alt={elem.Title}
                                                                />
                                                            </div>
                                                            <CardContent>
                                                                <p className={styles.movieTitle}>Title: {elem.Title}</p>
                                                                <p className={styles.releaseYear}>Release year: {elem.Year}</p>
                                                            </CardContent>
                                                        </Card>
                                                    </CardActionArea>
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </Grid>
                                </Grid>
                            ) : (
                                <div className={styles.errorDiv}>
                                    <Card className={styles.errorCardContainer}>
                                        <CardContent className={styles.errorContent}>
                                            <p>Invalid Search Query... Please try again.</p>
                                            <Button onClick={handleBack} variant="contained" color="primary">
                                                Go Back
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </div>
                            )
                        }
                    </div>
                )
            }
        </div>
    )
}

export default MovieList
