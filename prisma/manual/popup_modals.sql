-- Cria a tabela popup_modals (feature Popup do site).
-- Gerado a partir de prisma/schema.prisma (model PopupModal).
-- Idempotente: só cria se ainda não existir. Rodar uma vez no banco aes-hotsite.

IF NOT EXISTS (
    SELECT 1 FROM sys.tables
    WHERE name = 'popup_modals' AND schema_id = SCHEMA_ID('dbo')
)
BEGIN
    CREATE TABLE [dbo].[popup_modals] (
        [id]         NVARCHAR(1000) NOT NULL,
        [title]      NVARCHAR(1000),
        [image_path] NVARCHAR(max)  NOT NULL,
        [link_url]   NVARCHAR(max),
        [start_date] DATETIME2,
        [end_date]   DATETIME2,
        [enabled]    BIT  NOT NULL CONSTRAINT [popup_modals_enabled_df]    DEFAULT 1,
        [sort_order] INT  NOT NULL CONSTRAINT [popup_modals_sort_order_df] DEFAULT 0,
        [created_at] DATETIME2 NOT NULL CONSTRAINT [popup_modals_created_at_df] DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT [popup_modals_pkey] PRIMARY KEY CLUSTERED ([id])
    );
END
