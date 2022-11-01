import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import axios from '@/lib/axios'
import Router from 'next/router'
import Button from '@/components/Button'
import ViewLink from '@/components/ViewLink'
import EditLink from '@/components/EditLink'
import { authorAPI } from '@/hooks/author'
import DeleteButton from '@/components/DeleteButton'
import ProfileLink from '@/components/ProfileLink'
import NoteLink from '@/components/NoteLink'
import Star from '@/components/Star'
import NotStar from '@/components/NotStar'
import RatingLink from '@/components/RatingLink'

const Index = () => {
    const { destroy } = authorAPI()
    const [authors, setAuthors] = useState([])

    useEffect(() => {
        axios
            .get('/api/authors')
            .then(res => {
                setAuthors(res.data)
            })
            .catch(error => {
                if (error.response.status !== 409) throw error
            })
    }, [])

    function FormatDate(data) {
        const date = new Date(data.replace(/-/g, '\/'))
        const options = { year: "numeric", month: "2-digit", day: "2-digit" }
        return date.toLocaleDateString('es-MX', options)
    }

    function destroyItem(id) {
        if (confirm('¿Seguro que desea eliminar el elemento seleccionado?')) {
            destroy(id)
            setAuthors([...authors.filter((author) => author.id !== id)])
        }
    }

    function averageStar(ratings){
        const average = 0
        const count = 0
        ratings?.map((rating) => (
            average = average + parseInt(rating.number_star),
            count = count + 1
        ))
        if(count > 0){
            return parseInt(average / count)
        }
        else {
            return parseInt(0)
        }
    }

    function numberStar(ratings){
        const count = 0
        ratings?.map((rating) => (
            count = count + 1
        ))
        return parseInt(count)
    }


    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Autores
                </h2>
            }>
            <Head>
                <title>Laravel - Author</title>
            </Head>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="flex space-x-2 justify-start">
                                <Button
                                    type="button"
                                    onClick={() => Router.push('/authors/create', '/authors/create')}>
                                    Nuevo Autor
                                </Button>
                            </div>
                            <table className="min-w-full">
                                <thead className="border-b bg-gray-50">
                                    <tr>
                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">
                                            Author
                                        </th>
                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">
                                            Fecha nacimiento
                                        </th>
                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">
                                            País
                                        </th>
                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">
                                            Puntuación
                                        </th>
                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">
                                            Acción
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { authors?.map((author) => (
                                        <tr className="bg-white border-b" key={author.id}>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4">
                                                { author.full_name }
                                            </td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4">
                                                { FormatDate(author.birth_date)}
                                            </td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4">
                                                { author.country }
                                            </td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4">
                                                <ul className="flex justify-center">
                                                    {[...Array(averageStar(author.ratings))].map((star, index) =>(
                                                        <Star key={ index } className="w-4">
                                                        </Star>
                                                    ))}
                                                    {[...Array(5 - averageStar(author.ratings))].map((star, index) =>(
                                                        <NotStar key={ index } className="w-4">
                                                        </NotStar>
                                                    ))}
                                                    ({ numberStar(author.ratings)})
                                                </ul>
                                            </td>
                                            <td className="flex space-x-2 text-sm text-gray-900 font-light px-6 py-4">
                                                <ViewLink href={{ pathname: `/authors/show/[id]`, query: { id: author.id }
                                                }} as={`/authors/show/${author.id}`}>
                                                </ViewLink>
                                                <EditLink href={{ pathname: `/authors/edit/[id]`, query: { id: author.id }
                                                }} as={`/authors/edit/${author.id}`}>
                                                </EditLink>
                                                <ProfileLink href={{ pathname: `/authors/[id]/profile/create`, query: { id: author.id }
                                                }} as={`/authors/${author.id}/profile/create`}>
                                                </ProfileLink>
                                                <NoteLink href={{ pathname: `/authors/[id]/notes`, query: { id: author.id }
                                                }} as={`/authors/${author.id}/notes`}>
                                                </NoteLink>
                                                <RatingLink href={{ pathname: `/authors/[id]/ratings/create`, query: { id: author.id }
                                                }} as={`/authors/${author.id}/ratings/create`}>
                                                </RatingLink>
                                                <DeleteButton onClick={(e) => {
                                                    e.stopPropagation()
                                                    destroyItem(author.id)
                                                }}>
                                                </DeleteButton>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}
export default Index
