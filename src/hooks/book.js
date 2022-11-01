import axios from '@/lib/axios'
import { useToasts } from 'react-toast-notifications'
import { useRouter } from 'next/router'

export const bookAPI = () => {
    const { addToast } = useToasts()
    const router = useRouter()

    const create = async (data, setErrors) => {
        setErrors([])
        axios
            .post('/api/books', data)
            .then(res => {
                addToast(res.data.message, { appearance: 'success', autoDismiss: true })
                router.push('/books')
            })
            .catch(error => {
                if (error.response.status !== 422) throw error
                setErrors(Object.values(error.response.data.errors).flat())
                addToast('Error al crear el Formulario', { appearance: 'error', autoDismiss: true })
            })
    }

    const edit = async (data, setErrors, id) => {
        setErrors([])
        axios
            .post(`/api/books/${id}`, data)
            .then(res => {
                addToast(res.data.message, { appearance: 'success', autoDismiss: true })
                router.push('/books')
            })
            .catch(error => {
                if (error.response.status !== 422) throw error
                setErrors(Object.values(error.response.data.errors).flat())
                addToast('Error al editar el Formulario', { appearance: 'error', autoDismiss: true })
            })
    }

    const destroy = async (id) => {
        axios
            .delete(`/api/books/${id}`)
            .then(res => {
                addToast(res.data.message, { appearance: 'success', autoDismiss: true })
            })
            .catch(error => {
                if (error.response.status !== 422) throw error
                addToast('Error al eliminar el Formulario', { appearance: 'error', autoDismiss: true })
            })
    }

    return {
        create,
        edit,
        destroy,
    }
}
