# Custom Cursor Avatar Setup

## Image Requirements

1. **Create your cursor avatar image:**
   - Circular crop focused on face
   - Transparent background (PNG)
   - Size: 64x64 pixels (or larger, will be scaled)
   - Thin white outline (2px) around circle
   - High contrast, sharp details

2. **Save as:**
   - File name: `cursor-avatar.png`
   - Location: `/public/cursor-avatar.png`

## Image Processing Instructions

Use any image editor (Photoshop, GIMP, Figma, Canva) to:

1. **Crop to circle:**
   - Focus on face (head and shoulders)
   - Create circular mask
   - Center the face

2. **Remove background:**
   - Make background transparent
   - Use magic wand or manual selection
   - Export as PNG with transparency

3. **Add outline:**
   - Add 2px white stroke around circle
   - Ensure it's visible on dark/light backgrounds

4. **Optimize:**
   - Export at 64x64px (or 128x128px for retina)
   - Compress PNG (TinyPNG or similar)
   - Keep file size small (< 10KB ideally)

## Fallback

If the image is not found, a styled circle with initials "SN" will be shown automatically.

## Testing

After adding the image:
1. Refresh the page
2. Move your mouse - you should see the custom cursor
3. Hover over skills/buttons to see cursor enlarge
4. Click to see ripple animation







