import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from '@/lib/axios'
import AuthValidationErrors from '@/components/AuthValidationErrors'
import Button from '@/components/Button'
import Label from '@/components/Label'
import PreviousLink from '@/components/PreviousLink'
import Select from '@/components/Select'
import Star from '@/components/Star'
import NotStar from '@/components/NotStar'
import { ratingAPI } from '@/hooks/rating'
import { useAuth } from '@/hooks/auth'

const Create = () => {

    const { createAuthor, editAuthor } = ratingAPI()
    const { user } = useAuth({ middleware: 'auth' })
    const router = useRouter()
    const [errors, setErrors] = useState([])
    const [author_id, setAuthorId] = useState('')
    const [full_name, setFullName] = useState('')
    const [stars, setStars] = useState(1)
    const [rating_id, setRating] = useState('')
    const [user_id, setUserId] = useState('')

    const starChose = (val) => {
        setStars(val)
    }

    const submitForm = event => {
        event.preventDefault()
        if (!rating_id) {
            createAuthor({ number_star: stars, author: { id: author_id } , user: { id: user_id }, setErrors })
        }
        else {
            editAuthor({ number_star: stars, author: { id: author_id } , user: { id: user_id }, setErrors }, rating_id)
        }
    }

    useEffect(() => {
        if (router.isReady) {
            setUserId(user.id)
            axios
                .get(`/api/authors/${router.query.id}/ratings`)
                .then(res => {
                    setFullName(res.data.author.full_name)
                    setAuthorId(res.data.author.id)
                    if (res.data.rating != '') {
                        setStars(parseInt(res.data.rating[0].number_star))
                        setRating(res.data.rating[0].id)
                    }
                })
                .catch(error => {
                    if (error.response.status !== 409) throw error
                })
        }
    }, [router.isReady])

    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Puntuar Autor: { full_name }
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
                                        <Label htmlFor="description">Estrellas: </Label>
                                        <Select onChange={(val) => starChose(val.target.value)} value={stars}>
                                            <option value="1">Uno</option>
                                            <option value="2">Dos</option>
                                            <option value="3">Tres</option>
                                            <option value="4">Cuatro</option>
                                            <option value="5">Cinco</option>
                                        </Select>
                                    </div>
                                    <div className="mb-3 xl:w-96">
                                        <ul className="flex">
                                            {[...Array( parseInt(stars))].map((star, index1) =>(
                                                <Star key={ index1 } className="w-8">
                                                </Star>
                                            ))}
                                            {[...Array(5 - stars)].map((star, index) =>(
                                                <NotStar key={ index } className="w-8">
                                                </NotStar>
                                            ))}
                                        </ul>
                                    </div>
                                    <Button>Puntuar autor</Button>
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
