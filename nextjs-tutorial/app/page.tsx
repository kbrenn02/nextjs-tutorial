import Link from 'next/link'
import ProductCard from './components/ProductCard'

export default function Home() {
    return (
        <main>
            <h1 className="p-4">Hello World</h1>
            <Link href="/users" className="p-4">Users</Link>
            <ProductCard />
        </main>
    )
}
