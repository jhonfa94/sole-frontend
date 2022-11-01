import ApplicationLogo from '@/components/ApplicationLogo'
import AuthCard from '@/components/AuthCard'
import Button from '@/components/Button'
import GuestLayout from '@/components/Layouts/GuestLayout'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import { useState } from 'react'

const VerifyEmail = () => {
    const { logout, resendEmailVerification } = useAuth({
        middleware: 'auth',
    })

    const [status, setStatus] = useState(null)

    return (
        <GuestLayout>
            <AuthCard
                logo={
                    <Link href="/">
                        <a>
                            <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
                        </a>
                    </Link>
                }>

                <div className="mb-4 text-sm text-gray-600">
                    Gracias por registrarte! Antes de comenzar,
                    ¿podría verificar su dirección de correo electrónico
                    haciendo clic en el enlace que le acabamos de enviar?
                    Si no recibiste el correo electrónico, con gusto te enviaremos otro.
                </div>

                {status === 'verification-link-sent' && (
                    <div className="mb-4 font-medium text-sm text-green-600">
                        Se ha enviado un nuevo enlace de verificación a la dirección
                        de correo electrónico que proporcionó durante el registro.
                    </div>
                )}

                <div className="mt-4 flex items-center justify-between">
                    <Button
                        onClick={() => resendEmailVerification({ setStatus })}>
                        Reenviar correo electrónico de verificación
                    </Button>

                    <button
                        type="button"
                        className="underline text-sm text-gray-600 hover:text-gray-900"
                        onClick={logout}>
                        Cerrar sesión
                    </button>
                </div>
            </AuthCard>
        </GuestLayout>
    )
}

export default VerifyEmail
