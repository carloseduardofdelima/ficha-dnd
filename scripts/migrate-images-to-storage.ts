import { prisma } from '../src/lib/prisma'
import { supabase } from '../src/lib/supabase'

async function migrateImages() {
  console.log('=== INICIANDO MIGRAÇÃO DE IMAGENS BASE64 PARA SUPABASE STORAGE ===\n')

  const keyConfigured =
    !!process.env.SUPABASE_SERVICE_ROLE_KEY || !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!keyConfigured) {
    console.error('❌ ERRO: Nenhuma chave do Supabase encontrada no .env!')
    console.log(
      'Por favor, adicione NEXT_PUBLIC_SUPABASE_ANON_KEY ou SUPABASE_SERVICE_ROLE_KEY ao seu arquivo .env para executar a migração.'
    )
    process.exit(1)
  }

  let totalMigrated = 0
  let totalBytesSaved = 0

  // 1. Migrar Personagens
  const chars = await prisma.character.findMany({
    where: { avatarUrl: { startsWith: 'data:image' } },
    select: { id: true, name: true, avatarUrl: true },
  })
  console.log(`Encontrados ${chars.length} personagens com imagem em Base64.`)

  for (const char of chars) {
    if (!char.avatarUrl) continue
    const len = char.avatarUrl.length
    const matches = char.avatarUrl.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)
    const mimeType = matches ? matches[1] : 'image/jpeg'
    const base64Data = matches ? matches[2] : char.avatarUrl
    const buffer = Buffer.from(base64Data, 'base64')
    const ext = mimeType.includes('png') ? 'png' : mimeType.includes('webp') ? 'webp' : 'jpg'
    const filePath = `migrated_characters/${char.id}.${ext}`

    const { error } = await supabase.storage.from('avatars').upload(filePath, buffer, {
      contentType: mimeType,
      upsert: true,
    })

    if (error) {
      console.error(`Falha ao subir avatar de ${char.name}:`, error.message)
      continue
    }

    const { data } = supabase.storage.from('avatars').getPublicUrl(filePath)
    await prisma.character.update({
      where: { id: char.id },
      data: { avatarUrl: data.publicUrl },
    })

    totalBytesSaved += len
    totalMigrated++
    console.log(`✅ [Personagem] ${char.name}: ${(len / 1024).toFixed(1)} KB migrados -> ${data.publicUrl}`)
  }

  // 2. Migrar Campanhas
  const campaigns = await prisma.campaign.findMany({
    where: { coverUrl: { startsWith: 'data:image' } },
    select: { id: true, name: true, coverUrl: true },
  })
  console.log(`\nEncontradas ${campaigns.length} campanhas com capa em Base64.`)

  for (const camp of campaigns) {
    if (!camp.coverUrl) continue
    const len = camp.coverUrl.length
    const matches = camp.coverUrl.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)
    const mimeType = matches ? matches[1] : 'image/jpeg'
    const base64Data = matches ? matches[2] : camp.coverUrl
    const buffer = Buffer.from(base64Data, 'base64')
    const ext = mimeType.includes('png') ? 'png' : mimeType.includes('webp') ? 'webp' : 'jpg'
    const filePath = `migrated_campaigns/${camp.id}.${ext}`

    const { error } = await supabase.storage.from('avatars').upload(filePath, buffer, {
      contentType: mimeType,
      upsert: true,
    })

    if (error) {
      console.error(`Falha ao subir capa de ${camp.name}:`, error.message)
      continue
    }

    const { data } = supabase.storage.from('avatars').getPublicUrl(filePath)
    await prisma.campaign.update({
      where: { id: camp.id },
      data: { coverUrl: data.publicUrl },
    })

    totalBytesSaved += len
    totalMigrated++
    console.log(`✅ [Campanha] ${camp.name}: ${(len / 1024).toFixed(1)} KB migrados -> ${data.publicUrl}`)
  }

  // 3. Migrar Notas e Mapas
  const notes = await prisma.campaignNote.findMany({
    where: { imageUrl: { startsWith: 'data:image' } },
    select: { id: true, title: true, imageUrl: true },
  })
  console.log(`\nEncontradas ${notes.length} notas/mapas com imagem em Base64.`)

  for (const note of notes) {
    if (!note.imageUrl) continue
    const len = note.imageUrl.length
    const matches = note.imageUrl.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)
    const mimeType = matches ? matches[1] : 'image/jpeg'
    const base64Data = matches ? matches[2] : note.imageUrl
    const buffer = Buffer.from(base64Data, 'base64')
    const ext = mimeType.includes('png') ? 'png' : mimeType.includes('webp') ? 'webp' : 'jpg'
    const filePath = `migrated_notes/${note.id}.${ext}`

    const { error } = await supabase.storage.from('avatars').upload(filePath, buffer, {
      contentType: mimeType,
      upsert: true,
    })

    if (error) {
      console.error(`Falha ao subir nota ${note.title}:`, error.message)
      continue
    }

    const { data } = supabase.storage.from('avatars').getPublicUrl(filePath)
    await prisma.campaignNote.update({
      where: { id: note.id },
      data: { imageUrl: data.publicUrl },
    })

    totalBytesSaved += len
    totalMigrated++
    console.log(`✅ [Nota/Mapa] ${note.title}: ${(len / 1024).toFixed(1)} KB migrados -> ${data.publicUrl}`)
  }

  // 4. Migrar NPCs
  const npcs = await prisma.npc.findMany({
    where: { avatarUrl: { startsWith: 'data:image' } },
    select: { id: true, name: true, avatarUrl: true },
  })
  if (npcs.length > 0) {
    console.log(`\nEncontrados ${npcs.length} NPCs com imagem em Base64.`)
    for (const npc of npcs) {
      if (!npc.avatarUrl) continue
      const len = npc.avatarUrl.length
      const matches = npc.avatarUrl.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)
      const mimeType = matches ? matches[1] : 'image/jpeg'
      const base64Data = matches ? matches[2] : npc.avatarUrl
      const buffer = Buffer.from(base64Data, 'base64')
      const ext = mimeType.includes('png') ? 'png' : mimeType.includes('webp') ? 'webp' : 'jpg'
      const filePath = `migrated_npcs/${npc.id}.${ext}`

      const { error } = await supabase.storage.from('avatars').upload(filePath, buffer, {
        contentType: mimeType,
        upsert: true,
      })

      if (error) {
        console.error(`Falha ao subir NPC ${npc.name}:`, error.message)
        continue
      }

      const { data } = supabase.storage.from('avatars').getPublicUrl(filePath)
      await prisma.npc.update({
        where: { id: npc.id },
        data: { avatarUrl: data.publicUrl },
      })

      totalBytesSaved += len
      totalMigrated++
      console.log(`✅ [NPC] ${npc.name}: ${(len / 1024).toFixed(1)} KB migrados -> ${data.publicUrl}`)
    }
  }

  // 5. Migrar Ameaças (Threats)
  const threats = await prisma.threat.findMany({
    where: { imageUrl: { startsWith: 'data:image' } },
    select: { id: true, name: true, imageUrl: true },
  })
  if (threats.length > 0) {
    console.log(`\nEncontradas ${threats.length} ameaças com imagem em Base64.`)
    for (const threat of threats) {
      if (!threat.imageUrl) continue
      const len = threat.imageUrl.length
      const matches = threat.imageUrl.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)
      const mimeType = matches ? matches[1] : 'image/jpeg'
      const base64Data = matches ? matches[2] : threat.imageUrl
      const buffer = Buffer.from(base64Data, 'base64')
      const ext = mimeType.includes('png') ? 'png' : mimeType.includes('webp') ? 'webp' : 'jpg'
      const filePath = `migrated_threats/${threat.id}.${ext}`

      const { error } = await supabase.storage.from('avatars').upload(filePath, buffer, {
        contentType: mimeType,
        upsert: true,
      })

      if (error) {
        console.error(`Falha ao subir ameaça ${threat.name}:`, error.message)
        continue
      }

      const { data } = supabase.storage.from('avatars').getPublicUrl(filePath)
      await prisma.threat.update({
        where: { id: threat.id },
        data: { imageUrl: data.publicUrl },
      })

      totalBytesSaved += len
      totalMigrated++
      console.log(`✅ [Ameaça] ${threat.name}: ${(len / 1024).toFixed(1)} KB migrados -> ${data.publicUrl}`)
    }
  }

  console.log('\n======================================================')
  console.log(`🎉 MIGRAÇÃO CONCLUÍDA COM SUCESSO!`)
  console.log(`Total de imagens migradas: ${totalMigrated}`)
  console.log(`Espaço de texto aliviado do banco: ${(totalBytesSaved / 1024).toFixed(1)} KB`)
  console.log('======================================================')
}

migrateImages()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
