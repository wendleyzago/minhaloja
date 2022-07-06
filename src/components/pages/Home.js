import Input from '../form/Input'
import Table from '../form/Table'
import style from './Home.module.css'
import {useEffect, useState} from 'react'



const API = "http://localhost:5000"


function Home() {
    const [product, setProduct] = useState("")
    const [price, setPrice] = useState("")
    const [dueDate, setDueDate] = useState("")
    const [list, setList] = useState([])
    const [edit, setEdit] = useState(false)
    const [id, setId] = useState()
   
  

    useEffect(() => {

        const loadData = async () => {

            const res = await fetch(API + "/data")
                .then((res) => res.json())
                .then((data) => data)
                .catch((err) => console.log(err))

                setList(res)
                
        }
        
        loadData()
        
    }, [])

    const handleSave = async () => {
        
       if(edit){
        handleEdit()
       } else if (validateInputField()){
        const data = {
            id: Math.floor(Math.random() * 10000),
            product,
            price,
            dueDate,
        }

       await fetch(API + "/data", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        })

        setList((prevState) => [...prevState, data])

        setProduct("")
        setPrice("")
        setDueDate("")
       }
        
    }

    const handleClean = () => {
        setProduct("")
        setPrice("")
        setDueDate("")
    }


    const handleEdit = async () => {
        if (validateInputField()) {
            const data = await fetch(API + "/data")
            .then((res) => res.json())
            .then((data) => data)

        for(let i = 0; i < data.length; i++){
            if(data[i].id == id){
                data[i].product = product
                data[i].price = price
                data[i].dueDate = dueDate
                setList(data)
            }
        setEdit(false)
        handleClean()

        document.getElementById("btn").innerText = "Salvar"
        }

        }
    }

    const validateInputField = () => {
        let msg = ""

        if(product === "") {
            msg += "- Informe o nome do produto!\n"
        }

        if(price === "") {
            msg += "- Informe o preço do produto!\n"
        }

        if(dueDate === "") {
            msg += "- Informe a data de vencimento!\n"
        }

        if(msg !== "") {
            alert(msg)
            return false
        }
        return true
    }

 

    return (
        <main>
            <div className={style.title}>
                <h2>Produtos</h2>
                <p>Lista de produtos da minha loja</p>
            </div>

            <div className={style.card}>
                <Input 
                    type="text"
                    placeholder="Nome do produto"
                    name="product_name"
                    text="Produto:"
                    handleChange={setProduct}
                    value={product}
                    />
                    
                
                <Input
                    type="text"
                    placeholder="Preço do produto"
                    name="product_price"
                    text="Valor:"
                    handleChange={setPrice}
                    value={price}
                    />

               
                <Input
                    type="text"
                    name="dueDate"
                    text="Data de vencimento:"
                    placeholder="dd/mm/aaaa"
                    handleChange={setDueDate}
                    value={dueDate.replace(/^(\d{2})(\d{2})/, "$1/$2/")}
                    maxlength="10"
                    />
                
                <button onClick={handleSave} id="btn">Salvar</button>
                <button onClick={handleClean}>Limpar</button>
            </div>

            <Table 
                list={list} 
                setList={setList} 
                setProduct={setProduct} 
                setPrice={setPrice}
                setDueDate={setDueDate}
                setEdit={setEdit}
                setId = {setId}
            />

        </main>
    )
}

export default Home