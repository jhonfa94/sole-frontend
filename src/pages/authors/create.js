import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import { authorAPI } from '@/hooks/author'
import { useEffect, useState } from 'react'
import Button from '@/components/Button'
import Label from '@/components/Label'
import Input from '@/components/Input'
import AuthValidationErrors from '@/components/AuthValidationErrors'
import PreviousLink from '@/components/PreviousLink'
import { useRouter } from 'next/router'
import axios from '@/lib/axios'
import ImageInput from '@/components/ImageInput'

const Create = () => {
    const { create, edit } = authorAPI()
    const router = useRouter()
    const [errors, setErrors] = useState([])
    const [full_name, setFullName] = useState('')
    const [birth_date, setBirthDate] = useState('')
    const [country, setCountry] = useState('')
    const [image, setImage] = useState('')
    const [imageUrl, setImageUrl] = useState('')

    const submitForm = async (event) => {
        event.preventDefault()
        const data = new FormData()
        data.append('image', image ? image : '')
        data.append('full_name', full_name)
        data.append('birth_date', birth_date)
        data.append('country', country)
        if (!router.query.id) {
            create(data, setErrors)
        } else {
            data.append('_method', 'put')
            edit(data, setErrors, router.query.id)
        }
    }

    const onChangeHandler = event => {
        setImageUrl(URL.createObjectURL(event.target.files[0]))
        setImage(event.target.files[0])
    }

    useEffect(() => {
        if (router.query.id) {
            axios
                .get(`/api/authors/${router.query.id}`)
                .then(res => {
                    setFullName(res.data.author.full_name)
                    setBirthDate(res.data.author.birth_date)
                    setCountry(res.data.author.country)
                    if (res.data.image != null) {
                        setImageUrl('http://127.0.0.1:8000' + res.data.image)
                    }
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
                    {router.query.id ? "Editar Autor" : "Crear Autor"}
                </h2>
            }>
            <Head>
                <title>Laravel - Authors</title>
            </Head>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <AuthValidationErrors className="mb-4" errors={errors} />
                            <form onSubmit={submitForm}>
                                <div className="md:w-8/12 lg:w-5/12 lg:ml-20">
                                    <div className="mb-3 xl:w-96">
                                        <Label htmlFor="full_name">Nombre Completo</Label>
                                        <Input
                                            id="full_name"
                                            type="text"
                                            value={full_name}
                                            className="block mt-1 w-full"
                                            onChange={event => setFullName(event.target.value)}
                                            placeholder="Nombre Completo"
                                        />
                                    </div>
                                    <div className="mb-3 xl:w-96">
                                        <Label htmlFor="birth_date">Fecha de Nacimiento</Label>
                                        <Input
                                            id="birth_date"
                                            type="text"
                                            value={birth_date}
                                            className="block mt-1 w-full"
                                            onChange={event => setBirthDate(event.target.value)}
                                            placeholder="yyyy-mm-dd"
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
                                    <div className="mb-3 w-96">
                                        <Label htmlFor="image">Imagen</Label>
                                        <ImageInput
                                            id="image"
                                            type="file"
                                            className="block mt-1 w-full"
                                            onChange={onChangeHandler}
                                        />
                                    </div>
                                    <img src={imageUrl} className="rounded-lg w-48 py-2" />
                                    <Button>Guardar Author</Button>
                                </div>
                            </form>
                            <div className="flex justify-end ">
                                <PreviousLink href="/authors"></PreviousLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}
export default Create
