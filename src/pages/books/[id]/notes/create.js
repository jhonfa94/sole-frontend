import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { noteAPI } from '@/hooks/note'
import { useRouter } from 'next/router'
import AuthValidationErrors from '@/components/AuthValidationErrors'
import Button from '@/components/Button'
import Label from '@/components/Label'
import Textarea from '@/components/Textarea'
import PreviousLink from '@/components/PreviousLink'
import axios from '@/lib/axios'
import { useAuth } from '@/hooks/auth'

const Create = () => {
    const { createBook, editBook } = noteAPI()
    const { user } = useAuth({ middleware: 'auth' })
    const [errors, setErrors] = useState([])
    const router = useRouter()
    const [description, setDescription] = useState('')
    const [writing_date, setWritingDate] = useState('')
    const [id, setBookId] = useState('')
    const [title, setTitle] = useState('')
    const [user_id, setUserId] = useState('')

    useEffect(() => {
        if (router.isReady) {
            setUserId(user.id)
            axios
                .get(`/api/books/${router.query.id}`)
                .then(res => {
                    setTitle(res.data.book.title)
                    setBookId(res.data.book.id)
                })
                .catch(error => {
                    if (error.response.status !== 409) throw error
                })
            if (router.query.idNote) {
                axios
                    .get(`/api/books/notes/${router.query.idNote}`)
                    .then(resTwo => {
                        setDescription(resTwo.data.description)
                        setWritingDate(resTwo.data.writing_date)
                    })
                    .catch(errorTwo => {
                        if (errorTwo.response.status === 403) {
                            router.push(`/403`)
                        }
                        // if (errorTwo.response.status !== 409) throw errorTwo
                    })
            }
        }
        currentDate()
    }, [router.isReady])

    const currentDate = () => {
        const date = new Date()
        let day = ('0' + date.getDate()).slice(-2)
        let month = ('0' + (date.getMonth() + 1)).slice(-2)
        let year = date.getFullYear()
        setWritingDate(`${year}-${month}-${day}`)
    }

    const submitForm = event => {
        event.preventDefault()
        if (!router.query.idNote) {
            createBook({ description, writing_date, book: { id, title }, user: { id: user_id }, setErrors })
        } else {
            editBook({ description, writing_date, book: { id, title }, user: { id: user_id }, setErrors }, router.query.idNote)
        }
    }

    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    {router.query.idNote ? "Editar Notas de autor" : "Crear Notas de autor"}: { title }
                </h2>
            }>
            <Head>
                <title>Laravel - books</title>
            </Head>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <AuthValidationErrors className="mb-4" errors={errors} />
                            <form onSubmit={submitForm}>
                                <div className="md:w-8/12 lg:w-5/12 lg:ml-20">
                                    <div className="mb-3 xl:w-96">
                                        <Label htmlFor="description">Nota</Label>
                                        <Textarea
                                            id="description"
                                            rows="3"
                                            value={description}
                                            onChange={event => setDescription(event.target.value)}
                                            placeholder="Nota"
                                        />
                                    </div>
                                    <Button>Guardar Nota de libro</Button>
                                </div>
                            </form>
                            <div className="flex justify-end ">
                                <PreviousLink href={{ pathname: `/books/[id]/notes`, query: { id: router.query.id }
                                }} as={`/books/${router.query.id}/notes`}>
                                </PreviousLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}
export default Create
