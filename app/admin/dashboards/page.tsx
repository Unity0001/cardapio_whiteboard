"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc,
    updateDoc,
} from "firebase/firestore";
import { db } from "../../lib/firebase";

export default function Dashboard() {
    const router = useRouter();

    const [products, setProducts] = useState<any[]>([]);

    const [title, setTitle] = useState("");
    const [subtitle, setSubtitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("Combos");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");

    const [mensagem, setMensagem] = useState("");
    const [tipoMensagem, setTipoMensagem] = useState<
        "sucesso" | "erro" | ""
    >("");

    function mostrarMensagem(
        texto: string,
        tipo: "sucesso" | "erro"
    ) {
        setMensagem(texto);
        setTipoMensagem(tipo);

        setTimeout(() => {
            setMensagem("");
            setTipoMensagem("");
        }, 3000);
    }

    async function carregarProdutos() {
        const snapshot = await getDocs(collection(db, "products"));

        const lista: any[] = [];

        snapshot.forEach((docItem) => {
            lista.push({
                id: docItem.id,
                ...docItem.data(),
            });
        });

        setProducts(lista);
    }

    useEffect(() => {
        carregarProdutos();
    }, []);

    async function adicionarProduto() {
        if (
            !title.trim() ||
            !subtitle.trim() ||
            !description.trim() ||
            !price.trim()
        ) {
            mostrarMensagem(
                "Preencha todos os campos obrigatórios.",
                "erro"
            );
            return;
        }

        try {
            await addDoc(collection(db, "products"), {
                title,
                subtitle,
                description,
                category,
                price: Number(price),
                image:
                    image.trim() ||
                    "https://placehold.co/600x400?text=Sem+Imagem",
            });

            setTitle("");
            setSubtitle("");
            setDescription("");
            setCategory("Combos");
            setPrice("");
            setImage("");

            await carregarProdutos();

            mostrarMensagem(
                "Produto cadastrado com sucesso!",
                "sucesso"
            );
        } catch (error: any) {
            console.error(error);

            mostrarMensagem(
                error.code + " - " + error.message,
                "erro"
            );
        }
    }

    async function excluir(id: string) {
        if (!confirm("Deseja realmente excluir este produto?")) return;

        await deleteDoc(doc(db, "products", id));

        await carregarProdutos();

        mostrarMensagem("Produto excluído.", "sucesso");
    }

    async function alterarPreco(id: string, preco: number) {
        const valor = prompt("Novo preço", preco.toString());

        if (!valor) return;

        await updateDoc(doc(db, "products", id), {
            price: Number(valor),
        });

        await carregarProdutos();

        mostrarMensagem("Preço atualizado.", "sucesso");
    }

    return (
        <main className="min-h-screen bg-gray-100 p-10">
            <div className="mx-auto max-w-6xl">

                <div className="mb-8 flex items-center justify-between">
                    <h1 className="text-5xl font-bold">
                        Painel Administrativo
                    </h1>

                    <button
                        onClick={() => router.push("/")}
                        className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
                    >
                        ← Voltar ao Cardápio
                    </button>
                </div>

                {mensagem && (
                    <div
                        className={`mb-6 rounded-lg p-4 text-center font-semibold text-white ${tipoMensagem === "sucesso"
                                ? "bg-green-600"
                                : "bg-red-600"
                            }`}
                    >
                        {mensagem}
                    </div>
                )}

                <div className="mb-10 rounded-xl bg-white p-6 shadow">

                    <h2 className="mb-5 text-3xl font-bold">
                        Novo Produto
                    </h2>

                    <div className="grid gap-4">

                        <input
                            placeholder="Nome"
                            value={title}
                            onChange={(e) =>
                                setTitle(e.target.value)
                            }
                            className="rounded border p-3"
                        />

                        <input
                            placeholder="Subtítulo"
                            value={subtitle}
                            onChange={(e) =>
                                setSubtitle(e.target.value)
                            }
                            className="rounded border p-3"
                        />

                        <textarea
                            placeholder="Descrição"
                            value={description}
                            onChange={(e) =>
                                setDescription(e.target.value)
                            }
                            className="rounded border p-3"
                        />

                        <select
                            value={category}
                            onChange={(e) =>
                                setCategory(e.target.value)
                            }
                            className="rounded border p-3"
                        >
                            <option>Combos</option>
                            <option>Pizzas</option>
                            <option>Bebidas</option>
                            <option>Sucos</option>
                            <option>Energéticos</option>
                            <option>Bebidas Alcoólicas</option>
                        </select>

                        <input
                            type="number"
                            placeholder="Preço"
                            value={price}
                            onChange={(e) =>
                                setPrice(e.target.value)
                            }
                            className="rounded border p-3"
                        />

                        <input
                            placeholder="URL da imagem (Opcional)"
                            value={image}
                            onChange={(e) =>
                                setImage(e.target.value)
                            }
                            className="rounded border p-3"
                        />

                        <button
                            onClick={adicionarProduto}
                            className="rounded bg-green-600 p-4 text-white transition hover:bg-green-700"
                        >
                            Adicionar Produto
                        </button>

                    </div>

                </div>

                <div className="space-y-5">

                    {products.map((product) => (

                        <div
                            key={product.id}
                            className="flex items-center gap-6 rounded-xl bg-white p-5 shadow"
                        >

                            <img
                                src={product.image}
                                alt={product.title}
                                className="h-24 w-24 rounded object-cover"
                            />

                            <div className="flex-1">

                                <h2 className="text-2xl font-bold">
                                    {product.title}
                                </h2>

                                <p>{product.subtitle}</p>

                                <p>{product.description}</p>

                                <p className="mt-2 text-gray-500">
                                    {product.category}
                                </p>

                                <p className="mt-2 font-bold text-green-700">
                                    R$ {Number(product.price).toFixed(2)}
                                </p>

                            </div>

                            <div className="flex gap-3">

                                <button
                                    onClick={() =>
                                        alterarPreco(
                                            product.id,
                                            product.price
                                        )
                                    }
                                    className="rounded bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600"
                                >
                                    Alterar Preço
                                </button>

                                <button
                                    onClick={() =>
                                        excluir(product.id)
                                    }
                                    className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                                >
                                    Excluir
                                </button>

                            </div>

                        </div>

                    ))}

                </div>

            </div>
        </main>
    );
}