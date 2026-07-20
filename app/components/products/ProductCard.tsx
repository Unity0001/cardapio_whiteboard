interface ProductCardProps {
    image: string;
    title: string;
    subtitle: string;
    description: string;
    price: number;
    onAddToCart: () => void;
}

export default function ProductCard({
    image,
    title,
    subtitle,
    description,
    price,
    onAddToCart,
}: ProductCardProps) {
    return (
        <div className="flex gap-6 rounded-lg border-l-4 border-black bg-white p-4 shadow hover:shadow-lg transition">

            <img
                src={image}
                alt={title}
                className="h-48 w-48 rounded-md object-cover"
            />

            <div className="flex flex-1 flex-col">

                <h3 className="text-3xl font-bold">
                    {title}
                </h3>

                <p className="text-lg text-gray-600">
                    {subtitle}
                </p>

                <p className="mt-2 text-gray-500">
                    {description}
                </p>

                <div className="mt-auto flex items-center justify-between">

                    <span className="text-2xl font-bold text-green-700">
                        R$ {price.toFixed(2)}
                    </span>

                    <button
                        onClick={onAddToCart}
                        className="rounded-lg bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700 active:scale-95"
                    >
                        🛒 Adicionar ao Carrinho
                    </button>

                </div>

            </div>

        </div>
    );
}