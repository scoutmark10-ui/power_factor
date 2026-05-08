# Aula: Login Git no VS Code sem pedir token toda hora

Objetivo: configurar uma vez e nunca mais precisar digitar token em todo `push/pull`.

## Caminho recomendado: SSH (melhor para uso diário)

## 1) Verifica se tem Git e OpenSSH
```powershell
git --version
ssh -V
```

## 2) Gera sua chave SSH
Troca o email pelo da sua conta GitHub:
```powershell
ssh-keygen -t ed25519 -C "seu-email@exemplo.com"
```

Quando pedir caminho, pode só dar `Enter` (padrão).
Quando pedir passphrase, você decide:
- com passphrase = mais seguro
- sem passphrase = mais rápido

## 3) Ativa o ssh-agent e adiciona a chave
```powershell
Get-Service ssh-agent | Set-Service -StartupType Automatic
Start-Service ssh-agent
ssh-add $env:USERPROFILE\.ssh\id_ed25519
```

## 4) Copia a chave pública
```powershell
Get-Content $env:USERPROFILE\.ssh\id_ed25519.pub
```

Copie todo o texto mostrado.

## 5) Adiciona no GitHub
No GitHub:
- `Settings`
- `SSH and GPG keys`
- `New SSH key`
- cola a chave e salva

## 6) Testa conexão
```powershell
ssh -T git@github.com
```

Se aparecer algo como `Hi <seu-user>!`, está ok.

## 7) Troca o remoto do projeto para SSH
Dentro do repositório:
```powershell
git remote -v
git remote set-url origin git@github.com:SEU_USER/SEU_REPO.git
git remote -v
```

Pronto. Agora `git pull` e `git push` não devem pedir token.

---

## Alternativa: HTTPS sem dor (Credential Manager)
Se você quiser continuar em HTTPS:

## 1) Ativa o helper de credenciais
```powershell
git config --global credential.helper manager
```

## 2) Faz um push normal
```powershell
git push
```

Vai abrir login do GitHub. Depois de autenticar, o Git Credential Manager salva e reutiliza.

---

## Configurações básicas que valem para qualquer método
```powershell
git config --global user.name "Seu Nome"
git config --global user.email "seu-email@exemplo.com"
git config --global init.defaultBranch main
```

Conferir:
```powershell
git config --global --list
```

---

## Diagnóstico rápido (se algo falhar)

## Ver remoto atual
```powershell
git remote -v
```

## Ver se chave está carregada
```powershell
ssh-add -l
```

## Teste detalhado SSH
```powershell
ssh -vT git@github.com
```

## Erros comuns
- `Permission denied (publickey)`: chave não adicionada no GitHub ou no `ssh-agent`.
- pede token toda hora: remoto ainda está em HTTPS ou credential manager não está ativo.
- repositório errado no `origin`: ajustar com `git remote set-url origin ...`.

---

## Fluxo final do dia a dia
```powershell
git add .
git commit -m "sua mensagem"
git push
```

Se SSH estiver certo, não pede token.
