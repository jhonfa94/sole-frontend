import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import { useRouter } from 'next/router'
import axios from '@/lib/axios'
import { useEffect, useState } from 'react'
import PreviousLink from '@/components/PreviousLink'

const Show = () => {
    const router = useRouter()
    const [name, setName] = useState('')
    const [country, setCountry] = useState('')
    const [website, setWebsite] = useState('')
    const [email, setEmail] = useState('')
    const [description, setDescription] = useState('')

    useEffect(() => {
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
    }, [router.query.id])

    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Ver Editorial
                </h2>
            }>

            <Head>
                <title>Laravel - Publishers</title>
            </Head>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <h3><strong>{ name }</strong></h3>
                            <p><strong>País: </strong>{ country }</p>
                            <p><strong>Sitio Web: </strong>{ website }</p>
                            <p><strong>Correo Electrónico: </strong>{ email }</p>
                            { description }
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

export default Show
