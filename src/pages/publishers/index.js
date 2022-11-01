import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import axios from '@/lib/axios'
import Router from 'next/router'
import Button from '@/components/Button'
import ViewLink from '@/components/ViewLink'
import EditLink from '@/components/EditLink'
import { publisherAPI } from '@/hooks/publisher'
import DeleteButton from '@/components/DeleteButton'

const Index = () => {
    const [publishers, setPublishers] = useState([])
    const { destroy } = publisherAPI()

    function destroyItem(id) {
        if (confirm('¿Seguro que desea eliminar el elemento seleccionado?')) {
            destroy(id)
            setPublishers([...publishers.filter((publisher) => publisher.id !== id)])
        }
    }

    useEffect(() => {
        axios
            .get('/api/publishers')
            .then(res => {
                setPublishers(res.data)
            })
            .catch(error => {
                if (error.response.status !== 409) throw error
            })
    }, [])

    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Editoriales
                </h2>
            }>

            <Head>
                <title>Laravel - Publishers</title>
            </Head>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="flex space-x-2 justify-start">
                                <Button
                                    type="button"
                                    onClick={() => Router.push('/publishers/create', '/publishers/create')}>
                                    Nueva Editorial
                                </Button>
                            </div>
                            <table className="min-w-full">
                                <thead className="border-b bg-gray-50">
                                <tr>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">
                                        Editorial
                                    </th>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">
                                        País
                                    </th>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">
                                        Sitio Web
                                    </th>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">
                                        Correo Electrónico
                                    </th>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">
                                        Acción
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                { publishers?.map((publisher) => (
                                    <tr className="bg-white border-b" key={publisher.id}>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4">
                                            { publisher.name }
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4">
                                            { publisher.country }
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4">
                                            { publisher.website }
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4">
                                            { publisher.email }
                                        </td>
                                        <td className="flex space-x-2 text-sm text-gray-900 font-light px-6 py-4">
                                            <ViewLink href={{ pathname: `/publishers/show/[id]`, query: { id: publisher.id }
                                            }} as={`/publishers/show/${publisher.id}`}>
                                            </ViewLink>
                                            <EditLink href={{ pathname: `/publishers/edit/[id]`, query: { id: publisher.id }
                                            }} as={`/publishers/edit/${publisher.id}`}>
                                            </EditLink>
                                            <DeleteButton onClick={(e) => {
                                                e.stopPropagation()
                                                destroyItem(publisher.id)
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
