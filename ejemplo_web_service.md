# Ejemplo Práctico: Integración Web Service (API)

Este documento detalla cómo consumir la información de movimientos de la estación de autobuses en tiempo real.

## Endpoint Base
`GET /api/v1/export`

## Ejemplo de Petición (cURL)
```bash
curl -X GET "https://estacion-guadalajara.gob.es/api/v1/export?type=arrival&status=scheduled" \
     -H "Accept: application/json"
```

## Ejemplo de Respuesta (JSON)
```json
{
  "success": true,
  "timestamp": "2026-01-19T18:45:00Z",
  "count": 1,
  "data": [
    {
      "id": "2",
      "bus": {
        "license_plate": "5678-DEF",
        "company": "Avanza"
      },
      "route": {
        "origin": "Guadalajara",
        "destination": "Zaragoza"
      },
      "scheduled_time": "2026-01-19T20:15:00Z",
      "bay_number": "D05",
      "status": "scheduled"
    }
  ]
}
```

## Uso en n8n
1. Añada un nodo **HTTP Request**.
2. Método: **GET**.
3. URL: `[URL_DEL_SERVIDOR]/api/v1/export`.
4. Utilice el resultado para alimentar bots de Telegram, pantallas informativas externas o aplicaciones móviles.
