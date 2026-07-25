---
name: update-contact-info
description: Update store contact details, business hours, phone/WhatsApp, email, and Google Maps location for Dallas Gold Colombia in data/contact.json. Use whenever the user requests changing any contact information.
---

# Update Contact Information Skill

This skill documents how to update contact information, phone/WhatsApp numbers, email address, business hours, and Google Maps location for Dallas Gold Colombia.

> **CRITICAL RULE**: All contact data is centralized in `data/contact.json`. Do NOT modify any `.html` files when updating contact information. The frontend dynamically fetches and renders `data/contact.json` at runtime via `js/main.js`.

---

## File Location

- `data/contact.json` (Relative to workspace root: [contact.json](file:///Users/alexi/Repos/dallasgold-co/data/contact.json))

---

## Schema Definition

`data/contact.json` follows this JSON structure:

```json
{
  "storeName": "Dallas Gold Colombia",
  "address": "Medellín: Carrera 43A, Calle 7 Sur - 170 CC Santa Fe Medellín, local 1009",
  "city": "Medellín, Colombia",
  "whatsapp": "3052354068",
  "whatsappDisplay": "+57 305 235 4068",
  "whatsappUrl": "https://wa.me/573052354068",
  "email": "dallasgoldco@gmail.com",
  "businessHours": {
    "weekdays": "Lunes a Sábado: 10:00 AM - 8:00 PM",
    "weekends": "Domingos y Festivos: 11:00 AM - 6:00 PM"
  },
  "map": {
    "locationName": "Centro Comercial El Tesoro Medellín",
    "embedUrl": "https://maps.google.com/maps?q=Centro+Comercial+El+Tesoro+Medellin&t=&z=16&ie=UTF8&iwloc=&output=embed",
    "latitude": 6.197415,
    "longitude": -75.560882
  }
}
```

---

## Execution Steps for the Agent

When the user asks to update contact details (e.g. "Cambia el whatsapp a 3001234567" or "Cambia la dirección a..."):

1. **Read `data/contact.json`**: Inspect current values using `view_file`.
2. **Update target fields**:
   - `address`: Full address string displayed on website and footer.
   - `whatsapp`: Plain 10-digit phone number.
   - `whatsappDisplay`: Formatted phone number (e.g., `+57 305 235 4068`).
   - `whatsappUrl`: Direct link to WhatsApp chat (`https://wa.me/57...`).
   - `email`: Store email address.
   - `businessHours`: String, array, or object with weekday and weekend schedules.
   - `map`: Object containing `locationName`, `embedUrl` (Google Maps iframe src), `latitude`, and `longitude`.
3. **Save `data/contact.json`**: Use `write_to_file` or `replace_file_content`.
4. **Verify**: Ensure JSON syntax is valid.
5. **No HTML edits required**: `js/main.js` automatically populates `contact.html` and `index.html` on DOM content load.
