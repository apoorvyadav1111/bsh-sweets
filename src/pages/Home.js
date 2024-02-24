import React from 'react';
import {useEffect} from 'react';
import {styled} from 'styled-components';
import {motion} from 'framer-motion';
import {Link} from 'react-router-dom';
import categoriesCSV from '../data/categories.csv';


const HomeStyles = styled.div`
    .categories {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        justify-content: center;
        align-items: center;
        margin: auto;   
        max-width: 80%;
        @media (max-width: 768px) {
            grid-template-columns: 1fr;
            width: 100%;
        }
        a {
            text-decoration: none;
        }
    }
    .category {
        background-position: center;
        background-size: cover;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0,0,0,0.2);
        background-color: rgba(255,255,255,0.1);
        backdrop-filter: blur(5px);
        color: white;
        font-size: 1.5rem;
        font-weight: bold;
        height: 200px;
        margin: 10px;
        justify-content: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        img{
            position: absolute;
            object-fit: cover;
            width: 100%;
            height: 70%;
            left: 0;
            top: 0;
            border-radius: 10px;
        }
        &-name {
            position: absolute;
            font-size: 1.5rem;
            text-align: center;
            top: 75%;
            justify-content: center;
            margin-top: 5px;
        }

    }
    `


const Home = () => {
    const [categories, setCategories] = React.useState([]);
    function loadCategories() {
        fetch(categoriesCSV)
        .then(response => response.text())
        .then(text => {
            const rows = text.split('\n').slice(1);
            setCategories(rows.map(row => {
                const columns = row.split(',');
                return {
                    name: columns[0],
                    image:columns[1],
                    file: columns[2],
                };
            }));
        });
    }
    useEffect(() => {
        loadCategories();
    }, []);


    return (
        <HomeStyles>
        <div className='home'>
            <div className='categories'>
                {categories.map((category, index) => (
                    <Link to={`/items/${category.file}`} key={index}>
                        <motion.div
                            className='category'
                            whileHover={{scale: 1.05}}
                            whileTap={{scale: 0.95}}
                            initial={{opacity: 0}}
                            animate={{opacity: 1, transition:{delay: 0.2+index*0.2}}}
                            exit={{opacity: 0}}
                        >  
                        <div>
                            <img src={process.env.PUBLIC_URL + category.image}/>
                                {process.env.PUBLIC_URL + category.image}
                        </div>
                            <div className='category-name'>{category.name}</div>
                        </motion.div>
                    </Link>
                ))}
            </div>
        </div>
        </HomeStyles>
    );
    }
    
export default Home;