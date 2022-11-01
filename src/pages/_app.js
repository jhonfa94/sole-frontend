import 'tailwindcss/tailwind.css'
import { ToastProvider } from 'react-toast-notifications'

const App = ({ Component, pageProps }) => (
    <ToastProvider>
        <Component {...pageProps} />
    </ToastProvider>
)

export default App
