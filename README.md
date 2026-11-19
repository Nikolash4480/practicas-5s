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

No hace falta pegar la configuración web: publicado en Firebase Hosting, el juego la toma sola desde
`/__/firebase/init.json`. (Si se quiere usar fuera de Hosting, se puede pegar en `FIREBASE_CONFIG`.)

## Publicar

```bash
npm install
npm run build
firebase deploy        # sube el sitio y las reglas
```

Panel de administración: botón *Acceso de administración* en la pantalla de registro, o agregando `#admin` a la URL. Pide solo la contraseña de la cuenta genérica.

Fuera de Firebase Hosting (por ejemplo, abriendo el archivo directo) el juego funciona en **modo local** (los datos quedan en el navegador; contraseña de prueba del panel: `admin5s`).

## Créditos

Ilustraciones: [Fluent Emoji](https://github.com/microsoft/fluentui-emoji) © Microsoft, licencia MIT.
