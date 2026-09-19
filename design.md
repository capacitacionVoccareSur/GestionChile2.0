# Design Reference — Gestión Chile 2.0

Inspiración visual: [units.gr](https://units.gr/en/homepage/)
No es una copia — es una extracción de principios de diseño aplicables al portal.

---

## Principios generales

| Principio | units.gr | Aplicación en Chile 2.0 |
|-----------|----------|-------------------------|
| Jerarquía clara | Hero grande → secciones con títulos fuertes → detalles | Header compacto → título de sección → cards → modales |
| Contenido sobre decoración | Sin gradientes innecesarios, cada bloque tiene propósito | Cada card muestra datos reales, no ilustraciones |
| Espaciado generoso | Secciones bien separadas, nada apretado | `py-8 sm:py-10` en main, `gap-4` en grid |
| CTAs evidentes | Botón "Book your Unit" siempre visible | Botón "¿Cómo tomar datos?" fijado en el header |

---

## Paleta de colores (referencia → actual)

| Elemento | units.gr | Chile 2.0 actual | Posible mejora |
|----------|----------|-----------------|----------------|
| Fondo | Blanco / gris muy claro | `slate-950` | Mantener dark — diferencia intencional |
| Acento primario | `#525ddc` púrpura-azul | `sky-500` | OK, o migrar a `indigo-500` para más carácter |
| Texto principal | Negro `#000` | `white` | OK — dark mode |
| Texto secundario | Gris oscuro `#313131` | `slate-500` | OK |
| Cards / contenedores | Blanco puro con border sutil | `slate-900` + `border-slate-800` | OK |
| Hover | Ligero lift + sombra | `hover:bg-slate-800/60` + `border-sky-500/40` | Considerar añadir `transition-transform hover:-translate-y-0.5` |

---

## Tipografia

| Elemento | units.gr | Recomendación Chile 2.0 |
|----------|----------|-------------------------|
| Heading principal | ~42px, peso bold, espaciado normal | `text-2xl font-bold` — podría subir a `text-3xl` |
| Heading sección | ~36px | Títulos de cards actuales en `text-sm font-semibold` — OK para dashboard denso |
| Body | ~20px | `text-sm` (14px) — apropiado para herramienta operativa |
| Caption / meta | ~13px | `text-xs text-slate-500` — consistente |
| Font | Sistema / sans-serif clean | Geist Sans (default Next.js) — equivalente |

---

## Layout — lo que vale la pena replicar

### 1. Secciones con título fuerte + subtítulo descriptivo

units.gr usa: `"Where your everyday just works"` como heading + una línea de contexto.

**Aplicar en Chile 2.0:** cada modal podría tener un encabezado interno con este patrón:
```
[Título de sección]        ← heading bold
Descripción breve          ← texto slate-400, 1 línea max
```

### 2. Feature grid con icono + texto

units.gr muestra: icono → texto corto en grilla de 4 columnas.

**Ya implementado** en el BentoGrid. Reforzar con:
- Icono más visible (actual `size={18}`, podría ser `size={22}` con bg redondeado)
- Texto de preview con más contraste

### 3. Cards sin sombra exagerada, con borde sutil

units.gr: `border-radius: 4px`, sin box-shadow agresivo.
Chile 2.0 actual: `rounded-2xl border border-slate-800` — correcto, no tocar.

### 4. Estadísticas / números prominentes

units.gr destaca números clave. Chile 2.0 ya muestra `count` en cada card.
**Mejorar:** hacer el número más grande visualmente dentro de la card.

### 5. CTA siempre visible

units.gr: "Book your Unit" en header y en hero.
Chile 2.0: "¿Cómo tomar datos?" ya en header — principio cumplido.

---

## Componentes a evolucionar (inspirados en units.gr)

### BentoCard — mejora sugerida
```
Actual:   icono pequeño + título + count pequeño + lista preview
Propuesta: icono con fondo redondeado (bg-slate-800 p-2 rounded-lg)
           + count en texto grande (text-3xl font-bold)
           + título debajo del número
           + preview como pills/tags en lugar de lista
```

### Modal header — mejora sugerida
```
Actual:   título centrado izquierda + X button derecha
Propuesta: añadir subtítulo/descripción bajo el título (1 línea)
           separador más visible (gradiente en lugar de border plano)
```

### Botón "¿Cómo tomar datos?" en header
```
Actual:   bg-sky-500/10 border border-sky-500/20
Propuesta: considerar versión más sólida — bg-sky-500 text-white
           para que resalte como CTA primario (como el "Book your Unit")
```

---

## Lo que NO replicar

- **Fondo blanco**: units.gr es un sitio público/marketing. El portal es herramienta operativa, dark es correcto.
- **Hero full-screen con imagen**: No aplica — el portal es un dashboard, no una landing page.
- **Animaciones de scroll / parallax**: Agregan latencia y distracción en herramienta de trabajo.
- **Instagram feed / social**: No es relevante para el uso interno.

---

## Prioridad de mejoras (ordenadas por impacto visual / esfuerzo)

1. **Alta / bajo esfuerzo**: Hacer el `count` en BentoCard más grande (`text-3xl`)
2. **Alta / bajo esfuerzo**: Añadir `hover:-translate-y-0.5` a las cards para feedback táctil
3. **Media / medio esfuerzo**: Icono de cada card con fondo redondeado tipo chip
4. **Media / medio esfuerzo**: Botón "¿Cómo tomar datos?" más sólido (azul lleno)
5. **Baja / alto esfuerzo**: Separadores de sección con subtítulo descriptivo en modales
