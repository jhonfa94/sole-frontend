import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import { bookAPI } from '@/hooks/book'
import { useEffect, useState } from 'react'
import Button from '@/components/Button'
import Label from '@/components/Label'
import Input from '@/components/Input'
import AuthValidationErrors from '@/components/AuthValidationErrors'
import PreviousLink from '@/components/PreviousLink'
import Select from '@/components/Select'
import Multiselect from '@/components/Multiselect'
import Textarea from '@/components/Textarea'
import axios from '@/lib/axios'
import ImageInput from '@/components/ImageInput'
import {useRouter} from 'next/router'

const Create = () => {
    const { create, edit } = bookAPI()
    const router = useRouter()
    const [errors, setErrors] = useState([])
    const [title, setTitle] = useState('')
    const [subtitle, setSubtitle] = useState('')
    const [language, setLanguage] = useState('Español')
    const [page, setPage] = useState('')
    const [published, setPublished] = useState('')
    const [description, setDescription] = useState('')
    const [genre_id, setGenreID] = useState('')
    const [publisher_id, setPublisherId] = useState('')
    const [authors_id, setAuthorsId] = useState([])
    const [genres, setGenres] = useState([])
    const [publishers, setPublishers] = useState([])
    const [authors, setAuthors] = useState([])
    const [image, setImage] = useState('')
    const [imageUrl, setImageUrl] = useState('')

    const ChooseValueLanguage = (val) => {
        setLanguage(val)
    }
    const ChooseValueGenre = (val) => {
        setGenreID(parseInt(val))
    }
    const ChooseValuePublisher = (val) => {
        setPublisherId(parseInt(val))
    }

    const onChangeHandler = event => {
        setImageUrl(URL.createObjectURL(event.target.files[0]))
        setImage(event.target.files[0])
    }

    const ChooseMultiValueAuthors = (val) => {
        const updatedOptions = [...val.target.options]
            .filter(option => option.selected)
            .map(x => x.value)
        setAuthorsId(updatedOptions)
    }

    const submitForm = async (event) => {
        event.preventDefault()
        const data = new FormData()
        data.append('image', image ? image : '')
        data.append('title', title)
        data.append('subtitle', subtitle)
        data.append('language', language)
        data.append('page', page)
        data.append('published', published)
        data.append('description', description)
        data.append('genre_id', genre_id)
        data.append('publisher_id', publisher_id)
        authors_id.map((author) => {data.append('authors[]', author)})
        if (!router.query.id) {
            create(data, setErrors)
        } else {
            data.append('_method', 'put')
            edit(data, setErrors, router.query.id)
        }
    }

    useEffect(() => {
        if (router.isReady) {
            if (router.query.id) {
                axios
                    .get(`/api/books/${router.query.id}`)
                    .then(res => {
                        console.log(res.data.book)
                        setTitle(res.data.book.title)
                        setSubtitle(res.data.book.subtitle)
                        setLanguage(res.data.book.language)
                        setPage(res.data.book.page)
                        setPublished(res.data.book.published)
                        setDescription(res.data.book.description)
                        setGenreID(res.data.book.genre_id)
                        setPublisherId(res.data.book.publisher_id)
                        // setAuthorsId([1])
                        setAuthorsId(res.data.book.authors.map((author) => { return author.id }))
                        if (res.data.image != null) {
                            setImageUrl('http://127.0.0.1:8000' + res.data.image)
                        }
                    })
                    .catch(error => {
                        if (error.response.status !== 409) throw error
                    })
            }
            axios
                .get('/api/genres')
                .then(res => {
                    setGenres(res.data)
                    if (!router.query.id) {
                        setGenreID(res.data[0].id)
                    }
                })
                .catch(error => {
                    if (error.response.status !== 409) throw error
                })

            axios
                .get('/api/publishers')
                .then(res => {
                    setPublishers(res.data)
                    if (!router.query.id) {
                        setPublisherId(res.data[0].id)
                    }
                })
                .catch(error => {
                    if (error.response.status !== 409) throw error
                })

            axios
                .get('/api/authors')
                .then(res => {
                    setAuthors(res.data)
                })
                .catch(error => {
                    if (error.response.status !== 409) throw error
                })

        }
    }, [])

    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Crear Libro
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
                                        <Label htmlFor="title">Título</Label>
                                        <Input
                                            id="title"
                                            type="text"
                                            value={title}
                                            className="block mt-1 w-full"
                                            onChange={event => setTitle(event.target.value)}
                                            placeholder="Título"
                                        />
                                    </div>
                                    <div className="mb-3 xl:w-96">
                                        <Label htmlFor="subtitle">Sub Titulo</Label>
                                        <Input
                                            id="subtitle"
                                            type="text"
                                            value={subtitle}
                                            className="block mt-1 w-full"
                                            onChange={event => setSubtitle(event.target.value)}
                                            placeholder="Sub Título"
                                        />
                                    </div>
                                    <div className="mb-3 xl:w-96">
                                        <Label htmlFor="page">Num. Páginas</Label>
                                        <Input
                                            id="page"
                                            type="text"
                                            maxLength="5"
                                            value={page}
                                            className="block mt-1 w-full"
                                            onChange={event => setPage(event.target.value)}
                                            placeholder="Num. Páginas"
                                        />
                                    </div>
                                    <div className="mb-3 xl:w-96">
                                        <Label htmlFor="language">Idioma</Label>
                                        <Select onChange={(val) => ChooseValueLanguage(val.target.value)} value={language}>
                                            <option value="Español">Español</option>
                                            <option value="Ingles">Ingles</option>
                                            <option value="Portugues">Portugues</option>
                                        </Select>
                                    </div>
                                    <div className="mb-3 xl:w-96">
                                        <Label htmlFor="published">Fecha publicación</Label>
                                        <Input
                                            id="published"
                                            type="text"
                                            value={published}
                                            className="block mt-1 w-full"
                                            onChange={event => setPublished(event.target.value)}
                                            placeholder="yyyy-mm-dd"
                                        />
                                    </div>
                                    <div className="mb-3 xl:w-96">
                                        <Label htmlFor="language">Género Literario</Label>
                                        <Select onChange={(val) => ChooseValueGenre(val.target.value)} value={genre_id}>
                                            { genres?.map((genre) => (
                                                <option value={genre.id} key={genre.id}>{genre.name}</option>
                                            ))}
                                        </Select>
                                    </div>
                                    <div className="mb-3 xl:w-96">
                                        <Label htmlFor="language">Editorial</Label>
                                        <Select onChange={(val) => ChooseValuePublisher(val.target.value)} value={publisher_id}>
                                            { publishers?.map((publisher) => (
                                                <option value={publisher.id} key={publisher.id}>{publisher.name}</option>
                                            ))}
                                        </Select>
                                    </div>
                                    <div className="mb-3 xl:w-96">
                                        <Label htmlFor="language">Autor(es)</Label>
                                        <Multiselect onChange={ChooseMultiValueAuthors} value={authors_id} options={authors}>
                                            { authors?.map((author) => (
                                                <option value={author.id} key={author.id}>{author.full_name}</option>
                                            ))}
                                        </Multiselect>
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
                                    <Button>Guardar Libro</Button>
                                </div>
                            </form>
                            <div className="flex justify-end ">
                                <PreviousLink href="/books"></PreviousLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}
export default Create
