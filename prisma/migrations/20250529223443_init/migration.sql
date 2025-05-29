-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "genero" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "rua" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "complemento" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "fotoPerfil" TEXT
);

-- CreateTable
CREATE TABLE "Medico" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "crm" TEXT NOT NULL,
    "especialidade" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "rqe" TEXT NOT NULL,
    "universidade" TEXT NOT NULL,
    "anoFormatura" TEXT NOT NULL,
    "resumoCurriculo" TEXT NOT NULL,
    "fotoPerfil" TEXT,
    "fotoCrm" TEXT,
    "documentoIdentidade" TEXT,
    "certificadoEspecializacao" TEXT,
    "valorPadraoConsulta" REAL NOT NULL,
    "tempoMedioConsulta" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Medico_email_key" ON "Medico"("email");
