import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import { authorAPI } from '@/hooks/author'
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
    const { createProfile, editProfile } = authorAPI()
    const [errors, setErrors] = useState([])
    const router = useRouter()
    const [full_name, setFullName] = useState('')
    const [career, setCareer] = useState('')
    const [biography, setBiography] = useState('')
    const [website, setWebsite] = useState('')
    const [email, setEmail] = useState('')
    const [id, setAuthorId] = useState('')

    const [profile_id, setProfileId] = useState('')

    useEffect(() => {
        if (router.isReady) {
            axios
                .get(`/api/authors/${router.query.id}`)
                .then(res => {
                    setFullName(res.data.author.full_name)
                    setAuthorId(res.data.author.id)
                    if (res.data.author.profile != null) {
                        setProfileId(res.data.author.profile.id)
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

    const submitForm = event => {
        event.preventDefault()
        if (!profile_id) {
            createProfile({ career, biography, website, email, author: { id, full_name }, setErrors })
        } else {
            editProfile({ career, biography, website, email, author: { id, full_name }, setErrors }, profile_id)
        }
    }
    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Perfil de: { full_name }
                </h2>
            }>
            <Head>
                <title>Laravel - Profile Author</title>
            </Head>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <AuthValidationErrors className="mb-4" errors={errors} />
                            <form onSubmit={submitForm}>
                                <div className="md:w-8/12 lg:w-5/12 lg:ml-20">
                                    <div className="mb-3 xl:w-96">
                                        <Label htmlFor="career">Carrera</Label>
                                        <Input
                                            id="career"
                                            type="text"
                                            value={career}
                                            className="block mt-1 w-full"
                                            onChange={event => setCareer(event.target.value)}
                                            placeholder="Carrera"
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
                                        <Label htmlFor="email">Correo Electrónico</Label>
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
                                        <Label htmlFor="biography">Biografia</Label>
                                        <Textarea
                                            id="biography"
                                            rows="3"
                                            value={biography}
                                            onChange={event => setBiography(event.target.value)}
                                            placeholder="Biografia"
                                        />
                                    </div>
                                    <Button>Guardar Perfil de autor</Button>
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
