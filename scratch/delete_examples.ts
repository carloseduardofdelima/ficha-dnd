import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const IDS_TO_DELETE = [
  "cmmoawh290002ca5kjha60a7v", // Mobile Test
  "cmojaoddp0005caoo2ezd2ahv", // asasass
  "cmojaq41y0001l1040qr96bx7", // Teste 2
  "cmojc29xk0007caooun148s5c", // ajskasd
  "cmoj2xaco0001cabkq28db81y", // sdas
  "cmoiphlvv0001l804eiudik05", // Teste
  "cmoj365ir0001cajg14el9zb4", // Exemplo: Bárbaro Completo
  "cmoj365ok0003cajgwt6j15n7", // Exemplo: Bardo Completo
  "cmoj365s90005cajgt69c2p5w", // Exemplo: Clérigo Completo
  "cmoj365vw0007cajgp4qtdaht", // Exemplo: Druida Completo
  "cmoj365zo0009cajgmx4coc3x", // Exemplo: Guerreiro Completo
  "cmoj3663k000bcajgvly73gba", // Exemplo: Monge Completo
  "cmoj3667q000dcajga42qkbog", // Exemplo: Paladino Completo
  "cmoj366bc000fcajgompguy7b", // Exemplo: Patrulheiro Completo
  "cmoj366f1000hcajgnihx44ku", // Exemplo: Ladino Completo
  "cmoj366ir000jcajgr6ovn8xp", // Exemplo: Feiticeiro Completo
  "cmoj366nj000lcajg45rppj9m", // Exemplo: Bruxo Completo
  "cmoj366rj000ncajg6qahafsg", // Exemplo: Mago Completo
]

async function main() {
  const result = await prisma.character.deleteMany({
    where: {
      id: {
        in: IDS_TO_DELETE
      }
    }
  })
  console.log(`Deleted ${result.count} characters.`)
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
