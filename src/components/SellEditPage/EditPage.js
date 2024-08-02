import React, { useState, useEffect } from 'react';
import { UserContext } from '../../App';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import EditForm from './EditForm';
import { useParams } from 'react-router-dom';



const EditPage = () => {
    const params = useParams();
    const prodId = params.productId;
    const [produto, setProduto] = useState(null);

    const [categorias, setCategorias] = useState([]);
    const [tamanhos, setTamanhos] = useState([]);
    const [condicoes, setCondicoes] = useState([]);

    const [currentInput, setCurrentInput] = useState('');
    const [currentCategory, setCurrentCategory] = useState('');
    
    const loggedUser = React.useContext(UserContext);
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    //USUARIO
    useEffect(() => {
      const fetchUser = async () => {
        try {
          const usuario = await loggedUser;
          setCurrentUser(usuario);
        } catch (error) {
          console.error('Failed to fetch user:', error);
        }
      };
    
      fetchUser();
    }, [loggedUser]);
    
    //informações do usuário
    useEffect(() => {
        const fetchUser = async () => {
            if (loggedUser) {
                const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/users/id/${loggedUser.id}`);
                if (!res.ok) throw new Error('HTTP error ' + res.status);
                const data = await res.json();
                setCurrentUser(data);
            }
        };

        Promise.all([fetchUser()])
            .then(() => setLoading(false)) 
            .catch(error => console.error('Fetch failed:', error));
    }, []);

    useEffect(() => {
        const fetchCategorias = async () => {
            return fetch(`${process.env.REACT_APP_API_BASE_URL}/caracs/Categories`)
                .then(res => res.json())
                .then(data => {
                    setCategorias(data);
                })
                .catch(error => console.error('Fetch failed:', error));
        }

        const fetchTamanhos = async () => {
            return fetch(`${process.env.REACT_APP_API_BASE_URL}/caracs/Size`)
                .then(res => res.json())
                .then(data => {
                    setTamanhos(data);
                })
                .catch(error => console.error('Fetch failed:', error));
        }

        const fetchCondicoes = async () => {
            return fetch(`${process.env.REACT_APP_API_BASE_URL}/caracs/Condition`)
                .then(res => res.json())
                .then(data => {
                    setCondicoes(data);
                })
                .catch(error => console.error('Fetch failed:', error));
        };

        const fetchProduto = async () => {
            return fetch(`${process.env.REACT_APP_API_BASE_URL}/products/` + prodId)
                .then(res => res.json())
                .then(data => {
                    setProduto(data);
                })
                .catch(error => console.error('Fetch failed:', error));
        };


        Promise.all([fetchProduto(), fetchCategorias(), fetchTamanhos(), fetchCondicoes()])
            .then(() => setLoading(false))
            .catch(error => console.error('Fetch failed:', error));
    }, []);

    if (!currentUser || !produto 
        || !categorias || !tamanhos || !condicoes
    ) return <div>Loading... {prodId}</div>;

    console.log(categorias);
    return (
        <div>
            <Header isLoggedIn={currentUser} user={currentUser} currentInput={currentInput} setCurrentInput={setCurrentInput} />
            <EditForm product={produto} user={currentUser} categories={categorias} sizes={tamanhos} conditions={condicoes} />
            <Footer user={currentUser}/>
        </div>
    );
}

export default EditPage;