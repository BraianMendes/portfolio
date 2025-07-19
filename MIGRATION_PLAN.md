# Plano de Migração para Lucide React

## Status Atual
O projeto está usando uma mistura de bibliotecas de ícones:
1. **Lucide React** (já instalado) - usado em algumas páginas de projetos
2. **Heroicons** (já instalado) - usado em páginas de certificações e outras
3. **Ícones customizados** - definidos manualmente em `components/icons.tsx`

## Objetivo
Padronizar todos os ícones usando **Lucide React** como biblioteca principal.

## Vantagens do Lucide React
- ✅ Já está instalado no projeto
- ✅ Biblioteca muito popular e bem mantida
- ✅ Grande variedade de ícones (1000+ ícones)
- ✅ Performance otimizada com tree-shaking automático
- ✅ API consistente
- ✅ Suporte completo ao TypeScript
- ✅ Tamanho pequeno dos ícones individuais

## Mapeamento de Ícones para Migração

### Ícones Básicos (já disponíveis no Lucide)
- `Github` → `Github` (já usado)
- `Bot` → `Bot` (já usado) 
- `Database` → `Database` (já usado)
- `FileText` → `FileText` (já usado)
- `Zap` → `Zap` (já usado)
- `Search` → `Search`
- `Sun` → `Sun`
- `Moon` → `Moon`
- `Heart` → `Heart`

### Ícones Heroicons → Lucide
- `ChevronDownIcon` → `ChevronDown`
- `CheckIcon` → `Check`
- `XMarkIcon` → `X`

### Ícones de Tecnologia (manter customizados ou usar equivalentes)
Alguns ícones específicos de tecnologia podem não ter equivalentes exatos no Lucide, então podemos:
1. Usar ícones genéricos do Lucide quando apropriado
2. Manter alguns ícones customizados para tecnologias específicas
3. Buscar alternativas criativas

**Sugestões de mapeamento:**
- `PythonIcon` → manter customizado (Python-specific)
- `ReactIcon` → manter customizado (React-specific)  
- `JavaScriptIcon` → `Code2` ou manter customizado
- `SQLIcon` → `Database`
- `ExcelIcon` → `FileSpreadsheet`
- `GithubIcon` → `Github`
- `AIIcon` → `Brain` ou `Zap`
- `DataIcon` → `BarChart3` ou `TrendingUp`
- `IoTIcon` → `Cpu` ou `Wifi`
- `EngineeringIcon` → `Settings` ou `Wrench`
- `LeadershipIcon` → `Users` ou `Crown`
- `DesignIcon` → `Palette` ou `Paintbrush`

## Plano de Implementação

### Fase 1: Criar arquivo de mapeamento centralizado
Criar `components/icons/index.ts` que exporta todos os ícones de forma consistente.

### Fase 2: Migrar ícones básicos
Substituir ícones simples como Search, Sun, Moon, Heart pelos equivalentes do Lucide.

### Fase 3: Migrar ícones do Heroicons
Substituir ChevronDown, Check, X pelos equivalentes do Lucide.

### Fase 4: Decidir sobre ícones de tecnologia
Avaliar caso a caso se vale manter customizado ou usar alternativa do Lucide.

### Fase 5: Atualizar importações
Atualizar todas as importações nos arquivos que usam os ícones.

### Fase 6: Limpeza
Remover ícones não utilizados e possivelmente desinstalar @heroicons se não for mais necessário.

## Exemplo de Implementação

```typescript
// components/icons/index.ts
export {
  Github,
  Bot,
  Database,
  FileText,
  Zap,
  Search,
  Sun,
  Moon,
  Heart,
  ChevronDown,
  Check,
  X,
  Brain as AI,
  BarChart3 as Data,
  Cpu as IoT,
  Settings as Engineering,
  Users as Leadership,
  Palette as Design,
  FileSpreadsheet as Excel,
  Code2 as JavaScript
} from 'lucide-react';

// Manter ícones customizados específicos
export { PythonIcon, ReactIcon } from './custom-icons';
```

Isso permitirá uma API mais limpa e consistente em todo o projeto.
