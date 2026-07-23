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
| `card/<slug>.webp` | 877x658 (4:3) | **O que aparece no site**: seção de núcleos da home (`NucleosDestaque` → `destaques/NucleoCard`) |
| `<slug>.webp` | 1170x658 (16:9) | Original, fonte do recorte. Referenciado pelo array local de `/nucleo-de-lazer`, mas aquele card não renderiza foto — o campo está lá sem uso |

O recorte 4:3 sai do 16:9 mantendo a altura inteira (658px) e cortando só a
largura, com offset horizontal escolhido por foto para não perder o assunto:

| Arquivo | Offset X | O que o recorte preserva |
|---|---|---|
| `clube-de-campo.webp` | 60 | O salgueiro (tronco + copa) que fica à esquerda |
| `clube-nautico.webp` | 120 | A diagonal do píer entrando pelo canto inferior |
| `colonia-de-ferias.webp` | 170 | O coqueiral à esquerda e a curva da arrebentação |

**Ao trocar uma foto real, regere o recorte** — trocar só o 16:9 não muda nada
no site, porque quem é renderizado é o arquivo em `card/`. O recorte é `extract`
de 877x658 a partir do offset, sem redimensionar (`sharp`, webp quality 85).

Por que pré-recortado em 4:3 e não `object-cover` sobre o 16:9: quando a caixa
(4:3) e a fonte (16:9) têm proporções diferentes, o cover precisa escalar a
imagem além da largura da caixa, mas o `sizes` do `next/image` pede só a largura
da *caixa* — o browser baixa uma versão estreita demais e a foto sobe de escala,
borrada. Com o arquivo já em 4:3, `sizes` = largura da caixa e não há upscale.

**A largura do recorte 4:3 vai a 877px** (altura 658 × 4/3), contra os 526px do
antigo 4:5. Por isso a seção agora usa `max-w-[1920px]` como as outras: os cards
chegam a ~602px e os 877px cobrem essa largura com folga.

## Ao escolher a foto, pense em paisagem 4:3

O card mostra a foto inteira em 4:3, sem corte adicional: o que estiver no
arquivo em `card/` é o que aparece. O terço inferior fica sob um gradiente preto
que carrega o nome do núcleo, então evite pôr o assunto ali embaixo.

Vindo de um 16:9, o recorte 4:3 perde só ~25% da largura — bem menos agressivo
que o antigo 4:5. Ainda assim, reescolha o offset em vez de cortar pelo centro
se o assunto estiver muito para um lado.
