import {useState, useEffect} from 'react';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../firebaseConfig';

interface Product {
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
        const newProduct: Product = { id: '', name: newName, price: newPrice};
        const docRef = await addDoc(collection(db, 'product'), newProduct);
        setProducts([...products, {...newProduct, id: docRef.id}]);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
      
        if (name === 'name') {
          setNewName(value); // Tämä ohjaa tekstikentän sisältöä
        } else if (name === 'price') {
          setNewPrice(parseFloat(value));
        }
      };

    return (
        <div>
            <h2>Tuotelista</h2>
            <div>
                <input type ="text" name ="name" value={newName}
                onChange={handleInputChange} placeholder="Tuotteen nimi" />
                <input type ="number" value={newPrice}
                onChange={handleInputChange} placeholder="Hinta" />
                <button onClick={addProduct}>Lisää tuote</button>
            </div>
            
        </div>
    );
};
    
export default ProductList;
