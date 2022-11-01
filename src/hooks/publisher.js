import axios from '@/lib/axios'
import { useToasts } from 'react-toast-notifications'
import { useRouter } from 'next/router'

export const publisherAPI = () => {
    const { addToast } = useToasts()
    const router = useRouter()

    const create = async ({ setErrors, ...props }) => {
        setErrors([])
        axios
            .post('/api/publishers', props)
            .then(res => {
                addToast(res.data.message, { appearance: 'success', autoDismiss: true })
                router.push('/publishers')
            })
            .catch(error => {
                if (error.response.status !== 422) throw error
                setErrors(Object.values(error.response.data.errors).flat())
                addToast('Error al crear el Formulario', { appearance: 'error', autoDismiss: true })
            })
    }

    const edit = async ({ setErrors, ...props }, id) => {
        setErrors([])
        axios
            .put(`/api/publishers/${id}`, props)
            .then(res => {
                addToast(res.data.message, { appearance: 'success', autoDismiss: true })
                router.push('/publishers')
            })
            .catch(error => {
                if (error.response.status !== 422) throw error
                setErrors(Object.values(error.response.data.errors).flat())
                addToast('Error al editar el Formulario', { appearance: 'error', autoDismiss: true })
            })
    }

    const destroy = async (id) => {
        axios
            .delete(`/api/publishers/${id}`)
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
        destroy
    }
}
