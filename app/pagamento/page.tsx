"use client";

import { useEffect, useState } from "react";

export default function PagamentoPage() {
    const [pagamento, setPagamento] = useState("");
    const [troco, setTroco] = useState("");

    const [cart, setCart] = useState<any[]>([]);
    const [entrega, setEntrega] = useState<any>(null);

    useEffect(() => {
        const savedCart = localStorage.getItem("cart");
        const savedEntrega = localStorage.getItem("entrega");

        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }

        if (savedEntrega) {
            setEntrega(JSON.parse(savedEntrega));
        }
    }, []);

    const subtotal = cart.reduce(
        (acc: number, item: any) => acc + item.price * item.quantity,
        0
    );

    const taxaEntrega = entrega?.tipo === "Entrega" ? 8 : 0;

    const total = subtotal + taxaEntrega;

    function enviarWhatsapp(tipoPagamento: string) {
        const numero = "5519994483147";

        const listaProdutos = cart
            .map(
                (item: any) => `
*${item.quantity}x* _${item.title}_
-${item.subtitle || ""}
-${item.description || ""}

${item.observacao?.trim()
                        ? `*Observações:* ${item.observacao}`
                        : ""}

*Subtotal do item: R$ ${(item.price * item.quantity).toFixed(2)}*

-  -  -  -  -  -  -  -  -  -  -
`
            )
            .join("\n");

        let dadosEntrega = "";

        if (entrega?.tipo === "Entrega") {
            dadosEntrega = `
▶ *DADOS PARA ENTREGA*

*Nome:* ${entrega.nome}
*Rua:* ${entrega.rua}
*Número:* ${entrega.numero}
*Bairro:* ${entrega.bairro}
*Complemento:* ${entrega.complemento || "-"}
*Referência:* ${entrega.referencia || "-"}

*Taxa de Entrega:* R$ ${taxaEntrega.toFixed(2)}
`;
        } else {
            dadosEntrega = `
▶ *RETIRADA NO LOCAL*

*Nome:* ${entrega?.nome}

Cliente irá retirar o pedido.

*Taxa de Entrega:* R$ 0,00
`;
        }

        const mensagem = `✅ *NOVO PEDIDO*
-----------------------------
▶ *RESUMO DO PEDIDO*

${listaProdutos}

*SUBTOTAL:* R$ ${subtotal.toFixed(2)}

------------------------------------------

${dadosEntrega}

------------------------------------------

▶ *TOTAL* = *R$ ${total.toFixed(2)}*

------------------------------------------

▶ *PAGAMENTO*

${tipoPagamento}

${tipoPagamento === "Dinheiro"
                ? `*Troco para:* R$ ${troco}`
                : ""}
`;

        window.open(
            `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`,
            "_blank"
        );
    }

    function enviarDinheiro() {
        if (!troco) {
            alert("Informe o valor para troco.");
            return;
        }

        const valorTroco = Number(troco);

        if (isNaN(valorTroco)) {
            alert("Informe um valor válido.");
            return;
        }

        if (valorTroco <= total) {
            alert(
                `O valor para troco deve ser maior que o total do pedido (R$ ${total.toFixed(
                    2
                )}).`
            );
            return;
        }

        enviarWhatsapp("Dinheiro");
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-xl rounded-lg bg-white p-8 shadow">

                <h1 className="mb-8 text-center text-4xl font-bold">
                    Forma de Pagamento
                </h1>

                <div className="space-y-4">

                    <button
                        onClick={() => {
                            setPagamento("Crédito");
                            enviarWhatsapp("Crédito");
                        }}
                        className="w-full rounded bg-blue-600 p-4 text-white hover:bg-blue-700"
                    >
                        💳 Cartão de Crédito
                    </button>

                    <button
                        onClick={() => {
                            setPagamento("Débito");
                            enviarWhatsapp("Débito");
                        }}
                        className="w-full rounded bg-indigo-600 p-4 text-white hover:bg-indigo-700"
                    >
                        💳 Cartão de Débito
                    </button>

                    <button
                        onClick={() => {
                            setPagamento("Pix");
                            enviarWhatsapp("Pix");
                        }}
                        className="w-full rounded bg-green-600 p-4 text-white hover:bg-green-700"
                    >
                        PIX
                    </button>

                    <button
                        onClick={() => setPagamento("Dinheiro")}
                        className="w-full rounded bg-yellow-500 p-4 text-white hover:bg-yellow-600"
                    >
                        💵 Dinheiro
                    </button>

                </div>

                {pagamento === "Dinheiro" && (
                    <div className="mt-8 space-y-4">

                        <input
                            type="number"
                            placeholder={`Troco para (mínimo R$ ${(total + 0.01).toFixed(2)})`}
                            value={troco}
                            min={total + 0.01}
                            step="0.01"
                            onChange={(e) => setTroco(e.target.value)}
                            className="w-full rounded border p-3"
                        />

                        <button
                            onClick={enviarDinheiro}
                            className="w-full rounded bg-green-600 py-4 text-white hover:bg-green-700"
                        >
                            Enviar Pedido
                        </button>

                    </div>
                )}

            </div>
        </main>
    );
}