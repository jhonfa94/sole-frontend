import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import { publisherAPI } from '@/hooks/publisher'
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
    const { create, edit } = publisherAPI()
    const [errors, setErrors] = useState([])
    const [name, setName] = useState('')
    const [country, setCountry] = useState('')
    const [website, setWebsite] = useState('')
    const [email, setEmail] = useState('')
    const [description, setDescription] = useState('')
    const router = useRouter()

    const submitForm = event => {
        event.preventDefault()
        if (!router.query.id) {
            create({ name, country, website, email, description, setErrors })
        } else {
            edit({ name, country, website, email, description, setErrors }, router.query.id)
        }
    }

    useEffect(() => {
        if (router.query.id) {
            axios
                .get(`/api/publishers/${router.query.id}`)
                .then(res => {
                    setName(res.data.name)
                    setCountry(res.data.country)
                    setWebsite(res.data.website)
                    setEmail(res.data.email)
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
                    {router.query.id ? "Editar Editorial" : "Crear Editorial"}
                </h2>
            }>
            <Head>
                <title>Laravel - Publishers</title>
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
                                        <Label htmlFor="country">País</Label>
                                        <Input
                                            id="country"
                                            type="text"
                                            value={country}
                                            className="block mt-1 w-full"
                                            onChange={event => setCountry(event.target.value)}
                                            placeholder="País"
                                        />
                                    </div>
                                    <div className="mb-3 xl:w-96">
                                        <Label htmlFor="website">Página Web</Label>
                                        <Input
                                            id="website"
                                            type="text"
                                            value={website}
                                            className="block mt-1 w-full"
                                            onChange={event => setWebsite(event.target.value)}
                                            placeholder="Página Web"
                                        />
                                    </div>
                                    <div className="mb-3 xl:w-96">
                                        <Label htmlFor="website">Correo Electrónico</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={email}
                                            className="block mt-1 w-full"
                                            onChange={event => setEmail(event.target.value)}
                                            placeholder="Correo Electrónico"
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
                                    <Button>Guardar Editorial</Button>
                                </div>
                            </form>
                            <div className="flex justify-end ">
                                <PreviousLink href="/publishers"></PreviousLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}
export default Create
