این پروژه برای اتصال به دیتابیس MSSQL نوشته شده و یک کوئری تست برای اتصال به صورت نمونه در آن قرار داده شده است 

CREATE DATABASE PIC1001
GO

CREATE TABLE [dbo].[HesabPic](
	[Radif] [int] NULL,
	[HesabNo] [char](15) NULL,
	[KindHesab] [int] NULL,
	[fSign] [text] NULL,
	[filename] [char](250) NULL,
	[lChang] [bit] NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
