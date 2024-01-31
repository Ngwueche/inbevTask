export const getStaticProps = async () => {
    const res = await fetch('https://dummyjson.com/products');
    const data = await res.json();
  
    return {
      props: { products: data }
    }
  }