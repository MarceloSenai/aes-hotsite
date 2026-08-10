-- Inclui a Gerente Neiva Damaceno na Diretoria Executiva (tabela representantes).
-- Ela aparece em /sobre/administracao, que lista os membros vindos do banco.
--
-- Idempotente: não duplica se ela já tiver sido cadastrada pelo painel /admin
-- (a checagem é por nome + categoria, não pelo id).
--
-- O `id` é NVARCHAR e o default cuid() é gerado pelo Prisma na aplicação, não
-- pelo banco — por isso o INSERT informa um id explícito e legível.
--
-- sort_order 8: logo depois do 3° Tesoureiro (7), no fim da Diretoria Executiva.

IF NOT EXISTS (
    SELECT 1 FROM [dbo].[representantes]
    WHERE [categoria] = 'diretoria-executiva' AND [nome] = 'Neiva Damaceno'
)
BEGIN
    INSERT INTO [dbo].[representantes] ([id], [nome], [cargo], [categoria], [sort_order])
    VALUES ('rep-diretoria-neiva-damaceno', 'Neiva Damaceno', 'Gerente', 'diretoria-executiva', 8);
END

-- Conferência (deve trazer 9 linhas, terminando em Neiva Damaceno):
-- SELECT nome, cargo, sort_order FROM [dbo].[representantes]
-- WHERE categoria = 'diretoria-executiva' ORDER BY sort_order;
