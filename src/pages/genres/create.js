import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import { genreAPI } from '@/hooks/genre'
import { useEffect, useState } from 'react'
import Button from '@/components/Button'
import Label from '@/components/Label'
import Input from '@/components/Input'
import Textarea from '@/components/Textarea'
import AuthValidationErrors from '@/components/AuthValidationErrors'
import PreviousLink from '@/components/PreviousLink'
import { useRouter } from 'next/router'
import axios from '@/lib/axios'

const Create = () => {
    const { create, edit } = genreAPI()
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [errors, setErrors] = useState([])
    const router = useRouter()

    const submitForm = event => {
        event.preventDefault()
        if (!router.query.id) {
            create({ name, description, setErrors })
        } else {
            edit({ name, description, setErrors }, router.query.id)
        }
    }

    useEffect(() => {
        if (router.query.id) {
            axios
                .get(`/api/genres/${router.query.id}`)
                .then(res => {
                    setName(res.data.name)
                    setDescription(res.data.description)
                })
                .catch(error => {
                    if (error.response.status !== 409) throw error
                })
        }
    }, [router.query.id])

    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    {router.query.id ? "Editar Género Literario" : "Crear Género Literario"}
                </h2>
            }>
            <Head>
                <title>Laravel - Genre</title>
            </Head>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <AuthValidationErrors className="mb-4" errors={errors} />
                            <form onSubmit={submitForm}>
                                <div className="md:w-8/12 lg:w-5/12 lg:ml-20">
                                    <div className="mb-3 xl:w-96">
                                        <Label htmlFor="name">Nombre</Label>
                                        <Input
                                            id="name"
                                            type="text"
                                            value={name}
                                            className="block mt-1 w-full"
                                            onChange={event => setName(event.target.value)}
                                            placeholder="Nombre"
                                        />
                                    </div>
                                    <div className="mb-3 xl:w-96">
                                        <Label htmlFor="description">Descripción</Label>
                                        <Textarea
                                            id="description"
                                            rows="3"
                                            value={description}
                                            onChange={event => setDescription(event.target.value)}
                                            placeholder="Descripción"
                                        />
                                    </div>
                                    <Button>Guardar Género literario</Button>
                                </div>
                            </form>
                            <div className="flex justify-end ">
                                <PreviousLink href="/genres"></PreviousLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}
export default Create
