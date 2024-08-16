import { useEffect, useState } from "react"

const useProducts = (asc, search) => {
    const [products, setProducts] = useState([]);
    
    useEffect(() => {
        fetch(`http://localhost:3000/products?sort=${asc ? 'asc' : 'desc'}&search=${search}`)
            .then(res => res.json())
            .then(data => setProducts(data));
    }, [asc, search]);

    return products;
}

export default useProducts