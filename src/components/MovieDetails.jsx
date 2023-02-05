import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { useParams } from "react-router-dom"
import styles from './MovieDetails.module.css'
import Card from '@material-ui/core/Card';
import BackButton from './BackButton'


function MovieDetails() {
    const params = useParams()
    const [ movieData, setMovieData ] = useState("")
    const [ poster, setPoster ] = useState("")
    
    useEffect(() => {
        // console.log({params})
         let config = {
            method: 'get',
            url: `http://www.omdbapi.com/?i=${params?.id}&apikey=35b9963c`,
            headers: { }
          };
          
          axios(config)
          .then(function (response) {
            console.log((response.data));
            setMovieData(response.data)
            setPoster(response.data.Poster)

          })
          .catch(function (error) {
            console.log(error);
          });
    }, [])
    return (
        <div>
            <div className={styles.backButtonContainer}>
                <div className={styles.backButton}>
                    <BackButton />
                </div>
            </div>
            <div className={`${styles.container} ${styles.containerHeight}`}>
                <Card className={styles.cardRoot}>
                    <div>
                        <img
                            className={styles.cardImage}
                            src={poster}
                            alt={movieData?.Title}
                        />
                    </div>
                    <div className={styles.details}>
                        <p>
                            Title : {movieData?.Title}
                        </p>
                        <p>
                            Release Year : {movieData?.Year}
                        </p>
                        <p>
                            Rating : {movieData?.imdbRating}
                        </p>
                        <p>
                            Brief Synopsis : {movieData?.Plot}
                        </p>
                    </div>
                </Card>
            </div>
        </div>
        
    )
}

export default MovieDetails
