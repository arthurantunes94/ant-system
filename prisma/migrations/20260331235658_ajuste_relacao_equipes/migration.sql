-- CreateTable
CREATE TABLE "Equipe" (
    "id" SERIAL NOT NULL,
    "atleta1Id" INTEGER NOT NULL,
    "atleta2Id" INTEGER NOT NULL,

    CONSTRAINT "Equipe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Torneio" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Torneio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Jogo" (
    "id" SERIAL NOT NULL,
    "equipeAId" INTEGER NOT NULL,
    "equipeBId" INTEGER NOT NULL,
    "pontuacaoA" INTEGER NOT NULL,
    "pontuacaoB" INTEGER NOT NULL,
    "vencedorId" INTEGER NOT NULL,
    "torneioId" INTEGER NOT NULL,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Jogo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Equipe" ADD CONSTRAINT "Equipe_atleta1Id_fkey" FOREIGN KEY ("atleta1Id") REFERENCES "Atleta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Equipe" ADD CONSTRAINT "Equipe_atleta2Id_fkey" FOREIGN KEY ("atleta2Id") REFERENCES "Atleta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Jogo" ADD CONSTRAINT "Jogo_equipeAId_fkey" FOREIGN KEY ("equipeAId") REFERENCES "Equipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Jogo" ADD CONSTRAINT "Jogo_equipeBId_fkey" FOREIGN KEY ("equipeBId") REFERENCES "Equipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Jogo" ADD CONSTRAINT "Jogo_vencedorId_fkey" FOREIGN KEY ("vencedorId") REFERENCES "Equipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Jogo" ADD CONSTRAINT "Jogo_torneioId_fkey" FOREIGN KEY ("torneioId") REFERENCES "Torneio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
