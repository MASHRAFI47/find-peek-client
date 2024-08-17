import { useEffect, useState } from "react"

const useProducts = (asc, search, category, currentPage, itemsPerPage) => {
    const [products, setProducts] = useState([]);
    
    useEffect(() => {
        fetch(`http://localhost:3000/products?sort=${asc ? 'asc' : 'desc'}&search=${search}&category=${category}&page=${currentPage}&size=${itemsPerPage}`)
            .then(res => res.json())
            .then(data => {
                setProducts(data)
            });
    }, [asc, search, category, itemsPerPage, currentPage]);

    return products;
}

export default useProducts