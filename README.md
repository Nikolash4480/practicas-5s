# Prácticas 5S

Juego interactivo para aprender y aplicar las 5S (Seiri, Seiton, Seiso, Seiketsu, Shitsuke).
Cada participante se registra (nombre, apellido y sector), juega las cinco etapas y su resultado
queda guardado en Firestore. Un panel de administración muestra todos los resultados.

## Estructura

| Ruta | Qué es |
| --- | --- |
| `src/index.src.html` | Código fuente del juego (HTML, CSS y JS en un solo archivo) |
| `build.js` | Genera `public/index.html` incrustando los íconos SVG usados |
| `public/index.html` | Archivo final que publica Firebase Hosting |
| `firestore.rules` | Reglas de seguridad: cualquiera guarda su resultado, solo el admin los lee |
| `.github/workflows/deploy.yml` | Publicación automática al subir a `main` (opcional) |

## Configuración en la consola de Firebase (una sola vez)

1. **Firestore Database:** crear la base de datos (modo producción, ubicación `southamerica-east1` o la que prefieras).
2. **Authentication → Método de acceso:** activar *Correo electrónico/contraseña*.
3. **Authentication → Usuarios → Agregar usuario:** crear la cuenta genérica de administración
   `admin@practicas-5s.app` con la contraseña que quieras. Esa contraseña es la que se usa para entrar al panel.

La configuración de la app web ya está en `FIREBASE_CONFIG` (`src/index.src.html`). Esos datos son públicos por diseño:
la seguridad la dan las reglas de Firestore y la cuenta de administración.

## Publicar

```bash
firebase deploy        # sube el sitio y las reglas (public/index.html ya viene compilado)

# Solo si se modifica src/index.src.html:
npm install
npm run build
```

Panel de administración: botón *Acceso de administración* en la pantalla de registro, o agregando `#admin` a la URL. Pide solo la contraseña de la cuenta genérica.

Si la red bloquea Firebase (`gstatic.com` o `firestore.googleapis.com`), el juego se puede jugar igual pero avisa que no pudo guardar el resultado. Con `FIREBASE_CONFIG = null` funciona en **modo local** (datos en el navegador; contraseña de prueba del panel: `admin5s`).

## Créditos

Ilustraciones: [Fluent Emoji](https://github.com/microsoft/fluentui-emoji) © Microsoft, licencia MIT.
