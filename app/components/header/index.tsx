import ProductList from "../products/ProductList";

export default function HeaderComp() {
    return (
        <div className="w-full">

            {/* Banner */}
            <div className="relative h-40 sm:h-56 md:h-64 bg-gray-300">
                <img
                    src="/background_logo.jpeg"
                    alt="Header"
                    className="h-full w-full object-cover"
                />

                <a
                    href="/admin"
                    className="absolute right-3 top-3 sm:right-5 sm:top-5"
                >
                    <img
                        src="/user_logo.png"
                        alt="Administrador"
                        className="h-10 w-10 rounded-lg object-cover shadow sm:h-12 sm:w-12"
                    />
                </a>
            </div>

            {/* Informações */}
            <div className="bg-gray-100 pb-8">

                <div className="mx-auto max-w-6xl px-4">

                    {/* Logo */}
                    <div className="relative">

                        <div className="absolute left-1/2 -translate-x-1/2 -top-12 sm:-top-16 h-24 w-24 sm:h-32 sm:w-32 overflow-hidden rounded-xl border-4 border-white bg-white shadow-lg">

                            <img
                                src="/logo.jpeg"
                                alt="Logo"
                                className="h-full w-full object-cover"
                            />

                        </div>

                    </div>

                    <div className="pt-16 sm:pt-20 text-center">
                        
                    </div>

                    {/* Dados */}
                    <div className="mt-5 text-center">

                        <h1 className="text-2xl font-bold sm:text-4xl">
                            Nome do Restaurante
                        </h1>

                        <p className="mt-2 text-sm text-blue-500 sm:text-base">
                            Rua Exemplo, 123 - Cidade/UF
                        </p>

                        {/* Tempo */}
                        <div className="mt-8 flex flex-col items-center gap-6 sm:flex-row sm:justify-center sm:gap-24">

                            <div className="text-center">

                                <p className="font-semibold">
                                    🚚 Entrega
                                </p>

                                <p className="text-gray-600">
                                    50 min - 1h
                                </p>

                            </div>

                            <div className="text-center">

                                <p className="font-semibold">
                                    🏪 Retirada
                                </p>

                                <p className="text-gray-600">
                                    40 min
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

            <ProductList />

        </div>
    );
}