# Troubleshooting — Conexão com o banco (Azure SQL)

Guia rápido para diagnosticar erros de **timeout** ao conectar no banco do projeto AES.

O banco é **Azure SQL Server** (`aesdb.database.windows.net`, database `aes-hotsite`).
A aplicação conecta via Prisma + `@prisma/adapter-mssql` (ver `lib/prisma.ts`), lendo `DATABASE_URL` do `.env.local`.

> ⚠️ **A senha não está no repositório** (`.env*` é bloqueado pelo `.gitignore`).
> Onde aparece `SENHA` abaixo, use a senha real que foi passada em separado.

---

## 1. Connection strings por stack

### Prisma (formato usado pela aplicação)
```
sqlserver://aesdb.database.windows.net:1433;database=aes-hotsite;user=usr-aes-admin;password=SENHA;encrypt=true;trustServerCertificate=false
```

### ADO.NET (SSMS / .NET / Azure Data Studio)
```
Server=tcp:aesdb.database.windows.net,1433;Initial Catalog=aes-hotsite;User ID=usr-aes-admin;Password=SENHA;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;
```

### JDBC (Java / DBeaver)
```
jdbc:sqlserver://aesdb.database.windows.net:1433;database=aes-hotsite;user=usr-aes-admin;password=SENHA;encrypt=true;trustServerCertificate=false;loginTimeout=30;
```

### Python (pyodbc)
```
DRIVER={ODBC Driver 18 for SQL Server};SERVER=tcp:aesdb.database.windows.net,1433;DATABASE=aes-hotsite;UID=usr-aes-admin;PWD=SENHA;Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30;
```

---

## 2. Teste de porta/firewall (rode ANTES de tudo)

Testa apenas se a sua rede **alcança** o Azure na porta 1433 — separa problema de
rede/firewall de problema de credencial.

**Windows (PowerShell):**
```powershell
Test-NetConnection aesdb.database.windows.net -Port 1433
```
- `TcpTestSucceeded : True`  → porta ok; o problema é credencial ou firewall do Azure SQL (seu IP não liberado).
- `TcpTestSucceeded : False` → porta 1433 bloqueada na sua rede/ISP **ou** firewall do Azure SQL recusando seu IP.

**macOS / Linux:**
```bash
nc -vz aesdb.database.windows.net 1433
```
- `succeeded!` → porta ok.

**Descobrir seu IP público** (para liberar no firewall do Azure):
```bash
curl ifconfig.me
```

---

## 3. Teste de conexão real (valida credencial + banco)

**sqlcmd** (multiplataforma, acompanha o SQL Server tools):
```bash
sqlcmd -S tcp:aesdb.database.windows.net,1433 -d aes-hotsite -U usr-aes-admin -P 'SENHA' -N -l 30 -Q "SELECT 1"
```
- `-N` força criptografia (Azure exige), `-l 30` = timeout de login de 30s.
- Retornou `1` → conexão 100% ok.
- `Login timeout expired` / `Cannot open server ... requested by the login` → **firewall do Azure SQL** bloqueando seu IP.
- `Login failed for user` → chegou no servidor, mas **usuário/senha errados**.

---

## 4. Roteiro de diagnóstico

| Resultado                              | Significado                          | Ação                                                                                 |
|----------------------------------------|--------------------------------------|--------------------------------------------------------------------------------------|
| `Test-NetConnection` = **False**       | Porta 1433 bloqueada ou IP não liberado | Testar de outra rede / pedir liberação do IP no Azure                              |
| Porta ok, mas `Login timeout`          | Firewall do Azure SQL barra o IP     | Enviar o resultado de `curl ifconfig.me`; liberar em `aesdb` → Networking → Firewall rules |
| `Login failed for user`                | Rede ok, credencial errada           | Confirmar usuário/senha corretos                                                     |
| `SELECT 1` retorna `1`                 | Tudo certo                           | 🎉                                                                                    |

---

## Causa nº 1 de timeout: firewall do Azure SQL

Na esmagadora maioria dos casos o timeout é o **firewall do Azure SQL** não liberando o IP público de quem está conectando.

Para liberar: portal Azure → servidor `aesdb` → **Networking → Firewall rules** → adicionar o IP público.
Se a conexão vier de dentro do Azure, habilitar **"Allow Azure services and resources to access this server"**.
