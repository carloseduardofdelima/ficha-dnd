import type { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import { getBaseUrl } from '@/lib/url'

type Props = {
  params: Promise<{ id: string }>
  children: React.ReactNode
}

const FALLBACK_IMAGE = 'https://www.enworld.org/attachments/dd-tashas-1604041136985-jpg.128081/'

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const baseUrl = getBaseUrl()

  try {
    let character = await prisma.character.findUnique({
      where: { id },
      select: {
        id: true,
        slug: true,
        name: true,
        race: true,
        class: true,
        subclass: true,
        level: true,
        maxHp: true,
        armorClass: true,
        avatarUrl: true,
        backstory: true,
      },
    })

    if (!character) {
      character = await prisma.character.findUnique({
        where: { slug: id },
        select: {
          id: true,
          slug: true,
          name: true,
          race: true,
          class: true,
          subclass: true,
          level: true,
          maxHp: true,
          armorClass: true,
          avatarUrl: true,
          backstory: true,
        },
      })
    }

    if (!character) {
      return {
        title: 'Personagem não encontrado | A Forja',
        description: 'Ficha de personagem de D&D 5e.',
      }
    }

    // Build subtitle / details (ex: "Elfo • Mago (Evocação) • Nível 5")
    const detailsList = [
      character.race,
      character.class ? `${character.class}${character.subclass ? ` (${character.subclass})` : ''}` : null,
      `Nível ${character.level}`,
    ].filter(Boolean)

    const details = detailsList.join(' • ')
    const stats = `PV ${character.maxHp} • CA ${character.armorClass}`

    const pageTitle = details ? `${character.name} — ${details} | A Forja` : `${character.name} | A Forja`

    let description = details
      ? `${details} • ${stats} | Ficha completa de D&D 5e na Forja.`
      : `${stats} | Ficha de personagem de D&D 5e na Forja.`

    if (character.backstory) {
      const cleanBackstory = character.backstory.replace(/\s+/g, ' ').trim()
      if (cleanBackstory.length > 0) {
        const snippet = cleanBackstory.length > 90 ? `${cleanBackstory.slice(0, 87)}...` : cleanBackstory
        description = `${details ? `${details} • ` : ''}${stats} — "${snippet}"`
      }
    }

    // Determine avatar image URL
    let imageUrl = FALLBACK_IMAGE
    if (character.avatarUrl) {
      if (character.avatarUrl.startsWith('http://') || character.avatarUrl.startsWith('https://')) {
        imageUrl = character.avatarUrl
      } else if (character.avatarUrl.startsWith('data:')) {
        imageUrl = `${baseUrl}/api/personagens/${character.id}/avatar`
      }
    }

    const pageUrl = `${baseUrl}/personagens/${character.slug || character.id}`

    return {
      title: pageTitle,
      description,
      openGraph: {
        title: character.name,
        description,
        url: pageUrl,
        siteName: 'A Forja | Fichas de D&D',
        images: [
          {
            url: imageUrl,
            alt: character.name,
          },
        ],
        type: 'profile',
      },
      twitter: {
        card: 'summary_large_image',
        title: character.name,
        description,
        images: [imageUrl],
      },
    }
  } catch (error) {
    console.error('Erro ao gerar metadados do personagem:', error)
    return {
      title: 'Ficha de Personagem | A Forja',
      description: 'Crie, gerencie e compartilhe fichas de personagens de Dungeons & Dragons.',
    }
  }
}

export default function CharacterLayout({ children }: Props) {
  return children
}

