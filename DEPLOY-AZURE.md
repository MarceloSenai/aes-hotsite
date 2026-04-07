# Deploy AES Hotsite — Azure App Service

## Instruções para o DevOps (Buri)

O código já está no Azure DevOps (`dev.azure.com/codecyclebr/AES/_git/AES`, branch `main`) e inclui o arquivo `azure-pipelines.yml` pronto. Abaixo estão os passos para ativar o pipeline de CI/CD.

---

### 1. Criar o App Service

No **Azure Portal**:

1. Ir em **App Services → Create**
2. Configurar:
   - **Resource Group:** usar o mesmo do SQL Server `aesdb`
   - **Name:** `aes-hotsite` (ou outro nome — ficará `aes-hotsite.azurewebsites.net`)
   - **Publish:** Code
   - **Runtime stack:** Node 20 LTS
   - **Operating System:** Linux
   - **Region:** East US (mesma do SQL Server, para menor latência)
   - **Plan:** B1 (Basic) ou superior
3. Criar

### 2. Configurar Variáveis no App Service

No App Service criado, ir em **Settings → Environment variables** e adicionar:

| Nome | Valor |
|------|-------|
| `DATABASE_URL` | `sqlserver://aesdb.database.windows.net:1433;database=aes-hotsite;user=usr-aes-admin;password=nihaqhB6mgvC7F7s8r!j;encrypt=true;trustServerCertificate=false` |
| `NEXTAUTH_SECRET` | (gerar um valor aleatório seguro, ex: `openssl rand -base64 32`) |
| `NEXTAUTH_URL` | `https://aes-hotsite.azurewebsites.net` (ajustar se o nome for diferente) |

Clicar em **Apply**.

### 3. Configurar Startup Command no App Service

No App Service, ir em **Settings → Configuration → General settings**:

- **Startup Command:** `node .next/standalone/server.js`

Salvar.

### 4. Criar Service Connection no Azure DevOps

No **Azure DevOps** (`dev.azure.com/codecyclebr`):

1. Ir em **Project Settings → Service connections → New service connection**
2. Tipo: **Azure Resource Manager**
3. Método: **Service principal (automatic)**
4. Selecionar a subscription e o resource group do App Service
5. **Service connection name:** `AES-Azure` (este nome será usado no pipeline)
6. Marcar **"Grant access permission to all pipelines"**
7. Salvar

### 5. Criar Variable Group no Azure DevOps

No Azure DevOps:

1. Ir em **Pipelines → Library → + Variable group**
2. **Name:** `aes-hotsite-vars`
3. Adicionar 3 variáveis:

| Nome | Valor | Cadeado? |
|------|-------|----------|
| `DATABASE_URL` | (mesma connection string da tabela acima) | Sim |
| `NEXTAUTH_SECRET` | (mesmo valor gerado no passo 2) | Sim |
| `NEXTAUTH_URL` | `https://aes-hotsite.azurewebsites.net` | Nao |

4. Salvar

### 6. Editar o Pipeline (2 valores)

No arquivo `azure-pipelines.yml` (já no repositório), substituir os 2 placeholders:

```yaml
# Linha ~93: trocar <AZURE_SUBSCRIPTION> pelo nome da Service Connection
azureSubscription: 'AES-Azure'

# Linha ~94: trocar <APP_SERVICE_NAME> pelo nome do App Service
appName: 'aes-hotsite'
```

Pode editar direto no Azure DevOps (Repos → Files → `azure-pipelines.yml` → Edit) ou via git push.

### 7. Criar o Pipeline no Azure DevOps

1. Ir em **Pipelines → New pipeline**
2. Selecionar **Azure Repos Git**
3. Selecionar o repositório **AES**
4. Selecionar **Existing Azure Pipelines YAML file**
5. Path: `/azure-pipelines.yml`
6. **Run**

O pipeline vai:
- Instalar Node 20
- Instalar dependências (`npm ci`)
- Gerar Prisma Client (`prisma generate`)
- Build Next.js em modo standalone
- Empacotar e deploy no App Service

### 8. Verificar Firewall do SQL Server

O firewall do Azure SQL (`aesdb`) já está configurado para aceitar conexões externas. Se o App Service não conseguir conectar, verificar:

- **Azure Portal → SQL Server `aesdb` → Networking**
- Marcar **"Allow Azure services and resources to access this server"** (ON)
- Ou adicionar os IPs de outbound do App Service

---

## Fluxo de Deploy (após configuração)

```
git push origin main
    ├── GitHub (backup)
    └── Azure DevOps
            └── Pipeline (automático)
                    ├── Build (npm ci + prisma generate + next build)
                    └── Deploy → Azure App Service
```

Cada push no `main` dispara o pipeline automaticamente.

---

## Dados do Banco (já configurado)

- **Servidor:** `aesdb.database.windows.net`
- **Database:** `aes-hotsite`
- **User:** `usr-aes-admin`
- **Schema:** sincronizado via Prisma (8 tabelas)
- **Seed:** admin `admin@aessenai.org.br` / `AES@Admin2026`

---

## Contato

Dúvidas sobre o código ou pipeline: Marcelo
