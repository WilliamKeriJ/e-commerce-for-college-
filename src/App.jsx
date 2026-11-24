import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import { useState } from "react";

const products = [
 {id:1,name:"Classic Sneakers",category:"Fashion",price:2499,emoji:"👟"},
 {id:2,name:"Smart Watch",category:"Electronics",price:3299,emoji:"⌚"},
 {id:3,name:"Backpack",category:"Accessories",price:1499,emoji:"🎒"},
 {id:4,name:"Headphones",category:"Electronics",price:1999,emoji:"🎧"},
 {id:5,name:"Sunglasses",category:"Fashion",price:899,emoji:"🕶️"},
 {id:6,name:"Coffee Mug",category:"Home",price:499,emoji:"☕"}
];
function Layout({cart,category,setCategory}) {
 const location=useLocation();
 return <><header><Link to="/" className="logo">ShopEase</Link><div className="search">Simple shopping, made easy</div><Link className="cart" to="/cart">🛒 Cart ({cart.length})</Link></header>
 <nav><Link to="/">Home</Link><Link to="/products">Products</Link><Link to="/about">About</Link><Link to="/cart">Cart</Link></nav>
 <div className="layout"><aside><h3>Categories</h3>{["All","Fashion","Electronics","Accessories","Home"].map(c=><button className={category===c?"selected":""} key={c} onClick={()=>{setCategory(c); if(location.pathname!=="/"&&location.pathname!=="/products") window.location.href="/products"}}>{c}</button>)}</aside>
 <main><Routes><Route path="/" element={<Home category={category} setCategory={setCategory} />} /><Route path="/products" element={<Home category={category} setCategory={setCategory} />} /><Route path="/cart" element={<CartPage cart={cart} />} /><Route path="/about" element={<About />} /><Route path="*" element={<Home category={category} setCategory={setCategory}/>} /></Routes></main></div>
 <footer>© 2026 ShopEase | React E-Commerce Demo</footer></>;
}
function Home({category,setCategory}){const [notice,setNotice]=useState("");const filtered=category==="All"?products:products.filter(p=>p.category===category);return <><section className="banner"><h1>Welcome to ShopEase</h1><p>Find something you love.</p><Link to="/products" className="shopbtn">Explore Products</Link></section><h2>Featured Products</h2><div className="products">{filtered.map(p=><article className="product" key={p.id}><div className="emoji">{p.emoji}</div><h3>{p.name}</h3><p>{p.category}</p><b>₹{p.price.toLocaleString("en-IN")}</b><button onClick={()=>{window.dispatchEvent(new CustomEvent("add-cart",{detail:p}));setNotice(p.name+" added to cart!")}}>Add to Cart</button></article>)}</div>{notice&&<p className="notice">{notice}</p>}</>}
function CartPage({cart}){return <><h2>Your Cart</h2>{cart.length===0?<p>Your cart is empty. Add products to get started.</p>:<ul className="cartlist">{cart.map((p,i)=><li key={i}>{p.emoji} {p.name} — ₹{p.price.toLocaleString("en-IN")}</li>)}<h3>Total: ₹{cart.reduce((s,p)=>s+p.price,0).toLocaleString("en-IN")}</h3></ul>}</>}
function About(){return <><h2>About ShopEase</h2><p>This sample storefront demonstrates React components and navigation with React Router DOM.</p></>}
export default function App(){const [cart,setCart]=useState([]);const [category,setCategory]=useState("All");React.useEffect(()=>{const fn=e=>setCart(old=>[...old,e.detail]);window.addEventListener("add-cart",fn);return()=>window.removeEventListener("add-cart",fn)},[]);return <BrowserRouter><Layout cart={cart} category={category} setCategory={setCategory}/></BrowserRouter>}
