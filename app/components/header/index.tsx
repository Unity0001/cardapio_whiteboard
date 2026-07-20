import ProductList from "../products/ProductList";

export default function HeaderComp() {
    return (
        <div className="w-full">
            <div className="relative h-48 bg-gray-300">
                <div className="absolute top-4 right-4">
                    Entrar
                </div>
            </div>

            <div className="bg-gray-100 pb-8">
                <div className="mx-auto max-w-6xl">
                    <div className="relative">
                        <div className="absolute -top-12 left-8 h-24 w-24 rounded-lg bg-gray-500" />
                    </div>

                    <div className="pt-8 text-center">
                        <h1 className="text-4xl">Nome  do Restaurante</h1>

                        <p className="text-blue-500">
                            Rua Exemplo, 123 - Cidade/UF
                        </p>

                        <div className="mt-6 flex justify-center gap-32">
                            <div>
                                <p>Entrega</p>
                                <p>50min - 1h</p>
                            </div>

                            <div>
                                <p>Retirada</p>
                                <p>40min</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ProductList />
        </div>
    );
}