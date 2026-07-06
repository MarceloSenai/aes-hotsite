-- Cria a tabela site_content (textos editáveis do site — títulos e descrições).
-- Gerado a partir de prisma/schema.prisma (model SiteContent).
-- Idempotente: só cria se ainda não existir. Rodar uma vez no banco aes-hotsite.

IF NOT EXISTS (
    SELECT 1 FROM sys.tables
    WHERE name = 'site_content' AND schema_id = SCHEMA_ID('dbo')
)
BEGIN
    CREATE TABLE [dbo].[site_content] (
        [id]         NVARCHAR(1000) NOT NULL,
        [section]    NVARCHAR(1000) NOT NULL,
        [key]        NVARCHAR(1000) NOT NULL,
        [label]      NVARCHAR(1000) NOT NULL,
        [value]      NVARCHAR(max)  NOT NULL,
        [sort_order] INT      NOT NULL CONSTRAINT [site_content_sort_order_df] DEFAULT 0,
        [updated_at] DATETIME2 NOT NULL CONSTRAINT [site_content_updated_at_df] DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT [site_content_pkey] PRIMARY KEY CLUSTERED ([id]),
        CONSTRAINT [site_content_section_key_uq] UNIQUE ([section], [key])
    );
END
