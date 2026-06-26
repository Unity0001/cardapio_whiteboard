interface ProductCardProps {
    image: string;
    title: string;
    subtitle: string;
    description: string;
    price: number;
}

export default function ProductCard({
    image,
    title,
    subtitle,
    description,
    price,
}: ProductCardProps) {
    return (
        <div className="flex gap-6 rounded-lg border-l-4 border-black bg-white p-4 shadow">
            <img
                src={image}
                alt={title}
                className="h-48 w-48 rounded-md object-cover"
            />

            <div className="flex flex-col">
                <h3 className="text-3xl font-bold">{title}</h3>

                <p className="text-lg text-gray-600">{subtitle}</p>

                <p className="mt-2 text-gray-500">{description}</p>

                <span className="mt-auto text-2xl font-bold">
                    A partir de R$ {price.toFixed(2)}
                </span>
            </div>
        </div>
    );
}