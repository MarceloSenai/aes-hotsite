# Créditos das fotos dos núcleos

| Arquivo | Origem | Licença |
|---|---|---|
| `clube-nautico.webp` | Foto oficial da AES — `https://aessenai.org.br/_img/boraceia02.jpg` (pier de pesca, represa de Boracéia) | Material da própria associação |
| `clube-de-campo.webp` | `https://images.unsplash.com/photo-1779261719012-763b1815ac8f` (Unsplash) | Unsplash License — uso comercial livre, sem atribuição obrigatória |
| `colonia-de-ferias.webp` | `https://images.unsplash.com/photo-1745681278433-4f45b29fb3c4` (Unsplash) | Unsplash License — uso comercial livre, sem atribuição obrigatória |

Clube de Campo e Colônia de Férias usam banco de imagem porque não há material
próprio utilizável: as capas do site legado são colagens com moldura e as fotos
da Colônia retornam 404. Substituir assim que a AES fornecer fotos reais.

## São dois arquivos por núcleo, não um

| Arquivo | Formato | Situação |
|---|---|---|
| `portrait/<slug>.webp` | 526x658 (4:5) | **O que aparece no site**: seção de núcleos da home (`NucleosDestaque` → `destaques/NucleoCard`) |
| `<slug>.webp` | 1170x658 (16:9) | Original, fonte do recorte. Referenciado pelo array local de `/nucleo-de-lazer`, mas aquele card não renderiza foto — o campo está lá sem uso |

O retrato é **recortado à mão** do 16:9, com offset horizontal escolhido por
foto para não perder o assunto:

| Arquivo | Offset X | O que o recorte preserva |
|---|---|---|
| `clube-de-campo.webp` | 60 | O salgueiro (tronco + copa) que fica à esquerda |
| `clube-nautico.webp` | 120 | A diagonal do píer entrando pelo canto inferior |
| `colonia-de-ferias.webp` | 170 | O coqueiral à esquerda e a curva da arrebentação |

**Ao trocar uma foto real, regere o retrato** — trocar só o 16:9 não muda nada
no site, porque quem é renderizado é o arquivo em `portrait/`. O recorte é
`extract` de 526x658 a partir do offset, sem redimensionar (`sharp`, webp
quality 85).

Por que pré-recortado e não `object-cover` no CSS: com a fonte em 16:9, cobrir
uma caixa 4:5 exige uma imagem ~2,2x mais larga que a caixa. O `sizes` do
`next/image` pede a largura da *caixa*, o browser baixa uma versão estreita
demais, e a foto sobe ~1,5x — borrada, apesar de haver pixels de sobra.

**Os 526px de largura são um teto.** É o máximo que dá pra extrair em 4:5 de uma
fonte 1170x658, e é por isso que a seção de núcleos usa `max-w-[1400px]` em vez
do `max-w-[1920px]` das outras: a 1920 os cards passariam de 600px e a foto
voltaria a subir de escala. Se um dia chegarem fotos maiores, esse limite cai.

## Ao escolher a foto, pense em retrato

O card mostra a foto inteira em 4:5, sem corte adicional: o que estiver no
arquivo em `portrait/` é o que aparece. O terço inferior fica sob um gradiente
preto que carrega o nome do núcleo, então evite pôr o assunto ali embaixo.

Se a foto nova vier em 16:9, ela precisa de um assunto que sobreviva a perder
~55% da largura — e vale reescolher o offset em vez de recortar pelo centro.
