import { useEffect, useState } from "react";

export function Products(){
    const [products, setProducts] = useState([{}]);
    useEffect(()=>{
        fetch('/backapi/products', {
            mode: "no-cors"
        })
        .then((res)=>res.json())
        .then((data)=>{console.log(data)})
        .catch((err)=>{console.log(err)});
    }, []);
    return(<>

    </>)
}

export default Products;