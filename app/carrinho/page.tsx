'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const router = useRouter();

  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');

    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  function atualizarCarrinho(novoCarrinho: any[]) {
    setCart(novoCarrinho);
    localStorage.setItem('cart', JSON.stringify(novoCarrinho));
  }

  function aumentarQuantidade(id: number) {
    const novoCarrinho = cart.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );

    atualizarCarrinho(novoCarrinho);
  }

  function diminuirQuantidade(id: number) {
    const novoCarrinho = cart
      .map((item) => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item))
      .filter((item) => item.quantity > 0);

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

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const total = subtotal;

  return (
    <main className="min-h-screen bg-gray-100 py-8 sm:py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Link
          href="/"
          className="mb-6 inline-block text-base text-blue-600 hover:underline sm:text-lg"
        >
          ← Continuar comprando
        </Link>

        <h1 className="mb-8 text-3xl font-bold sm:mb-10 sm:text-5xl">Meu Pedido</h1>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            {cart.length === 0 && (
              <div className="rounded-xl bg-white p-8 text-center shadow">
                <h2 className="text-2xl font-bold sm:text-3xl">Seu carrinho está vazio.</h2>
              </div>
            )}

            {cart.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-4 rounded-xl bg-white p-4 shadow sm:flex-row sm:gap-6 sm:p-5"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-40 w-full rounded-lg object-cover sm:h-36 sm:w-36"
                />

                <div className="flex flex-1 flex-col">
                  <h2 className="text-xl font-bold sm:text-2xl">{item.title}</h2>

                  <p className="mt-2 text-sm text-gray-500 sm:text-base">{item.description}</p>

                  <textarea
                    placeholder="Observações..."
                    value={item.observacao || ''}
                    onChange={(e) => alterarObservacao(item.id, e.target.value)}
                    className="mt-4 min-h-24 rounded-lg border p-3 text-sm sm:text-base"
                  />

                  <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center justify-center gap-4 sm:justify-start">
                      <button
                        onClick={() => diminuirQuantidade(item.id)}
                        className="h-10 w-10 rounded-lg bg-red-500 text-xl text-white hover:bg-red-600"
                      >
                        -
                      </button>
                      <span className="text-xl font-bold">{item.quantity}</span>
                      <button
                        onClick={() => aumentarQuantidade(item.id)}
                        className="h-10 w-10 rounded-lg bg-green-600 text-xl text-white hover:bg-green-700"
                      >
                        +
                      </button>
                    </div>
                    <span className="text-center text-xl font-bold sm:text-right sm:text-2xl">
                      R$ {(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div>
            <div className="rounded-xl bg-white p-5 shadow lg:sticky lg:top-8">
              <h2 className="mb-6 text-2xl font-bold sm:text-3xl">Resumo</h2>

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

                <div className="flex justify-between text-xl font-bold sm:text-2xl">
                  <span>Total</span>

                  <span>R$ {total.toFixed(2)}</span>
                </div>
              </div>

              <button
                disabled={cart.length === 0}
                onClick={() => router.push('/entrega')}
                className="mt-8 w-full rounded-lg bg-green-600 py-3 text-lg font-semibold text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-400 sm:py-4 sm:text-xl"
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
