/**
 * Lista de e-mails com privilégios de administrador do sistema.
 * Os e-mails aqui definidos possuem acesso total (edição, visualização de personagens privados e exclusão).
 */
export const DEFAULT_ADMIN_EMAILS: readonly string[] = [
  'carloseduardoff12@gmail.com',
  'hellendagnysouza@gmail.com',
]

/**
 * Verifica se um e-mail possui privilégios de administrador.
 * 
 * - Garante que os e-mails padrão mantêm seus privilégios permanentes.
 * - Permite adicionar novos administradores via variável de ambiente ADMIN_EMAILS (separados por vírgula).
 * - Comparação segura case-insensitive (não diferencia maiúsculas/minúsculas).
 */
export function isUserAdmin(email?: string | null): boolean {
  if (!email) return false
  const normalized = email.trim().toLowerCase()

  const envAdmins = process.env.ADMIN_EMAILS
    ? process.env.ADMIN_EMAILS.split(',').map((e) => e.trim().toLowerCase())
    : []

  const allowedAdmins = new Set([
    ...DEFAULT_ADMIN_EMAILS.map((e) => e.toLowerCase()),
    ...envAdmins,
  ])

  return allowedAdmins.has(normalized)
}
