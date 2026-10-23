import { createClient } from '@supabase/supabase-js'

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://lpgeyojvwcelberuunee.supabase.co'
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseKey)

/**
 * Server-side safeguard: If a string is Base64, uploads it to Supabase Storage
 * and returns the public CDN URL. If it's already an HTTP URL or null, returns it unchanged.
 */
export async function uploadBase64ToStorage(
  base64OrUrl: string | null | undefined,
  folder = 'avatars',
  userId = 'system'
): Promise<string | null | undefined> {
  if (!base64OrUrl || !base64OrUrl.startsWith('data:image')) {
    return base64OrUrl
  }

  try {
    const { nanoid } = await import('nanoid')
    const matches = base64OrUrl.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)
    const mimeType = matches ? matches[1] : 'image/jpeg'
    const base64Data = matches ? matches[2] : base64OrUrl
    const buffer = Buffer.from(base64Data, 'base64')
    const ext = mimeType.includes('png') ? 'png' : mimeType.includes('webp') ? 'webp' : 'jpg'
    const fileName = `${folder}/${userId}/${nanoid(12)}_${Date.now()}.${ext}`

    const { error } = await supabase.storage.from('avatars').upload(fileName, buffer, {
      contentType: mimeType,
      upsert: true,
    })

    if (!error) {
      const { data } = supabase.storage.from('avatars').getPublicUrl(fileName)
      return data.publicUrl
    }
    console.error('Supabase storage upload error:', error.message)
  } catch (err) {
    console.error('Error auto-uploading base64 to Supabase storage:', err)
  }

  return base64OrUrl
}
