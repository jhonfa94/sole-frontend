import axios from '@/lib/axios'
import { useToasts } from 'react-toast-notifications'
import { useRouter } from 'next/router'

export const authorAPI = () => {
    const { addToast } = useToasts()
    const router = useRouter()

    const create = async (data, setErrors) => {
        setErrors([])
        axios
            .post('/api/authors', data)
            .then(res => {
                addToast(res.data.message, { appearance: 'success', autoDismiss: true })
                router.push('/authors')
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
            .post(`/api/authors/${id}`, data)
            .then(res => {
                addToast(res.data.message, { appearance: 'success', autoDismiss: true })
                router.push('/authors')
            })
            .catch(error => {
                if (error.response.status !== 422) throw error
                setErrors(Object.values(error.response.data.errors).flat())
                addToast('Error al editar el Formulario', { appearance: 'error', autoDismiss: true })
            })
    }

    const destroy = async (id) => {
        axios
            .delete(`/api/authors/${id}`)
            .then(res => {
                addToast(res.data.message, { appearance: 'success', autoDismiss: true })
            })
            .catch(error => {
                if (error.response.status !== 422) throw error
                addToast('Error al eliminar el Formulario', { appearance: 'error', autoDismiss: true })
            })
    }

    const createProfile = async ({ setErrors, ...props }) => {
        setErrors([])
        axios
            .post('/api/profiles', props)
            .then(res => {
                addToast(res.data.message, { appearance: 'success', autoDismiss: true })
                router.push('/authors')
            })
            .catch(error => {
                if (error.response.status !== 422) throw error
                setErrors(Object.values(error.response.data.errors).flat())
                addToast('Error al crear el Formulario', { appearance: 'error', autoDismiss: true })
            })
    }

    const editProfile = async ({ setErrors, ...props }, id) => {
        setErrors([])
        axios
            .put(`/api/profiles/${id}`, props)
            .then(res => {
                addToast(res.data.message, { appearance: 'success', autoDismiss: true })
                router.push('/authors')
            })
            .catch(error => {
                if (error.response.status !== 422) throw error
                setErrors(Object.values(error.response.data.errors).flat())
                addToast('Error al editar el Formulario', { appearance: 'error', autoDismiss: true })
            })
    }

    return {
        create,
        edit,
        destroy,
        createProfile,
        editProfile,
    }
}
