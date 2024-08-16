import { useEffect, useState } from "react"

const useProducts = (asc) => {
    const [products, setProducts] = useState([]);
    console.log(asc)
    
    useEffect(() => {
        fetch(`http://localhost:3000/products?sort=${asc ? 'asc' : 'desc'}`)
            .then(res => res.json())
            .then(data => setProducts(data));
    }, [asc]);

    return products;
}

export default useProducts