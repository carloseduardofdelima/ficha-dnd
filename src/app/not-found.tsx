import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="container" style={{ textAlign: 'center', paddingTop: '80px' }}>
      <div style={{ fontSize: '64px', marginBottom: '16px' }}>🐉</div>
      <h1 style={{ fontFamily: 'Cinzel, serif', fontSize: '24px', marginBottom: '12px' }}>
        Página não encontrada
      </h1>
      <p style={{ color: 'var(--fg2)', marginBottom: '28px' }}>
        Este personagem foi perdido nas trevas.
      </p>
      <Link href="/personagens">
        <button className="btn btn-primary">Voltar às fichas</button>
      </Link>
    </div>
  )
}
