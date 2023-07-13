import Layout from "@/components/Layout"
import axios from "axios"
import { useEffect, useState } from "react"
import { withSwal } from 'react-sweetalert2';

function CategoriesPages({ swal }) {
    const [editedCategory, setEditedCategory] = useState('')
    const [name, setName] = useState('')
    const [parentCategory, setParentCategory] = useState('')
    const [categories, setCategories] = useState([])

    useEffect(() => {
        fetchCategory()
    }, [])
    function fetchCategory() {
        axios.get('/api/categories').then(result => {
            setCategories(result.data)
        })
    }

    async function saveCategory(ev) {
        ev.preventDefault();
        const data = { name, parentCategory }
        if (editedCategory) {
            data._id = editedCategory._id
            await axios.put('/api/categories', data)
            setEditedCategory(null)
        } else {
            await axios.post('/api/categories', data)
        }
        setName('')
        fetchCategory()
    }

    function editCategory(category) {
        setEditedCategory(category)
        setName(category.name)
        setParentCategory(category.parent?._id)
    }

    function deleteCategory(category) {
        swal.fire({
            title: 'Delete category',
            text: `Do you want to delete ${category.name}`,
            showCancelButton: true,
            cancelButtonText: 'Cancel',
            confirmButtonText: 'Yes, Delete!',
            confirmButtonColor: '#d55',
        }).then(async result => {
            if (result.isConfirmed) {
                const { _id } = category
                await axios.delete('/api/categories?_id=' + _id)
                fetchCategory()
            }
        })
    }

    return (
        <Layout>
            <h1>Categories</h1>
            <label>{editedCategory ? `Edit Category ${editedCategory.name}` : 'Create New Category'}</label>
            <form onSubmit={saveCategory} className="flex gap-1">
                <input
                    className="mb-0"
                    type="Text"
                    placeholder={"Category Name"}
                    onChange={ev => setName(ev.target.value)}
                    value={name}
                />
                <select
                    className="mb-0"
                    value={parentCategory}
                    onChange={ev => setParentCategory(ev.target.value)}
                >
                    <option value="">No parent category</option>
                    {categories.length > 0 && categories.map(category => (
                        <option value={category._id}>{category.name}</option>
                    )
                    )}
                </select>
                <button type="submit" className="btn-primary py-1">Save</button>
            </form>
            <table className="basic mt-4">
                <thead>
                    <tr>
                        <td>
                            Category Name
                        </td>
                        <td>
                            Parent Category
                        </td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    {categories.length > 0 && categories.map(category => (
                        <tr>
                            <td>{category.name}</td>
                            <td>
                                {category?.parent?.name}
                            </td>
                            <td>
                                <button onClick={() => editCategory(category)} className="btn-primary mr-1">Edit</button>
                                <button onClick={() => deleteCategory(category)} className="btn-primary">Delete</button>
                            </td>
                        </tr>
                    )
                    )}
                </tbody>
            </table>
        </Layout>
    )
}

export default withSwal(({ swal }, ref) => (
    <CategoriesPages swal={swal} />
))