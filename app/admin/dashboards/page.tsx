'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';

export default function Dashboard() {
  const router = useRouter();

  const [products, setProducts] = useState<any[]>([]);

  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Combos');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');

  const [editandoId, setEditandoId] = useState<string | null>(null);

  const [editTitle, setEditTitle] = useState('');
  const [editSubtitle, setEditSubtitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const [editPrice, setEditPrice] = useState('');
  const [editImage, setEditImage] = useState('');

  const [mensagem, setMensagem] = useState('');
  const [tipoMensagem, setTipoMensagem] = useState<'sucesso' | 'erro' | ''>('');

  function mostrarMensagem(texto: string, tipo: 'sucesso' | 'erro') {
    setMensagem(texto);
    setTipoMensagem(tipo);

    setTimeout(() => {
      setMensagem('');
      setTipoMensagem('');
    }, 3000);
  }

  async function carregarProdutos() {
    const snapshot = await getDocs(collection(db, 'products'));

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
    if (!title.trim() || !subtitle.trim() || !description.trim() || !price.trim()) {
      mostrarMensagem('Preencha todos os campos obrigatórios.', 'erro');
      return;
    }

    try {
      await addDoc(collection(db, 'products'), {
        title,
        subtitle,
        description,
        category,
        price: Number(price),
        image: image.trim() || 'https://placehold.co/600x400?text=Sem+Imagem',
      });

      setTitle('');
      setSubtitle('');
      setDescription('');
      setCategory('Combos');
      setPrice('');
      setImage('');

      await carregarProdutos();

      mostrarMensagem('Produto cadastrado com sucesso!', 'sucesso');
    } catch (error: any) {
      console.error(error);

      mostrarMensagem(error.code + ' - ' + error.message, 'erro');
    }
  }

  async function excluir(id: string) {
    if (!confirm('Deseja realmente excluir este produto?')) return;

    await deleteDoc(doc(db, 'products', id));

    await carregarProdutos();

    mostrarMensagem('Produto excluído.', 'sucesso');
  }

  function editarProduto(product: any) {
    setEditandoId(product.id);

    setEditTitle(product.title);
    setEditSubtitle(product.subtitle);
    setEditDescription(product.description);
    setEditCategory(product.category);
    setEditPrice(product.price.toString());
    setEditImage(product.image);
  }

  async function salvarEdicao() {
    if (!editandoId) return;

    await updateDoc(doc(db, 'products', editandoId), {
      title: editTitle,
      subtitle: editSubtitle,
      description: editDescription,
      category: editCategory,
      price: Number(editPrice),
      image: editImage,
    });

    setEditandoId(null);

    await carregarProdutos();

    mostrarMensagem('Produto atualizado com sucesso!', 'sucesso');
  }

  return (
    <main className="min-h-screen bg-gray-100 p-4 sm:p-8 lg:p-10">
      <div className="mx-auto max-w-6xl">
        {/* Cabeçalho */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-3xl font-bold sm:text-5xl">Painel Administrativo</h1>

          <button
            onClick={() => router.push('/')}
            className="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 sm:w-auto"
          >
            ← Voltar ao Cardápio
          </button>
        </div>

        {/* Mensagem */}
        {mensagem && (
          <div
            className={`mb-6 rounded-lg p-4 text-center font-semibold text-white ${
              tipoMensagem === 'sucesso' ? 'bg-green-600' : 'bg-red-600'
            }`}
          >
            {mensagem}
          </div>
        )}

        {/* Formulário */}
        <div className="mb-10 rounded-xl bg-white p-4 shadow sm:p-6">
          <h2 className="mb-5 text-2xl font-bold sm:text-3xl">Novo Produto</h2>

          <div className="grid gap-4">
            <input
              placeholder="Nome"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="rounded border p-3"
            />

            <input
              placeholder="Subtítulo"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className="rounded border p-3"
            />

            <textarea
              placeholder="Descrição"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="rounded border p-3"
            />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
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
              onChange={(e) => setPrice(e.target.value)}
              className="rounded border p-3"
            />

            <input
              placeholder="URL da imagem (Opcional)"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="rounded border p-3"
            />

            <button
              onClick={adicionarProduto}
              className="w-full rounded bg-green-600 p-4 font-semibold text-white transition hover:bg-green-700"
            >
              Adicionar Produto
            </button>
          </div>
        </div>

        {editandoId && (
          <div className="mb-8 rounded-xl bg-white p-6 shadow">
            <h2 className="mb-5 text-2xl font-bold">Editar Produto</h2>

            <div className="grid gap-4">
              <input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="rounded border p-3"
                placeholder="Nome"
              />

              <input
                value={editSubtitle}
                onChange={(e) => setEditSubtitle(e.target.value)}
                className="rounded border p-3"
                placeholder="Subtítulo"
              />

              <textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                className="rounded border p-3"
                placeholder="Descrição"
              />

              <select
                value={editCategory}
                onChange={(e) => setEditCategory(e.target.value)}
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
                value={editPrice}
                onChange={(e) => setEditPrice(e.target.value)}
                className="rounded border p-3"
                placeholder="Preço"
              />

              <input
                value={editImage}
                onChange={(e) => setEditImage(e.target.value)}
                className="rounded border p-3"
                placeholder="URL da imagem"
              />

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={salvarEdicao}
                  className="flex-1 rounded bg-green-600 p-3 font-semibold text-white hover:bg-green-700"
                >
                  Salvar Alterações
                </button>

                <button
                  onClick={() => setEditandoId(null)}
                  className="flex-1 rounded bg-gray-500 p-3 font-semibold text-white hover:bg-gray-600"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-5">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex flex-col gap-5 rounded-xl bg-white p-5 shadow md:flex-row md:items-center"
            >
              <img
                src={product.image}
                alt={product.title}
                className="h-52 w-full rounded-lg object-cover md:h-28 md:w-28 md:flex-shrink-0"
              />

              <div className="flex-1 text-center md:text-left">
                <h2 className="text-xl font-bold sm:text-2xl">{product.title}</h2>

                <p className="mt-1 text-gray-700">{product.subtitle}</p>

                <p className="mt-2 text-gray-600">{product.description}</p>

                <p className="mt-3 text-sm text-gray-500">Categoria: {product.category}</p>

                <p className="mt-2 text-xl font-bold text-green-700">
                  R$ {Number(product.price).toFixed(2)}
                </p>
              </div>

              <div className="flex w-full flex-col gap-3 md:w-auto">
                <button
                  onClick={() => editarProduto(product)}
                  className="w-full rounded bg-yellow-500 px-4 py-3 font-semibold text-white transition hover:bg-yellow-600 md:w-44"
                >
                  Editar
                </button>

                <button
                  onClick={() => excluir(product.id)}
                  className="w-full rounded bg-red-600 px-4 py-3 font-semibold text-white transition hover:bg-red-700 md:w-44"
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
