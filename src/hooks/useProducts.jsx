import { useEffect, useState } from "react"

const useProducts = (asc, search, category) => {
    const [products, setProducts] = useState([]);
    
    useEffect(() => {
        fetch(`http://localhost:3000/products?sort=${asc ? 'asc' : 'desc'}&search=${search}&category=${category}`)
            .then(res => res.json())
            .then(data => {
                setProducts(data)
            });
    }, [asc, search, category]);

    return products;
}

export default useProducts