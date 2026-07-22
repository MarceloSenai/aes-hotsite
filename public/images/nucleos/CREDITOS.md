# Créditos das fotos dos núcleos

| Arquivo | Origem | Licença |
|---|---|---|
| `clube-nautico.webp` | Foto oficial da AES — `https://aessenai.org.br/_img/boraceia02.jpg` (pier de pesca, represa de Boracéia) | Material da própria associação |
| `clube-de-campo.webp` | `https://images.unsplash.com/photo-1779261719012-763b1815ac8f` (Unsplash) | Unsplash License — uso comercial livre, sem atribuição obrigatória |
| `colonia-de-ferias.webp` | `https://images.unsplash.com/photo-1745681278433-4f45b29fb3c4` (Unsplash) | Unsplash License — uso comercial livre, sem atribuição obrigatória |

Clube de Campo e Colônia de Férias usam banco de imagem porque não há material
próprio utilizável: as capas do site legado são colagens com moldura e as fotos
da Colônia retornam 404. Substituir assim que a AES fornecer fotos reais —
basta trocar o arquivo mantendo o nome.

## Ao trocar por uma foto real, olhe o centro

Os arquivos são 1170x658 (16:9), mas o card **não** mostra 16:9. No desktop
(≥1280px) a foto aparece numa faixa em pé de ~160x208, à esquerda do texto: o
`object-cover` corta as laterais e sobra pouco mais que a faixa central da
imagem. Abaixo disso a foto vai para o topo do card, numa faixa deitada de
160px de altura, e o corte é no sentido oposto.

Na prática: o assunto precisa estar no centro do quadro. Uma foto bonita com o
assunto na borda esquerda ou direita perde o assunto no desktop.
