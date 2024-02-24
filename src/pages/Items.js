import React from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import {motion} from 'framer-motion';

const ItemsStyles = styled.div`
    .items {
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
    .item {
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
            display: grid;
            grid-template-columns: 1fr 1fr;
            align-items: space-between;
            position: absolute;
            font-size: 1.5rem;
            text-align: center;
            top: 75%;
            justify-content: justify;
            margin-top: 5px;
        }

    }
    
`;
const Items = () => {
    const {category} = useParams();
    const [items, setItems] = React.useState([]);
    function loadItems() {
        fetch(`./${category}.csv`)
        .then(response => response.text())
        .then(text => {
            const rows = text.split('\n').slice(1);
            setItems(rows.map(row => {
                const columns = row.split(',');
                return {
                    name: columns[0],
                    price: columns[1],
                    image: columns[2],
                };
            }));
        });
    }

    React.useEffect(() => {
        loadItems();
    }, []);

    return (
        <ItemsStyles>
        <div className='items'>
                {items.map((item, index) => (
                        <motion.div
                            className='item'
                            whileHover={{scale: 1.05}}
                            whileTap={{scale: 0.95}}
                            initial={{opacity: 0}}
                            animate={{opacity: 1, transition: {delay: 0.1+index*0.03}}}
                            exit={{opacity: 0}}
                            key={index}
                        >
                            <img src={item.image} alt={item.name} />
                            <div className='item-name'>
                                <div>{item.name}</div>
                                <div>&#8377;{item.price}</div>
                            </div>
                        </motion.div>
                ))}
        </div>
        </ItemsStyles>
    );
}

export default Items;