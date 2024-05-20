import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0)

  const fetchProducts = async () => {
    const res = await fetch(`https://dummyjson.com/products?limit=10&skip=${page * 10 -10}`);
    const data = await res.json();

    console.log(data.products[1]);

    if (data && data.products) {
      setProducts(data.products);
      setTotalPages(data.total/10)
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);


  const onClickHandler=(selectedPage)=>{
    if(selectedPage>=1 && selectedPage<=totalPages && selectedPage!== page ){
      setPage(selectedPage)
    }
  }

  return (
    <div>
      {products.length > 0 && 
        <div className="products">
          {products.map((prod) => {
            return <span key={prod.id} className="single__product">
              <img src={prod.thumbnail} alt={prod.title} />
              <span>
                {prod.title}
              </span>
            </span>;
          })}
        </div>
      }

      {
        products.length>0 && <div className="pagination">
          <span onClick={()=> onClickHandler(page-1) } className={page > 1 ? "" : "pagination__disable"}>◀️</span>
        {
            [...Array(totalPages)].map((_,i)=>{
              return <span key={i} className={page === i + 1 ? "pagination__selected" : ""} onClick={()=>onClickHandler(i+1)}>{i+1}</span>
            })
            }
          <span onClick={()=> onClickHandler(page+1) } className={page < totalPages ? "" : "pagination__disable"}>▶️</span>
        </div>
      }

    </div>
  );
}

export default App;
