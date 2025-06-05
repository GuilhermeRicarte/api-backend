/*
  Warnings:

  - You are about to drop the `VideoChamada` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "VideoChamada";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Agendamento" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "uuid" TEXT NOT NULL,
    "pacienteId" INTEGER NOT NULL,
    "medicoId" INTEGER NOT NULL,
    "dataHora" DATETIME NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDENTE',
    "observacao" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "Agendamento_uuid_key" ON "Agendamento"("uuid");
