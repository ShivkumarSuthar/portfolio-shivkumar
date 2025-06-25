import React, { useEffect, useState } from 'react';
import { Carousel, Container } from 'react-bootstrap';
import axios from 'axios';

function DeveloperArticlesCarousel() {
    const [articles, setArticles] = useState([]);
    const apiKey = '95e6f385cf10063dd7c2c38beb94f65d'; // Replace with your NewsAPI key

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await axios.get(`https://gnews.io/api/v4/{endpoint}?apikey={apiKey}`);
                setArticles(response.data.articles);
            } catch (error) {
                console.error('Error fetching articles:', error);
            }
        };

        fetchArticles();
    }, [apiKey]);

    return (
        <Container className='my-5'>
            <h3 className='text-center mb-4'>Developer Articles</h3>
            <Carousel>
                {articles.map((article, index) => (
                    <Carousel.Item key={index}>
                        {article.urlToImage && (
                            <img
                                className="d-block w-100"
                                src={article.urlToImage}
                                alt={article.title}
                                style={{ height: '400px', objectFit: 'cover' }}
                            />
                        )}
                        <Carousel.Caption>
                            <h5>{article.title}</h5>
                            <p>{article.description}</p>
                            <a href={article.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Read More</a>
                        </Carousel.Caption>
                    </Carousel.Item>
                ))}
            </Carousel>
        </Container>
    );
}

export default DeveloperArticlesCarousel;
