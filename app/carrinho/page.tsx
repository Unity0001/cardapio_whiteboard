"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CartPage() {
    const router = useRouter();

    const [cart, setCart] = useState<any[]>([]);

    useEffect(() => {
        const savedCart = localStorage.getItem("cart");

        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    }, []);

    function atualizarCarrinho(novoCarrinho: any[]) {
        setCart(novoCarrinho);
        localStorage.setItem("cart", JSON.stringify(novoCarrinho));
    }

    function aumentarQuantidade(id: number) {
        const novoCarrinho = cart.map((item) =>
            item.id === id
                ? { ...item, quantity: item.quantity + 1 }
                : item
        );

        atualizarCarrinho(novoCarrinho);
    }

    function alterarObservacao(id: number, observacao: string) {
        const novoCarrinho = cart.map((item) =>
            item.id === id
                ? {
                    ...item,
                    observacao,
                }
                : item
        );

        atualizarCarrinho(novoCarrinho);
    }

    function diminuirQuantidade(id: number) {
        const novoCarrinho = cart
            .map((item) =>
                item.id === id
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
            .filter((item) => item.quantity > 0);

        atualizarCarrinho(novoCarrinho);
    }

    const subtotal = cart.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    const total = subtotal;

    return (
        <main className="min-h-screen bg-gray-100 py-10">
            <div className="mx-auto max-w-6xl px-6">

                <Link
                    href="/"
                    className="mb-8 inline-block text-lg text-blue-600 hover:underline"
                >
                    ← Continuar comprando
                </Link>

                <h1 className="mb-10 text-5xl font-bold">
                    Meu Pedido
                </h1>

                <div className="grid grid-cols-3 gap-10">

                    <div className="col-span-2 space-y-6">

                        {cart.length === 0 && (
                            <div className="rounded-xl bg-white p-10 text-center shadow">
                                <h2 className="text-3xl font-bold">
                                    Seu carrinho está vazio.
                                </h2>
                            </div>
                        )}

                        {cart.map((item) => (
                            <div
                                key={item.id}
                                className="flex gap-6 rounded-xl bg-white p-5 shadow"
                            >
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="h-36 w-36 rounded-lg object-cover"
                                />

                                <div className="flex flex-1 flex-col">

                                    <h2 className="text-2xl font-bold">
                                        {item.title}
                                    </h2>

                                    <p className="mt-2 text-gray-500">
                                        {item.description}
                                    </p>

                                    <textarea
                                        placeholder="Observações..."
                                        value={item.observacao || ""}
                                        onChange={(e) =>
                                            alterarObservacao(item.id, e.target.value)
                                        }
                                        className="mt-4 rounded-lg border p-3"
                                    />

                                    <div className="mt-6 flex items-center justify-between">

                                        <div className="flex items-center gap-4">

                                            <button
                                                onClick={() => diminuirQuantidade(item.id)}
                                                className="h-10 w-10 rounded-lg bg-red-500 text-xl text-white hover:bg-red-600"
                                            >
                                                -
                                            </button>

                                            <span className="text-xl font-bold">
                                                {item.quantity}
                                            </span>

                                            <button
                                                onClick={() => aumentarQuantidade(item.id)}
                                                className="h-10 w-10 rounded-lg bg-green-600 text-xl text-white hover:bg-green-700"
                                            >
                                                +
                                            </button>

                                        </div>

                                        <span className="text-2xl font-bold">
                                            R$ {(item.price * item.quantity).toFixed(2)}
                                        </span>

                                    </div>

                                </div>

                            </div>
                        ))}

                    </div>

                    {/* Resumo */}
                    <div>

                        <div className="sticky top-8 rounded-xl bg-white p-6 shadow">

                            <h2 className="mb-6 text-3xl font-bold">
                                Resumo
                            </h2>

                            <div className="space-y-4">

                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span>R$ {subtotal.toFixed(2)}</span>
                                </div>

                                <div className="flex justify-between">
                                    <span>Entrega</span>
                                    <span>A calcular</span>
                                </div>

                                <hr />

                                <div className="flex justify-between text-2xl font-bold">
                                    <span>Total</span>
                                    <span>R$ {total.toFixed(2)}</span>
                                </div>

                            </div>

                            <button
                                disabled={cart.length === 0}
                                onClick={() => router.push("/entrega")}
                                className="mt-8 w-full rounded-lg bg-green-600 py-4 text-xl font-semibold text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-400"
                            >
                                Continuar
                            </button>

                        </div>

                    </div>

                </div>

            </div>
        </main>
    );
}