import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import { useRouter } from 'next/router'
import axios from '@/lib/axios'
import { useEffect, useState } from 'react'
import PreviousLink from '@/components/PreviousLink'

const Show = () => {
    const router = useRouter()
    const [full_name, setFullName] = useState('')
    const [birth_date, setBirthDate] = useState('')
    const [country, setCountry] = useState('')

    const [career, setCareer] = useState('')
    const [biography, setBiography] = useState('')
    const [website, setWebsite] = useState('')
    const [email, setEmail] = useState('')
    const [image, setImage] = useState('')

    useEffect(() => {
        if (router.isReady) {
            axios
                .get(`/api/authors/${router.query.id}`)
                .then(res => {
                    setFullName(res.data.author.full_name)
                    setBirthDate(FormatDate(res.data.author.birth_date))
                    setCountry(res.data.author.country)
                    if (res.data.image != null) {
                        setImage('http://127.0.0.1:8000' + res.data.image)
                    }
                    if (res.data.author.profile != null) {
                        setCareer(res.data.author.profile.career)
                        setBiography(res.data.author.profile.biography)
                        setWebsite(res.data.author.profile.website)
                        setEmail(res.data.author.profile.email)
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
                    Ver Autor
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
                                    <h3><strong>{ full_name }</strong></h3>
                                    <p><strong>Fecha Nacimiento:</strong> { birth_date }</p>
                                    <p><strong>País:</strong> { country }</p>
                                    <h3><strong>Perfil de autor</strong></h3>
                                    { career !== '' ? (
                                        <div>
                                            <p><strong>Carrera:</strong> { career }</p>
                                            <p><strong>Biografia:</strong> { biography }</p>
                                            <p><strong>Página Web:</strong> { website }</p>
                                            <p><strong>Correo Electrónico:</strong> { email }</p>
                                        </div>
                                    ) : (
                                        <p> El autor no tiene aún un perfil registrado</p>
                                    ) }
                                </div>
                                <img src={ image } className="rounded-lg w-64"/>
                            </div>
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

export default Show
