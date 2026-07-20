"use client";

import { useEffect, useState } from "react";
import CategoryFilter from "./CategoryFilter";
import ProductCard from "./ProductCard";
import FloatingCart from "./FloatingCart";

const products = [
    {
        id: 1,
        category: "Combos",
        title: "Pizza + Refrigerante",
        subtitle: "Coca-Cola 2L",
        description: "Pizza grande + refrigerante gelado.",
        price: 55,
        image: "https://picsum.photos/300/300?1",
    },
    {
        id: 2,
        category: "Combos",
        title: "Combo Família",
        subtitle: "2 Pizzas Grandes",
        description: "Ideal para compartilhar com toda a família.",
        price: 89.9,
        image: "https://picsum.photos/300/300?2",
    },
    {
        id: 3,
        category: "Pizzas",
        title: "Pizza Calabresa",
        subtitle: "Grande",
        description: "Calabresa, cebola e queijo.",
        price: 45,
        image: "https://picsum.photos/300/300?3",
    },
    {
        id: 4,
        category: "Pizzas",
        title: "Pizza Portuguesa",
        subtitle: "Grande",
        description: "Presunto, ovos, cebola e ervilha.",
        price: 49,
        image: "https://picsum.photos/300/300?4",
    },
    {
        id: 5,
        category: "Pizzas",
        title: "Pizza Frango Catupiry",
        subtitle: "Grande",
        description: "Frango desfiado e catupiry.",
        price: 52,
        image: "https://picsum.photos/300/300?5",
    },
    {
        id: 6,
        category: "Bebidas",
        title: "Coca-Cola",
        subtitle: "2 Litros",
        description: "Refrigerante tradicional.",
        price: 12,
        image: "https://picsum.photos/300/300?6",
    },
    {
        id: 7,
        category: "Bebidas",
        title: "Guaraná Antarctica",
        subtitle: "2 Litros",
        description: "Refrigerante gelado.",
        price: 11,
        image: "https://picsum.photos/300/300?7",
    },
    {
        id: 8,
        category: "Sucos",
        title: "Suco de Laranja",
        subtitle: "500ml",
        description: "Suco natural.",
        price: 8.5,
        image: "https://picsum.photos/300/300?8",
    },
    {
        id: 9,
        category: "Sucos",
        title: "Suco de Uva",
        subtitle: "500ml",
        description: "Suco integral.",
        price: 9,
        image: "https://picsum.photos/300/300?9",
    },
    {
        id: 10,
        category: "Energéticos",
        title: "Red Bull",
        subtitle: "250ml",
        description: "Energético tradicional.",
        price: 14,
        image: "https://picsum.photos/300/300?10",
    },
    {
        id: 11,
        category: "Energéticos",
        title: "Monster",
        subtitle: "473ml",
        description: "Energético Monster.",
        price: 16,
        image: "https://picsum.photos/300/300?11",
    },
    {
        id: 12,
        category: "Bebidas Alcoólicas",
        title: "Heineken",
        subtitle: "Long Neck",
        description: "Cerveja premium.",
        price: 9,
        image: "https://picsum.photos/300/300?12",
    },
];

export default function ProductList() {
    const [selectedCategory, setSelectedCategory] = useState("Todos os produtos");
    const [cart, setCart] = useState<any[]>([]);

    useEffect(() => {
        const savedCart = localStorage.getItem("cart");

        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    }, []);

    const categories = [
        "Todos os produtos",
        "Combos",
        "Pizzas",
        "Bebidas",
        "Energéticos",
        "Sucos",
        "Bebidas Alcoólicas",
    ];

    const filteredProducts =
        selectedCategory === "Todos os produtos"
            ? [...products].sort((a, b) => {
                if (a.category === "Combos" && b.category !== "Combos") return -1;
                if (a.category !== "Combos" && b.category === "Combos") return 1;
                return 0;
            })
            : products.filter(
                (product) => product.category === selectedCategory
            );

    function addToCart(product: any) {
        const existing = cart.find((item) => item.id === product.id);

        let updatedCart;

        if (existing) {
            updatedCart = cart.map((item) =>
                item.id === product.id
                    ? {
                        ...item,
                        quantity: item.quantity + 1,
                    }
                    : item
            );
        } else {
            updatedCart = [
                ...cart,
                {
                    id: product.id,
                    title: product.title,
                    subtitle: product.subtitle,
                    description: product.description,
                    details: product.details ?? [],
                    price: product.price,
                    image: product.image,
                    quantity: 1,
                },
            ];
        }

        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    }

    const totalItems = cart.reduce(
        (acc, item) => acc + item.quantity,
        0
    );

    return (
        <div>
            <CategoryFilter
                categories={categories}
                selected={selectedCategory}
                onSelect={setSelectedCategory}
            />

            <div className="mx-auto max-w-7xl p-6">

                <input
                    type="text"
                    placeholder="Pesquisar"
                    className="mb-10 w-full border-b p-3 outline-none"
                />

                <h2 className="mb-8 border-b-2 border-black text-center text-5xl font-bold">
                    {selectedCategory}
                </h2>

                <div className="space-y-6">

                    {filteredProducts.map((product) => (

                        <ProductCard
                            key={product.id}
                            image={product.image}
                            title={product.title}
                            subtitle={product.subtitle}
                            description={product.description}
                            price={product.price}
                            onAddToCart={() => addToCart(product)}
                        />

                    ))}

                </div>

            </div>

            <FloatingCart totalItems={totalItems} />

        </div>
    );
}