<<<<<<< HEAD
import {useState, useEffect} from 'react';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
=======
import { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';
>>>>>>> parent of b052ddb (Tehty uusi projekti)
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../firebaseConfig';

interface Product {
<<<<<<< HEAD
    id: string;
    name: string;
    price: number;
}

function ProductList(){
    const app= initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const [products, setProducts] = useState<Product[]>([]);
    const [newName, setNewName] = useState<string>(''); 
    const [newPrice, setNewPrice] = useState<number>(0);

    useEffect(() => {

    }, []);

    const addProduct = async () => {
        const newProduct: Product = { id: 'QMlCbAZVrdTgdfnYqqmV', name: newName, price: newPrice};
        const docRef = await addDoc(collection(db, 'product'), newProduct);
        setProducts([...products, {...newProduct, id: docRef.id}]);
    };

const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    if (name === 'name') {
        setNewName(value);
    } if (name === 'price') {
        setNewPrice(parseFloat(value));
    }
}

    return (
        <div>
            <h2>Tuotelista</h2>
            <div>
                <input type ="text" name ="name" value={newName}
                onChange={handleInputChange} placeholder="Tuotteen nimi" />
                <input type ="number" name='price' value={newPrice}
                onChange={handleInputChange} placeholder="Hinta" />
                <button onClick={addProduct}>Lisää tuote</button>
            </div>
            
        </div>
    );
};
    
=======
  id: string;
  name: string;
  price: number;
}

function ProductList() {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const [products, setProducts] = useState<Product[]>([]);
  const [newName, setNewName] = useState<string>('');
  const [newPrice, setNewPrice] = useState<number>(0);


  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, 'product'));
      const productsData: Product[] = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Omit<Product, 'id'>)
      }));
      setProducts(productsData);
    };

    fetchProducts();
  }, []);


  const addProduct = async () => {
    const newProduct: Omit<Product, 'id'> = { name: newName, price: newPrice };
    const docRef = await addDoc(collection(db, 'product'), newProduct);
    setProducts([...products, { ...newProduct, id: docRef.id }]);

    setNewName('');
    setNewPrice(0);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === 'name') {
      setNewName(value);
    }
    if (name === 'price') {
      setNewPrice(parseFloat(value));
    }
  };

  return (
    <div>
      <h2>Tuotelista</h2>
      <div>
        <input
          type="text"
          name="name"
          value={newName}
          onChange={handleInputChange}
          placeholder="Tuotteen nimi"
        />
        <input
          type="number"
          name="price"
          value={newPrice}
          onChange={handleInputChange}
          placeholder="Hinta"
        />
        <button onClick={addProduct}>Lisää tuote</button>
      </div>


      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} – {product.price} €
          </li>
        ))}
      </ul>
    </div>
  );
}

>>>>>>> parent of b052ddb (Tehty uusi projekti)
export default ProductList;
