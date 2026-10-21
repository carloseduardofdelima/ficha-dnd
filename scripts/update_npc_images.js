const fs = require('fs')
const path = require('path')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const mediaDir = 'C:\\Users\\carlo\\.gemini\\antigravity\\brain\\ae82fb31-4a59-4e34-befb-71cbb1f3e065'
const publicDir = 'c:\\Users\\carlo\\OneDrive\\Documentos\\programação\\Projetos\\ficha-dnd\\public\\npcs'

const images = [
  'media__1777549534999.png',
  'media__1777549610908.png',
  'media__1777549779051.png',
  'media__1777550069357.png',
  'media__1777550256429.png'
]

async function main() {
  const campaignId = 'cmoktdo6a0001ca281ba5a80b'
  
  // 1. Copy images
  if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true })
  
  images.forEach((img, i) => {
    const src = path.join(mediaDir, img)
    const dest = path.join(publicDir, `npc_${i + 1}.png`)
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, dest)
      console.log(`Copied ${img} to npc_${i + 1}.png`)
    } else {
      console.error(`Source image not found: ${src}`)
    }
  })

  // 2. Update NPCs
  const npcs = await prisma.npc.findMany({
    where: { campaignId },
    orderBy: { createdAt: 'asc' }
  })

  console.log(`Found ${npcs.length} NPCs to update.`)

  for (let i = 0; i < Math.min(npcs.length, images.length); i++) {
    const npc = npcs[i]
    const avatarUrl = `/npcs/npc_${i + 1}.png`
    await prisma.npc.update({
      where: { id: npc.id },
      data: { avatarUrl }
    })
    console.log(`Updated NPC ${npc.name} with avatar ${avatarUrl}`)
  }
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect())
