import re

path = 'src/lib/spells-2014.ts'
with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

targets = ['booming-blade-2014', 'catapult-2014', 'absorb-elements-2014', 'snare-2014']

for target in targets:
    # Match the first occurrence of the spell object containing this id up to its closing brace
    # Pattern: \n\s*\{\s*\n\s*id:\s*['"]{target}['"][^}]+\},?
    # We want to remove ONLY the FIRST occurrence!
    pattern = rf'\n\s*\{{\s*\n\s*id:\s*[\'"]{target}[\'"][^}}]+\}},?'
    matches = list(re.finditer(pattern, text))
    print(f"{target}: found {len(matches)} matches")
    if len(matches) > 1:
        first_match = matches[0]
        # Replace only the first occurrence
        text = text[:first_match.start()] + text[first_match.end():]
        print(f"Removed first occurrence of {target}")

with open(path, 'w', encoding='utf-8') as f:
    f.write(text)

# Verify duplicates again
ids = re.findall(r'id:\s*[\'\"]([^\'\"]+)[\'\"]', text)
seen = set()
dups = []
for i in ids:
    if i in seen:
        dups.append(i)
    seen.add(i)
print("Remaining duplicates in spells-2014:", dups)

