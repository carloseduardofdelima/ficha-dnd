$spells = @(
    'CORDÃO DE FLECHAS', 'CRESCER ESPINHOS', 'DESPEDAÇAR', 'DETECTAR PENSAMENTOS', 
    'ENCONTRAR ARMADILHAS', 'ESFERA FLAMEJANTE', 'ESQUENTAR METAL', 'FLECHA ÁCIDA DE MELF', 
    'FORÇA FANTASMAGÓRICA', 'IMOBILIZAR PESSOA', 'INVISIBILIDADE', 'LÂMINA FLAMEJANTE', 
    'LEVITAÇÃO', 'LOCALIZAR ANIMAIS OU PLANTAS', 'LOCALIZAR OBJETO', 'LUFADA DE VENTO', 
    'MENSAGEIRO ANIMAL', 'NUBLAR', 'NUVEM DE ADAGAS', 'ORAÇÃO CURATIVA', 'PASSO NEBULOSO', 
    'PASSOS SEM PEGADAS', 'PATAS DE ARANHA', 'PELE DE ÁRVORE', 'PROTEÇÃO CONTRA VENENO', 
    'RAIO ARDENTE', 'RAIO DO ENFRAQUECIMENTO', 'RAIO LUNAR', 'REFLEXOS', 'REPOUSO TRANQUILO', 
    'RESTAURAÇÃO MENOR', 'SENTIDO BESTIAL', 'SILÊNCIO', 'SUGESTÃO', 'TEIA', 'TRANCA ARCANA', 
    'TRUQUE DE CORDA', 'VER O INVISÍVEL', 'VÍNCULO PROTETOR', 'VISÃO NO ESCURO', 'ZONA DA VERDADE',
    'COROA DA LOUCURA'
)
$path = 'c:\Users\carlo\Documents\Projetos\ficha-dnd\spells_raw.txt'
$content = Get-Content $path -Encoding UTF8
foreach ($s in $spells) {
    for ($i = 0; $i -lt $content.Count; $i++) {
        if ($content[$i].Trim() -eq $s) {
            Write-Output "$($i + 1):$($content[$i])"
            break
        }
    }
}
