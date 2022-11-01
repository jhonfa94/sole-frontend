import axios from '@/lib/axios'
import { useToasts } from 'react-toast-notifications'
import { useRouter } from 'next/router'

export const genreAPI = () => {
    const { addToast } = useToasts()
    const router = useRouter()

    const create = ({ setErrors, ...props }) => {
        setErrors([])
        axios
            .post('/api/genres', props)
            .then(res => {
                addToast(res.data.message, { appearance: 'success', autoDismiss: true })
                router.push('/genres')
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
            .put(`/api/genres/${id}`, props)
            .then(res => {
                addToast(res.data.message, { appearance: 'success', autoDismiss: true })
                router.push('/genres')
            })
            .catch(error => {
                if (error.response.status !== 422) throw error
                setErrors(Object.values(error.response.data.errors).flat())
                addToast('Error al editar el Formulario', { appearance: 'error', autoDismiss: true })
            })
    }

    const destroy = async (id) => {
        axios
            .delete(`/api/genres/${id}`)
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
