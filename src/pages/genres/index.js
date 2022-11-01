import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import axios from '@/lib/axios'
import Router from 'next/router'
import Button from '@/components/Button'
import ViewLink from '@/components/ViewLink'
import EditLink from '@/components/EditLink'
import { genreAPI } from '@/hooks/genre'
import DeleteButton from '@/components/DeleteButton'

const Index = () => {
    const [genres, setGenres] = useState([])
    const { destroy } = genreAPI()
    useEffect(() => {
        axios
            .get('/api/genres')
            .then(res => {
                setGenres(res.data)
            })
            .catch(error => {
                if (error.response.status !== 409) throw error
            })
    }, [])

    function destroyItem(id) {
        if (confirm('¿Seguro que desea eliminar el elemento seleccionado?')) {
            destroy(id)
            setGenres([...genres.filter((genre) => genre.id !== id)])
        }
    }

    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Géneros Literarios
                </h2>
            }>
            <Head>
                <title>Laravel - Genre</title>
            </Head>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="flex space-x-2 justify-start">
                                <Button
                                    type="button"
                                    onClick={() => Router.push('/genres/create', '/genres/create')}>
                                    Nuevo Género literario
                                </Button>
                            </div>
                            <table className="min-w-full">
                                <thead className="border-b bg-gray-50">
                                <tr>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">
                                        Género Literario
                                    </th>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">
                                        Descripción
                                    </th>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">
                                        Acción
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                { genres?.map((genre) => (
                                    <tr className="bg-white border-b" key={genre.id}>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4">
                                            { genre.name }
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4">
                                            { genre.description }
                                        </td>
                                        <td className="flex space-x-2 text-sm text-gray-900 font-light px-6 py-4">
                                            <ViewLink href={{ pathname: `/genres/show/[id]`, query: { id: genre.id }
                                                }} as={`/genres/show/${genre.id}`}>
                                            </ViewLink>
                                            <EditLink href={{ pathname: `/genres/edit/[id]`, query: { id: genre.id }
                                                }} as={`/genres/edit/${genre.id}`}>
                                            </EditLink>
                                            <DeleteButton onClick={(e) => {
                                                e.stopPropagation()
                                                destroyItem(genre.id)
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
