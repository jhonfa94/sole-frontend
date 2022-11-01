import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import { useRouter } from 'next/router'
import axios from '@/lib/axios'
import { useEffect, useState } from 'react'
import PreviousLink from '@/components/PreviousLink'

const Show = () => {
    const router = useRouter()
    const [title, setTitle] = useState('')
    const [subtitle, setSubtitle] = useState('')
    const [language, setLanguage] = useState('')
    const [page, setPage] = useState('')
    const [published, setPublished] = useState('')
    const [description, setDescription] = useState('')
    const [genre, setGenre] = useState('')
    const [publisher, setPublisher] = useState('')
    const [authors, setAuthors] = useState([])
    const [image, setImage] = useState('')

    useEffect(() => {
        if (router.isReady) {
            axios
                .get(`/api/books/${router.query.id}`)
                .then(res => {
                    setTitle(res.data.book.title)
                    setSubtitle(res.data.book.subtitle)
                    setLanguage(res.data.book.language)
                    setPage(res.data.book.page)
                    setPublished(FormatDate(res.data.book.published))
                    setDescription(res.data.book.description)
                    setGenre(res.data.book.genre.name)
                    setPublisher(res.data.book.publisher.name)
                    setAuthors(res.data.book.authors)
                    if (res.data.image != null) {
                        setImage('http://127.0.0.1:8000' + res.data.image)
                    }
                })
                .catch(error => {
                    if (error.response.status !== 409) throw error
                })
        }
    }, [router.isReady])

    function FormatDate(data) {
        const date = new Date(data.replace(/-/g, '\/'))
        const options = { year: "numeric", month: "2-digit", day: "2-digit" }
        return date.toLocaleDateString('es-MX', options)
    }

    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Ver Libro
                </h2>
            }>

            <Head>
                <title>Laravel - Author</title>
            </Head>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="flex justify-between py-3">
                                <div>
                                    <h3><strong>{ title }</strong></h3>
                                    <h4><strong>{ subtitle }</strong></h4>
                                    <p><strong>Lenguaje:</strong> { language }</p>
                                    <p><strong>Número de paginas:</strong> { page }</p>
                                    <p><strong>Fecha Publicación:</strong> { published }</p>
                                    <p><strong>Género Literario:</strong> { genre }</p>
                                    <p><strong>Editorial:</strong> { publisher }</p>
                                    <p><strong>Autor(res):</strong> { authors?.map((author) => (
                                        author.full_name + ", "
                                    ))}
                                    </p>
                                    <p> { description }</p>
                                </div>
                                <img src={ image } className="rounded-lg w-64"/>
                            </div>
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

export default Show
