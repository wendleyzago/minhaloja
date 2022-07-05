import {FaRegEdit, FaTrashAlt} from "react-icons/fa"
import style from './Table.module.css'

const API = "http://localhost:5000"

function Table({list, setList, setProduct, setPrice, setDueDate, setEdit, setId}) {

    const handleEdit = async (data) => {
        document.getElementById("btn").innerText = "Editar"

        setProduct(data.product)
        setPrice(data.price)
        setDueDate(data.dueDate)
        setId(data.id)

        setEdit(true)
        

    }

    const handleDelete = async (id) => {

        await fetch(API + "/data/" + id, {
            method: "DELETE"
        })

        setList((prevState) => prevState.filter((list) => list.id !== id))
    }

    return (
        <div className={style.content}>
            <table border="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Preço</th>
                        <th>Data de vencimento</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody id="tbody">
                {list.map((data) => (
                    <tr key={data.id} className={style.actions}>
                        <td>{data.id}</td>
                        <td>{data.product}</td>
                        <td>{data.price}</td>
                        <td>{data.dueDate}</td>
                        <td>
                           <FaRegEdit onClick={() => handleEdit(data)}/>
                           <FaTrashAlt onClick={() => handleDelete(data.id)}/>
                        </td>
                    </tr>         
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default Table