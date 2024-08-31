import { Link } from "react-router-dom"

const ForbiddenPage = () => {
  return (
    <section className="relative h-screen w-full flex items-center justify-center">
        <div className="bg-potters-clay-500 w-full  max-w-2xl min-h-72 rounded-md  flex flex-col items-center justify-center space-y-4   ">
            <h1  className="text-3xl font-bold text-potters-clay-100">Forbiden Page</h1>
            <p className="text-lg font-semibold text-potters-clay-100 ">Click here to go back in <Link to='/' className="underline text-potters-clay-200 hover:scale-125 transition-all">Home</Link></p>
        </div>
    </section>
  )
}

export default ForbiddenPage